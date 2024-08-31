#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2024/8/1 21:53
# @Author  : hihaluemen
# @File    : Net_Position.py
import networkx as nx
import matplotlib.pyplot as plt
from matplotlib import font_manager

# 设置中文字体
font_path = 'data/simsun.ttc'  # 请替换为您系统中的中文字体路径
font_prop = font_manager.FontProperties(fname=font_path)
plt.rcParams['font.family'] = font_prop.get_name()

# 检查并绘制前驱节点
def ensure_predecessors_drawn(node, predecessor_dict, position):
    initial_y = 0
    for pred in predecessor_dict[node]:
        if pred not in position:
            # 递归绘制前驱节点
            ensure_predecessors_drawn(pred, predecessor_dict, position)
            # 设定前驱节点的位置
            pred_positions = [position[p] for p in predecessor_dict[pred] if p in position]
            if pred_positions:
                avg_y = sum(p[1] for p in pred_positions) / len(pred_positions)
                max_x = max(p[0] for p in pred_positions)
                position[pred] = (max_x, avg_y)
            else:
                position[pred] = (0, initial_y)  # 默认初始位置


def get_position(key_path, predecessor_dict, adjacency_list, works_l):

    position = {}  # 节点的绘制位置

    works = []
    for el in works_l:
        works.append(el[0])

    # 初始化关键路径中的节点位置
    initial_x = 0
    initial_y = 0
    for i, node in enumerate(key_path):
        position[node] = (initial_x + i, initial_y)

    # 其他前置节点为空的节点初始化位置
    offset_y = 1
    for node, preds in predecessor_dict.items():
        if not preds and node not in position:
            position[node] = (initial_x, initial_y + offset_y)
            offset_y += 1

    # 构建图
    G = nx.DiGraph()
    for node, successors in adjacency_list.items():
        for succ in successors:
            G.add_edge(node, succ)

    # 为每个节点计算坐标
    for work in works:
        ensure_predecessors_drawn(work, predecessor_dict, position)
        next_works = adjacency_list.get(work, [])
        if not next_works:
            continue
        # print(work, next_works)
        # print(position)
        if len(next_works) == 1:
            next_work = next_works[0]
            if next_work in position:
                continue
            if len(predecessor_dict[next_work]) == 1:
                # 直接绘制在当前节点之后
                position[next_work] = (position[work][0] + 1, position[work][1])
            else:
                # 计算纵坐标，前驱的平均位置
                pred_positions = [position[pred] for pred in predecessor_dict[next_work] if pred in position]
                avg_y = sum(p[1] for p in pred_positions) / len(pred_positions)
                max_x = max(p[0] for p in pred_positions)
                position[next_work] = (max_x, avg_y)
        else:
            # 处理多个后续工作
            step = 1
            sign = 1
            for next_work in next_works:
                # if next_work not in position:
                if len(predecessor_dict[next_work]) == 1:
                    position[next_work] = (position[work][0] + 1, position[work][1] + sign * step)
                    # print(next_work, position[next_work], position[work])
                    sign *= -1
                    if sign > 0:
                        step += 1
                else:
                    pred_positions = [position[pred] for pred in predecessor_dict[next_work] if pred in position]
                    avg_y = sum(p[1] for p in pred_positions) / len(pred_positions)
                    max_x = max(p[0] for p in pred_positions)
                    # print(next_work, max_x, avg_y)
                    # position[next_work] = (max_x, avg_y + sign * step * 0.5)
                    position[next_work] = (max_x, avg_y)
                # sign *= -1

    # 绘制原始图
    plt.figure(figsize=(12, 8))
    nx.draw(G, pos=position, with_labels=True, node_size=2000, node_color="lightblue", font_size=10, font_weight="bold",
            arrowsize=20, font_family=font_prop.get_name())
    plt.title("原始工作流程图", fontproperties=font_prop)
    plt.savefig('原始工作流程图.png', dpi=300, bbox_inches='tight')
    plt.close()

    # 创建一个字典来存储边的信息
    edge_info = {}
    for node, successors in adjacency_list.items():
        for succ in successors:
            edge_key = f"{node}->{succ}"  # 使用字符串作为键
            edge_info[edge_key] = {
                'from_node': node,
                'to_node': succ,
                'from_pos': list(position[node]),  # 转换为列表
                'to_pos': list(position[succ]),  # 转换为列表
                'is_key_path': node in key_path and succ in key_path and key_path.index(succ) == key_path.index(
                    node) + 1
            }

    # 创建一个新的字典来存储直角边的信息和中间节点的位置
    right_angle_edge_info = {}
    mid_positions = {}
    for edge_key, edge in edge_info.items():
        from_pos = edge['from_pos']
        to_pos = edge['to_pos']
        
        # 计算直角边的中间点
        mid_x = from_pos[0]
        mid_y = to_pos[1]
        mid_node = f"{edge['from_node']}_{edge['to_node']}_mid"
        mid_positions[mid_node] = [mid_x, mid_y]
        
        # 创建两个新的边：垂直边和水平边
        vertical_key = f"{edge_key}_vertical"
        horizontal_key = f"{edge_key}_horizontal"
        
        right_angle_edge_info[vertical_key] = {
            'from_node': edge['from_node'],
            'to_node': f"{edge['from_node']}_{edge['to_node']}_mid",
            'from_pos': from_pos,
            'to_pos': [mid_x, mid_y],
            'is_key_path': edge['is_key_path']
        }
        
        right_angle_edge_info[horizontal_key] = {
            'from_node': f"{edge['from_node']}_{edge['to_node']}_mid",
            'to_node': edge['to_node'],
            'from_pos': [mid_x, mid_y],
            'to_pos': to_pos,
            'is_key_path': edge['is_key_path']
        }

    duration_date = dict()
    for work in works_l:
        duration_date[work[0]] = [work[-2], work[-1]]

    # 合并原始位置和中间节点位置
    all_positions = {**position, **mid_positions}

    # 绘制直角边图
    plt.figure(figsize=(12, 8))
    G_right_angle = nx.DiGraph()
    
    # 添加所有节点到图中
    for node in all_positions:
        G_right_angle.add_node(node)
    
    # 添加直角边
    for edge in right_angle_edge_info.values():
        G_right_angle.add_edge(edge['from_node'], edge['to_node'])
    
    # 绘制节点
    nx.draw_networkx_nodes(G_right_angle, all_positions, node_size=2000, node_color="lightblue")
    nx.draw_networkx_labels(G_right_angle, all_positions, font_size=10, font_weight="bold", font_family=font_prop.get_name())
    
    # 绘制直角边
    for edge in right_angle_edge_info.values():
        plt.arrow(edge['from_pos'][0], edge['from_pos'][1],
                  edge['to_pos'][0] - edge['from_pos'][0],
                  edge['to_pos'][1] - edge['from_pos'][1],
                  shape='right', length_includes_head=True,
                  head_width=0.15, head_length=0.3, color='red' if edge['is_key_path'] else 'black')
    
    plt.title("直角边工作流程图", fontproperties=font_prop)
    plt.axis('off')
    plt.savefig('直角边工作流程图.png', dpi=300, bbox_inches='tight')
    plt.close()

    return position, duration_date, edge_info, right_angle_edge_info
