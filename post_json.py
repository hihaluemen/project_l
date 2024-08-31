import requests
import json

# 定义请求的URL
url = 'http://127.0.0.1:29000/data'

# 定义请求参数
# payload = {
#     "work_data": [
#         {"identifier": "D", "name": "施工准备", "prerequisite": "", "start_date": "2024-02-01", "end_date": "2024-02-29"},
#         {"identifier": "E", "name": "支护", "prerequisite": "D", "start_date": "2024-03-01", "end_date": "2024-03-20"},
#         {"identifier": "F", "name": "基础施工", "prerequisite": "D", "start_date": "2024-03-01", "end_date": "2024-03-31"},
#         {"identifier": "G", "name": "地下室结构", "prerequisite": "E，F", "start_date": "2024-04-01", "end_date": "2024-04-15"},
#         {"identifier": "I", "name": "1-4层混泥土结构", "prerequisite": "G", "start_date": "2024-04-16", "end_date": "2024-05-02"},
#         {"identifier": "J", "name": "5-8层混泥土结构", "prerequisite": "I", "start_date": "2024-05-03", "end_date": "2024-05-20"}
#     ]
# }

# 定义请求参数
payload = {
    "work_data": [
        {"identifier":"序号","partition":"分区","classify":"专业分类","name":"工作名称","duration":"工期（工日）","prerequisite":"前置工作","start_date":"计划开始","end_date":"计划结束","cost":"成本信息"},
        {"identifier":"1","partition":"--","classify":"--","name":"项目开始","duration":"--","prerequisite":"","start_date":"2024-08-31","end_date":"2024-08-31","cost":""},
        {"identifier":"2","partition":"1","classify":"建筑","name":"施工准备","duration":"10","prerequisite":"1","start_date":"2024-09-01","end_date":"2024-09-10","cost":""},
        {"identifier":"3","partition":"2","classify":"建筑","name":"基础施工","duration":"10","prerequisite":"1，2","start_date":"2024-09-11","end_date":"2024-09-20","cost":""},
        {"identifier":"4","partition":"--","classify":"--","name":"项目结束","duration":"--","prerequisite":"3","start_date":"2024-09-20","end_date":"2024-09-20"}
    ]
}


# 将数据转换为JSON格式
json_data = json.dumps(payload)

# 发送POST请求
response = requests.post(url, data=json_data, headers={'Content-Type': 'application/json'})

# 打印响应内容
print(response.text)