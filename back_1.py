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
    # print("前驱节点字典:", predecessor_dict)
    return predecessor_dict


# 得到节点的邻接表
def get_adjacency(work_l):
    # 构建邻接表
    adjacency_list = {}

    for item in work_l:
        node = item[0]
        description = item[1]
        # 同时处理中文逗号和英文逗号
        predecessors = item[2].replace('，', ',').split(',') if item[2] else []
        predecessors = [pred.strip() for pred in predecessors if pred.strip()]  # 移除空白项
        
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


def find_all_paths(graph, start, end, path=[]):
    path = path + [start]
    if start == end:
        return [path]
    if start not in graph:
        return []
    paths = []
    for node in graph[start]:
        if node not in path:
            newpaths = find_all_paths(graph, node, end, path)
            for newpath in newpaths:
                paths.append(newpath)
    return paths


def find_all_possible_paths(graph):
    all_paths = []
    for start_node in graph.keys():
        for end_node in graph.keys():
            if start_node != end_node:
                paths = find_all_paths(graph, start_node, end_node)
                if paths:
                    all_paths.extend(paths)
    return all_paths


def merge_shorter_paths(all_paths):
    # 对路径列表按长度降序排序
    all_paths.sort(key=len, reverse=True)

    # 创建一个新列表来存储合并后的路径
    merged_paths = []

    for path in all_paths:
        # 检查当前路径是否已经被包含在已有的路径中
        if not any(set(path).issubset(set(p)) for p in merged_paths):
            merged_paths.append(path)

    return merged_paths


def get_key_path(work_list: list, adjacency_dict: dict):
    # 找到所有可能的路径
    all_possible_paths = find_all_possible_paths(adjacency_dict)
    # 合并较短的路径到较长的路径中
    path_list = merge_shorter_paths(all_possible_paths)
    # print(path_list)
    time_list = [list(0 for i in range(len(path_list[i]))) for i in range(len(path_list))]

    work_time_dict = dict()
    for i in range(len(work_list)):
        work_time_dict[work_list[i][0]] = work_list[i][4] - work_list[i][3]
    # print("work_time_dict:",work_time_dict)
    #获取时间差值
    for i in range(len(path_list)):
        for j in range(len(path_list[i])):
            if path_list[i][j] in work_time_dict.keys():
                time_list[i][j] = work_time_dict[path_list[i][j]]
            else:
                continue
    # print("time_list:",time_list)
    #将时间戳转换为天数
    for i in range(len(time_list)):
        for j in range(len(time_list[i])):
            time_list[i][j] = time_list[i][j]/(24*60*60)+1
    # print("time_list_second2day:",time_list)
    #计算路径长度
    path_len_sum_list = [sum(time_list[i]) for i in range(len(time_list))]
    # print("path_len_sum_list:",path_len_sum_list)
    #找出最大路径长度
    index_max = path_len_sum_list.index(max(path_len_sum_list))
    # print("index_max:",index_max)
    #根据最大路径长度的索引，找出对应的路径
    path_max = path_list[index_max]
    # print("path_max:",path_max)
    return path_max