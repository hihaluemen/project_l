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
from back_1 import get_all_pre, get_adjacency

# 假设你的 get_position 函数在同一个文件中
from Net_Position import get_position

app = FastAPI()


# 请求模型
class WorkflowDiagramRequest(BaseModel):
    key_path: List[str]
    predecessor_dict: Dict[str, List[str]]
    adjacency_list: Dict[str, List[str]]
    works: List[str]


@app.post("/workflow-diagram")
async def create_workflow_diagram():
    # try:
        work_l = [['D', '     施工准备', '', 1706716800, 1709136000], ['E', '     支护', 'D', 1709222400, 1710864000], ['F', '     基础施工', 'D', 1709222400, 1711814400], ['G', '     地下室结构', 'E，F', 1711900800, 1713110400], ['I', '    1-4层混泥土结构', 'G', 1713196800, 1714579200], ['J', '    5-8层混泥土结构', 'I', 1714665600, 1716134400]]
        adjacency_list = get_adjacency(work_l)
        # predecessor_dict = get_all_pre(work_l, adjacency_list)

        adjacency_list = {'D': ['E', 'F'], 'A': ['E'], 'E': ['G', 'H'], 'F': ['G'], 'G': ['I'], 'H': ['I'], 'I': ['J'], 'J': []}
        predecessor_dict = {'D': [], 'A': [], 'E': ['D'], 'F': ['D'], 'G': ['E', 'F'], 'H': ['E'], 'I': ['H', 'G'], 'J': ['I']}
        key_path = ['D', 'F', 'G', 'I', 'J']
        works = ['D', 'A', 'E', 'F', 'G', 'H', 'I', 'J']  # 按时间排序的工作列表
        # 调用 get_position 函数
        position = get_position(
            key_path,
            predecessor_dict,
            adjacency_list,
            works
        )
        return position
    # except Exception as e:
    #     raise HTTPException(status_code=400, detail=str(e))


# 运行 Uvicorn 服务器
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=29000)