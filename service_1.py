#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2024/8/1 22:03
# @Author  : hihaluemen
# @File    : service_1.py
# main.py
from fastapi import FastAPI, HTTPException, Request, Form
from pydantic import BaseModel
from typing import Dict, List, Any
import uvicorn
from starlette.staticfiles import StaticFiles

from back_1 import get_all_pre, get_adjacency, get_key_path
from Net_Position import get_position
import templates
from excel_parse import get_worls, get_work_from_json

app = FastAPI()
app.mount("/page", StaticFiles(directory="./templates", html=True), name="page")

# 请求模型
class WorkflowDiagramRequest(BaseModel):
    key_path: List[str]
    predecessor_dict: Dict[str, List[str]]
    adjacency_list: Dict[str, List[str]]
    works: List[str]


class WorkDataItem(BaseModel):
    identifier: str
    name: str
    prerequisite: str
    start_date: str
    end_date: str


class WorkData(BaseModel):
    work_data: List[WorkDataItem]


# 定义路径操作
@app.post("/data")
async def receive_data(work_data: WorkData):
    print(work_data)
    work_l = get_work_from_json(work_data.work_data)
    adjacency_list = get_adjacency(work_l)
    print(adjacency_list)
    predecessor_dict = get_all_pre(work_l, adjacency_list)
    print(predecessor_dict)
    key_path = get_key_path(work_l, adjacency_list)
    print(key_path)

    position, duration_date, edge_info, right_angle_edge_info = get_position(
        key_path,
        predecessor_dict,
        adjacency_list,
        work_l
    )
    ans = dict()
    ans['position'] = position
    ans['duration_date'] = duration_date
    ans['edge_info'] = edge_info
    ans['right_angle_edge_info'] = right_angle_edge_info

    return ans


@app.post("/workflow-diagram")
async def create_workflow_diagram():
    # try:
        file_path = "./data/1.xlsx"
        work_l = get_worls(file_path)

        adjacency_list = get_adjacency(work_l)
        print(adjacency_list)
        predecessor_dict = get_all_pre(work_l, adjacency_list)
        print(predecessor_dict)
        key_path = get_key_path(work_l, adjacency_list)
        print(key_path)
        # key_path = ['D', 'F', 'G', 'I', 'J']
        # 调用 get_position 函数
        position, duration_date, edge_info, right_angle_edge_info = get_position(
            key_path,
            predecessor_dict,
            adjacency_list,
            work_l
        )
        ans = dict()
        ans['position'] = position
        ans['duration_date'] = duration_date
        ans['edge_info'] = edge_info
        ans['right_angle_edge_info'] = right_angle_edge_info # 它包含了直角边的信息。每个原始的斜边都被分解成两个边：一个垂直边和一个水平边。


        return ans
    # except Exception as e:
    #     raise HTTPException(status_code=400, detail=str(e))

@app.get("/")
async def login(request: Request):
   return templates.TemplateResponse("templates/index.html", {"request": request})

@app.get("/hello")
async def root():
    return {"message": "Hello World"}

# 运行 Uvicorn 服务器
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=29000)