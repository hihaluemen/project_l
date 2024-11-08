from datetime import datetime
import matplotlib.pyplot as plt
import networkx as nx
import re


def custom_sort(successors, adjacency_dict):
    print('=='*5)
    print('排序前： ')
    print(successors)
    if successors == []:
        return successors
    # 按照后继工作数量排序
    sorted_successors = sorted(successors, key=lambda x: len(adjacency_dict.get(x, [])))

    # 处理特殊情况：只有两个节点
    if len(sorted_successors) == 2:
        print('排序后： ')
        print(sorted_successors)
        return sorted_successors

    result = []
    left = 0
    right = len(sorted_successors) - 1
    mid = (left + right) // 2

    # 将最大值放在中间
    result.append(sorted_successors[mid])

    # 从中间向两侧填充，较小的值在上半部分
    left_side = mid - 1
    right_side = mid + 1
    is_upper = True

    while left_side >= left or right_side <= right:
        if is_upper:
            if left_side >= left:
                result.append(sorted_successors[left_side])
                left_side -= 1
            if right_side <= right:
                result.insert(0, sorted_successors[right_side])
                right_side += 1
        else:
            if right_side <= right:
                result.append(sorted_successors[right_side])
                right_side += 1
            if left_side >= left:
                result.insert(0, sorted_successors[left_side])
                left_side -= 1

        is_upper = not is_upper
    print('排序后： ')
    print(result)
    return result

def new_draw_network(works_list, adjacency_dict, predecessor_dict):
    origin_work_list = works_list.copy()
    paint_dict = {}
    wait_list = []
    void_list = []
    now_low = 0
    start_time = min(datetime.fromtimestamp(work[3]) for work in works_list)

    def add_to_paint_dict(work_name, coord, need_right_angle='None', is_wavy=False, is_virtual=False):
        paint_dict[work_name] = {
            'coord': coord,
            'need_right_angle': need_right_angle,
            'is_wavy': is_wavy,
            'is_virtual': is_virtual
        }

    while works_list or wait_list or void_list:
        if works_list and not wait_list:
            w = works_list.pop(0)
            work_start = (datetime.fromtimestamp(w[3]) - start_time).days
            work_end = (datetime.fromtimestamp(w[4]) - start_time).days
            add_to_paint_dict(w[0], [(work_start, now_low), (work_end, now_low)])
            wait_list.append(w[0])
            now_low -= 1

        while wait_list:
            work = wait_list.pop(0)
            work_x, work_y = paint_dict[work]['coord'][1]
            
            if work in adjacency_dict:
                successors = adjacency_dict[work]
                if len(successors) == 1:
                    successor = successors[0]
                    successor_work = next((w for w in works_list if w[0] == successor), None)
                    if successor not in paint_dict and successor_work:
                        succ_end = (datetime.fromtimestamp(successor_work[4]) - start_time).days
                        add_to_paint_dict(successor, [(work_x, work_y), (succ_end, work_y)])
                        wait_list.append(successor)
                        works_list = [w for w in works_list if w[0] != successor]
                    else:
                        void_list.append((work, successor))
                else:
                    # 对后继工作进行排序
                    # successors.sort(key=lambda x: len(adjacency_dict.get(x, [])), reverse=True)
                    successors = custom_sort(successors, adjacency_dict)
                    num_el = 0
                    for successor in successors:
                        successor_work = next((w for w in works_list if w[0] == successor), None)
                        if len(predecessor_dict[successor]) == 1:
                            if successor not in paint_dict and successor_work:
                                succ_end = (datetime.fromtimestamp(successor_work[4]) - start_time).days
                                if num_el == 0:
                                    add_to_paint_dict(successor, [(work_x, work_y), (succ_end, work_y)])
                                else:
                                    add_to_paint_dict(successor, [(work_x, work_y), (succ_end, work_y - num_el)], 'left_down')
                                wait_list.append(successor)
                                works_list = [w for w in works_list if w[0] != successor]
                                num_el += 1
                        else:
                            void_list.append((work, successor))
                    now_low = work_y - num_el - 1

        while void_list:
            void1 = void_list.pop(0)
            if void1[1] in paint_dict:
                start_coord = paint_dict[void1[0]]['coord'][1]
                end_coord = paint_dict[void1[1]]['coord'][0]
                add_to_paint_dict(f"虚线---{void1[0]}->{void1[1]}", [start_coord, end_coord], is_virtual=True)
            else:
                pred_y_coords = [paint_dict[pred]['coord'][1][1] for pred in predecessor_dict[void1[1]] if pred in paint_dict]
                vg = sum(pred_y_coords) / len(pred_y_coords) if pred_y_coords else 0
                xg = paint_dict[predecessor_dict[void1[1]][0]]['coord'][1][0]
                void1_work = next((w for w in works_list if w[0] == void1[1]), None)
                if void1_work:
                    succ_end = (datetime.fromtimestamp(void1_work[4]) - start_time).days
                    add_to_paint_dict(void1[1], [(xg, vg), (succ_end, vg)])
                    wait_list.append(void1[1])
                    works_list = [w for w in works_list if w[0] != void1[1]]
                
                start_coord = paint_dict[void1[0]]['coord'][1]
                end_coord = paint_dict[void1[1]]['coord'][0]
                add_to_paint_dict(f"虚线---{void1[0]}->{void1[1]}", [start_coord, end_coord], is_virtual=True)

    return paint_dict, start_time, origin_work_list

def process_paint_dict(paint_dict, works_list, start_time):
    point_visible = []
    # start_time = min(datetime.fromtimestamp(work[3]) for work in works_list)
    new_paint_dict = {}
    adjustments = {}  # 用于存储需要调整的线段信息

    for work_paint, info in paint_dict.items():
        if '->' not in work_paint and not info['is_virtual']:
            work_start = next((work[3] for work in works_list if work[0] == work_paint), None)
            if work_start is not None:
                work_start_days = (datetime.fromtimestamp(work_start) - start_time).days
                start_coord = info['coord'][0]

                if start_coord[0] == work_start_days:
                    if start_coord not in point_visible:
                        point_visible.append(start_coord)
                    new_paint_dict[work_paint] = info
                else:
                    print('=='*10)
                    print(work_start)
                    print(info)
                    print(work_start_days, start_coord[0])
                    new_work_paint_0 = f'折线 {work_paint}'
                    new_work_paint_1 = work_paint

                    new_paint_dict[new_work_paint_0] = {
                        'coord': [start_coord, (work_start_days, start_coord[1])],
                        'need_right_angle': info['need_right_angle'],
                        'is_wavy': True,
                        'is_virtual': info['is_virtual']
                    }

                    new_paint_dict[new_work_paint_1] = {
                        'coord': [(work_start_days, start_coord[1]), info['coord'][1]],
                        'need_right_angle': info['need_right_angle'],
                        'is_wavy': False,
                        'is_virtual': info['is_virtual']
                    }

                    if (work_start_days, start_coord[1]) not in point_visible:
                        point_visible.append((work_start_days, start_coord[1]))

                    # 记录需要调整的信息
                    adjustments[work_paint] = {
                        'old_end': info['coord'][0],
                        'new_end': (work_start_days, start_coord[1])
                    }
                    print(adjustments)
            else:
                new_paint_dict[work_paint] = info
        else:
            new_paint_dict[work_paint] = info

    # 更新其他相关线段的终点
    for work_paint, info in new_paint_dict.items():
        if '->' in work_paint or info['is_virtual']:
            for adjusted_work, adjustment in adjustments.items():
                if info['coord'][1] == adjustment['old_end']:
                    info['coord'][1] = adjustment['new_end']

    return new_paint_dict, point_visible


def adjust_diagonal_lines(processed_result):
    adjusted_result = {}
    for work_paint, info in processed_result.items():
        if info['need_right_angle'] != 'None':
            # 创建新的直角边
            new_work_paint_0 = f'斜边 {work_paint}的零'
            new_work_paint_1 = f'斜边 {work_paint}的一'

            # 计算新的坐标
            start_coord = info['coord'][0]
            end_coord = info['coord'][1]
            middle_coord = (start_coord[0], end_coord[1])

            # 添加新的直角边
            adjusted_result[new_work_paint_0] = {
                'coord': [start_coord, middle_coord],
                'need_right_angle': 'None',
                'is_wavy': info['is_wavy'],
                'is_virtual': info['is_virtual']
            }
            adjusted_result[new_work_paint_1] = {
                'coord': [middle_coord, end_coord],
                'need_right_angle': 'None',
                'is_wavy': info['is_wavy'],
                'is_virtual': info['is_virtual']
            }
        else:
            # 保留原有的非斜线
            adjusted_result[work_paint] = info

    return adjusted_result


def adjust_virtual_lines(xie_result):
    adjusted_result = {}
    for work_paint, info in xie_result.items():
        if info['is_virtual']:
            start_coord = info['coord'][0]

            # 检查是否有其他线段以相同坐标作为起点
            other_lines_with_same_start = [w for w in xie_result if
                                           w != work_paint and xie_result[w]['coord'][0] == start_coord]

            if not other_lines_with_same_start:
                # 如果没有其他线段以相同坐标作为起点，将虚线变为实线
                if start_coord[0] == info['coord'][1][0]:  # 垂直线
                    adjusted_result[f'实线---{work_paint[5:]}'] = {
                        'coord': info['coord'],
                        'need_right_angle': info['need_right_angle'],
                        'is_wavy': info['is_wavy'],
                        'is_virtual': False
                    }
                else:  # 非垂直线，需要分割
                    print('----'*10)
                    print(info)
                    middle_coord = (info['coord'][1][0], start_coord[1])
                    print(middle_coord)
                    # adjusted_result[f'实线 {work_paint[5:]}的零'] = {
                    #     'coord': [start_coord, middle_coord],
                    #     'need_right_angle': info['need_right_angle'],
                    #     'is_wavy': info['is_wavy'],
                    #     'is_virtual': False
                    # }
                    # adjusted_result[f'实线 {work_paint[5:]}的一'] = {
                    #     'coord': [middle_coord, info['coord'][1]],
                    #     'need_right_angle': info['need_right_angle'],
                    #     'is_wavy': info['is_wavy'],
                    #     'is_virtual': False
                    # }
                    adjusted_result[f'实线 {work_paint[5:]}的零 -折线'] = {
                        'coord': [start_coord, middle_coord],
                        'need_right_angle': info['need_right_angle'],
                        'is_wavy': True,
                        'is_virtual': False
                    }
                    adjusted_result[f'实线 {work_paint[5:]}的一 -虚线'] = {
                        'coord': [middle_coord, info['coord'][1]],
                        'need_right_angle': info['need_right_angle'],
                        'is_wavy': info['is_wavy'],
                        'is_virtual': True
                    }
            else:
                # 如果有其他线段以相同坐标作为起点，保持为虚线
                if start_coord[0] == info['coord'][1][0]:  # 垂直线
                    adjusted_result[work_paint] = info
                else:  # 非垂直线，需要分割
                    middle_coord = (info['coord'][1][0], start_coord[1])
                    adjusted_result[f'虚线 {work_paint[5:]}的零'] = {
                        'coord': [start_coord, middle_coord],
                        'need_right_angle': info['need_right_angle'],
                        'is_wavy': info['is_wavy'],
                        'is_virtual': True
                    }
                    adjusted_result[f'虚线 {work_paint[5:]}的一'] = {
                        'coord': [middle_coord, info['coord'][1]],
                        'need_right_angle': info['need_right_angle'],
                        'is_wavy': info['is_wavy'],
                        'is_virtual': True
                    }
        else:
            # 保留非虚线的原有信息
            adjusted_result[work_paint] = info

    return adjusted_result



def visualize_network_matplotlib(paint_dict, adjacency_dict):
    fig, ax = plt.subplots(figsize=(15, 10))

    # 绘制节点和工作条
    for work, info in paint_dict.items():
        if not info['is_virtual'] and '->' not in work:
            start_x, start_y = info['coord'][0]
            end_x, end_y = info['coord'][1]
            ax.plot([start_x, end_x], [start_y, end_y], '-', linewidth=5, color='lightblue')
            ax.text((start_x + end_x) / 2, start_y, work, fontsize=8, ha='center', va='center', fontweight='bold')

    # 绘制边
    for work, info in paint_dict.items():
        if info['is_virtual']:
            from_node, to_node = work.split('---')[1].split('->')
            if from_node in paint_dict and to_node in paint_dict:
                x1, y1 = paint_dict[from_node]['coord'][1]
                x2, y2 = paint_dict[to_node]['coord'][0]
                ax.plot([x1, x2], [y1, y2], 'r--', linewidth=1)
        elif '->' not in work:
            for successor in adjacency_dict.get(work, []):
                if successor in paint_dict:
                    x1, y1 = paint_dict[work]['coord'][1]
                    x2, y2 = paint_dict[successor]['coord'][0]
                    ax.plot([x1, x2], [y1, y2], 'k-', linewidth=1)
                    # 添加持续时间标签
                    duration = x2 - x1
                    mid_x, mid_y = (x1 + x2) / 2, (y1 + y2) / 2
                    ax.text(mid_x, mid_y, f"{duration}天", fontsize=6, ha='center', va='center')

    # 设置图形属性
    ax.set_title("工作网络图")
    ax.set_xlabel("时间（天）")
    ax.set_ylabel("工作顺序")
    ax.invert_yaxis()  # 反转 y 轴，使得顶部的工作显示在图的上方
    plt.tight_layout()
    plt.savefig('network_visualization_matplotlib.png', dpi=300, bbox_inches='tight')
    plt.close()


def get_new_position_info(key_path, predecessor_dict, adjacency_dict, works_list):
    result, start_time, works_list = new_draw_network(works_list, adjacency_dict, predecessor_dict)
    print(result)
    processed_result, visible_points = process_paint_dict(result, works_list, start_time)

    # 添加关键路径的起始和结束节点到 visible_points
    print(works_list)
    print(key_path[0])
    first_key_work = next(work for work in works_list if work[0] == key_path[0])
    last_key_work = next(work for work in works_list if work[0] == key_path[-1])

    first_key_start = (datetime.fromtimestamp(first_key_work[3]) - start_time).days
    last_key_end = (datetime.fromtimestamp(last_key_work[4]) - start_time).days

    visible_points.insert(0, (first_key_start, result[key_path[0]]['coord'][0][1]))
    visible_points.append((last_key_end, result[key_path[-1]]['coord'][1][1]))

    print("处理后的paint_dict:")
    print(processed_result)
    print("\n可见点列表:")
    print(visible_points)
    xie_result = adjust_diagonal_lines(processed_result)
    print('处理完斜边后的结果为：')
    print(xie_result)

    # 调用新函数处理虚线
    xu_result = adjust_virtual_lines(xie_result)
    # 添加is_key字段
    # for key, value in xu_result.items():
    #     value['is_key'] = any(node in key for node in key_path)

    for key, value in xu_result.items():
        extracted_chars = re.findall(r'[A-Za-z0-9]', key)
        tmp_n = 0
        for char in extracted_chars:
            if char in key_path:
                tmp_n += 1
        if len(extracted_chars) == tmp_n and not value['is_wavy']:
            value['is_key'] = True
        else:
            value['is_key'] = False
    print('虚线处理结果为：')
    print(xu_result)

    return xu_result, visible_points


def deal_position(positions):
    if not positions:
        return {}

    if len(positions) == 1:
        return {"1": positions[0]}

    new_positions = {}

    for i, point in enumerate(positions[1:], 1):
        new_positions[i] = point
    
    return new_positions


if __name__ == "__main__":
    # 使用新的示例数据
    key_path = ['1', '2', '5', '6']
    predecessor_dict = {'1': [], '2': ['1'], '3': ['1'], '4': ['2'], '5': ['2', '3'], '6': ['4', '5']}
    adjacency_dict = {'1': ['2', '3'], '2': ['4', '5'], '3': ['5'], '4': ['6'], '5': ['6'], '6': []}
    works_list = [
        ['1', '项目开始', '', 1706457600, 1706716800, '2024-01-29', '2024-02-01'],
        ['2', '城市花园开发总计划', '1', 1706716800, 1716134400, '2024-02-01', '2024-05-20'],
        ['3', '1号楼', '1', 1706716800, 1716134400, '2024-02-01', '2024-05-20'],
        ['4', '  地基与基础', '2', 1716134400, 1716998400, '2024-05-20', '2024-05-30'],
        ['5', '     施工准备', '2, 3', 1716134400, 1717084800, '2024-05-20', '2024-05-31'],
        ['6', '     支护', '4, 5', 1717171200, 1717948800, '2024-06-01', '2024-06-10']
    ]

    # 注释掉原来的示例数据
    # predecessor_dict = {'1': [], '2': [], '3': ['1', '2'], '4': ['3']}
    # adjacency_dict = {'1': ['3'], '2': ['3'], '3': ['4'], '4': []}
    # works_list = [
    #     ['1', '项目开始', '', 1725033600, 1725120000, '2024-08-31', '2024-09-01'],
    #     ['2', '施工准备', '1', 1725120000, 1725897600, '2024-09-01', '2024-09-10'],
    #     ['3', '基础施工', '1，2', 1725984000, 1726761600, '2024-09-11', '2024-09-20'],
    #     ['4', '项目结束', '3', 1726761600, 1726848000, '2024-09-20', '2024-09-21']
    # ]

    result, start_time, works_list = new_draw_network(works_list, adjacency_dict, predecessor_dict)
    print(result)
    processed_result, visible_points = process_paint_dict(result, works_list, start_time)

    # 添加关键路径的起始和结束节点到 visible_points
    print(works_list)
    print(key_path[0])
    first_key_work = next(work for work in works_list if work[0] == key_path[0])
    last_key_work = next(work for work in works_list if work[0] == key_path[-1])

    first_key_start = (datetime.fromtimestamp(first_key_work[3]) - start_time).days
    last_key_end = (datetime.fromtimestamp(last_key_work[4]) - start_time).days

    visible_points.insert(0, (first_key_start, result[key_path[0]]['coord'][0][1]))
    visible_points.append((last_key_end, result[key_path[-1]]['coord'][1][1]))

    print("处理后的paint_dict:")
    print(processed_result)
    print("\n可见点列表:")
    print(visible_points)
    xie_result = adjust_diagonal_lines(processed_result)
    print('处理完斜边后的结果为：')
    print(xie_result)

    # 调用新函数处理虚线
    xu_result = adjust_virtual_lines(xie_result)
    # 添加is_key字段
    for key, value in xu_result.items():
        value['is_key'] = any(node in key for node in key_path)
    print('虚线处理结果为：')
    print(xu_result)
    # visualize_network_matplotlib(processed_result, adjacency_dict)
