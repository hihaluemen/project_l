#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2024/8/1 21:53
# @Author  : hihaluemen
# @File    : Net_Position.py
import networkx as nx
import matplotlib.pyplot as plt


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


def get_position(key_path, predecessor_dict, adjacency_list, works):
    position = {}  # 节点的绘制位置
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
        print(work, next_works)
        print(position)
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
                    print(next_work, position[next_work], position[work])
                    sign *= -1
                    if sign > 0:
                        step += 1
                else:
                    pred_positions = [position[pred] for pred in predecessor_dict[next_work] if pred in position]
                    avg_y = sum(p[1] for p in pred_positions) / len(pred_positions)
                    max_x = max(p[0] for p in pred_positions)
                    print(next_work, max_x, avg_y)
                    # position[next_work] = (max_x, avg_y + sign * step * 0.5)
                    position[next_work] = (max_x, avg_y)
                # sign *= -1

    # 绘制图
    plt.figure(figsize=(12, 8))
    nx.draw(G, pos=position, with_labels=True, node_size=2000, node_color="lightblue", font_size=10, font_weight="bold",
            arrowsize=20)
    plt.title("Workflow Diagram")
    # plt.show()
    plt.savefig('workflow_diagram.png', dpi=300, bbox_inches='tight')
    return position
