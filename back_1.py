#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2024/7/25 22:59
# @Author  : hihaluemen
# @File    : back_1.py
import pandas as pd


# 得到节点的前驱节点
def get_all_pre(work_l, adjacency_list):
    # 创建前驱节点字典
    predecessor_dict = {node: [] for node in adjacency_list.keys()}

    # 遍历邻接表，收集前驱节点
    for predecessor, successors in adjacency_list.items():
        for successor in successors:
            if successor not in predecessor_dict:
                predecessor_dict[successor] = [predecessor]
            else:
                predecessor_dict[successor].append(predecessor)

    # 输出前驱节点字典
    print("前驱节点字典:", predecessor_dict)
    return predecessor_dict


# 得到节点的邻接表
def get_adjacency(work_l):
    # 构建邻接表
    adjacency_list = {}

    for item in work_l:
        node = item[0]
        description = item[1]
        predecessors = item[2].split('，') if item[2] else []
        start_timestamp = item[3]
        end_timestamp = item[4]

        # 将前置节点添加到邻接表中
        for predecessor in predecessors:
            if predecessor in adjacency_list:
                adjacency_list[predecessor].append(node)
            else:
                adjacency_list[predecessor] = [node]

        # 确保每个节点都在邻接表中
        if node not in adjacency_list:
            adjacency_list[node] = []
    return adjacency_list
