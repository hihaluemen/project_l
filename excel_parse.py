#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2024/8/2 22:31
# @Author  : hihaluemen
# @File    : excel_parse.py
import pandas as pd
from os.path import splitext
import json
from datetime import datetime
from pydantic import BaseModel
from typing import List


class WorkDataItem(BaseModel):
    identifier: str
    name: str
    prerequisite: str
    start_date: str
    end_date: str


class WorkData(BaseModel):
    work_data: List[WorkDataItem]


def time_s2t(timestamp_obj):
    """
    panda的时间对象转成时间戳（int）
    :param timestamp_obj:
    :return: 时间戳（int）
    """
    # 转换为 Unix 时间戳
    unix_timestamp = timestamp_obj.timestamp()
    # 转换为整数
    int_timestamp = int(unix_timestamp)
    return int_timestamp


def time_t2s(timestamp_obj):
    """
    panda的时间对象转成日期的字符串
    :param timestamp_obj:
    :return: 日期的字符串
    """
    # 转换为字符串
    date_string = timestamp_obj.strftime('%Y-%m-%d')
    return date_string


def get_worls(file_path):
    # 获取文件扩展名
    _, ext = splitext(file_path)


    # 根据扩展名选择合适的读取方法
    if ext.lower() == '.csv':
        df = pd.read_csv(file_path)
    elif ext.lower() in ['.xls', '.xlsx']:
        df = pd.read_excel(file_path)
    else:
        df = pd.DataFrame()

    print(df)
    # print(type(df['计划开始'][0]))
    # 开始时间和结束时间转化成时间戳
    df['start_int'] = df['计划开始'].apply(lambda x: time_s2t(x))
    df['end_int'] = df['计划完成'].apply(lambda x: time_s2t(x))
    df['start_str'] = df['计划开始'].apply(lambda x: time_t2s(x))
    df['end_str'] = df['计划完成'].apply(lambda x: time_t2s(x))

    # print(df)
    df = df.fillna("")
    work_l = []
    for i in range(df.shape[0]):
        if df.iloc[i]['标号'] != "":
            work_l.append([df.iloc[i]['标号'], df.iloc[i]['工作名称'], df.iloc[i]['前置工作'], df.iloc[i]['start_int'],
                           df.iloc[i]['end_int'], df.iloc[i]['start_str'], df.iloc[i]['end_str']])
    # print("work_l:")
    # print(work_l)

    # 使用 sorted 函数根据第四个元素排序
    work_l_sorted = sorted(work_l, key=lambda x: x[3])
    print(work_l_sorted)
    return work_l_sorted


def get_work_from_json(json_data: list) -> list:
    work_l = list()
    date_format = "%Y-%m-%d"
    for work in json_data:
        if "null" in work or not work.identifier.isdigit():
            continue
        start_date_obj = datetime.strptime(work.start_date, date_format)
        start_timestamp = start_date_obj.timestamp()

        end_date_obj = datetime.strptime(work.end_date, date_format)
        end_timestamp = end_date_obj.timestamp()
        tmp = [
            work.identifier,
            work.name,
            work.prerequisite,
            int(start_timestamp),
            int(end_timestamp),
            work.start_date,
            work.end_date
        ]

        work_l.append(tmp)

    # 使用 sorted 函数根据第四个元素排序
    work_l_sorted = sorted(work_l, key=lambda x: x[3])
    print(work_l_sorted)
    return work_l_sorted




if __name__ == "__main__":
    file_path = './data/1.xlsx'
    get_worls(file_path)