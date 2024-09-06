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
    "work_data": [{"identifier":"1","partition":"土地","classify":"土地","name":"项目开始","duration":"0","prerequisite":"","start_date":"2024-02-01","end_date":"2024-02-01","cost":""},
                  {"identifier":"2","partition":"土地","classify":"土地","name":"城市花园开发总计划","duration":"110","prerequisite":"","start_date":"2024-02-01","end_date":"2024-05-20","cost":""},
                  {"identifier":"3","partition":"土地","classify":"土地","name":"1号楼","duration":"110","prerequisite":"","start_date":"2024-02-01","end_date":"2024-05-20","cost":""},
                  {"identifier":"4","partition":"土地","classify":"土地","name":"  地基与基础","duration":"75","prerequisite":"","start_date":"2024-02-01","end_date":"2024-04-15","cost":"10"},
                  {"identifier":"5","partition":"土地","classify":"土地","name":"     施工准备","duration":"29","prerequisite":"","start_date":"2024-02-01","end_date":"2024-02-29","cost":"10"},
                  {"identifier":"6","partition":"土地","classify":"土地","name":"     支护","duration":"21","prerequisite":"5","start_date":"2024-03-01","end_date":"2024-03-20","cost":"10"},
                  {"identifier":"7","partition":"土地","classify":"土地","name":"     基础施工","duration":"31","prerequisite":"5","start_date":"2024-03-01","end_date":"2024-03-31","cost":"10"},
                  {"identifier":"8","partition":"土地","classify":"土地","name":"     地下室结构","duration":"15","prerequisite":"6，7","start_date":"2024-04-01","end_date":"2024-04-15","cost":"10"},
                  {"identifier":"9","partition":"土地","classify":"土地","name":"  主体结构施工","duration":"35","prerequisite":"","start_date":"2024-04-16","end_date":"2024-05-10","cost":"10"},
                  {"identifier":"10","partition":"土地","classify":"土地","name":"    1-4层混泥土结构","duration":"17","prerequisite":"8","start_date":"2024-04-16","end_date":"2024-05-02","cost":"10"},
                  {"identifier":"11","partition":"土地","classify":"土地","name":"    5-8层混泥土结构","duration":"18","prerequisite":"10","start_date":"2024-05-03","end_date":"2024-05-20","cost":"10"},
                  {"identifier":"12","partition":"土地","classify":"土地","name":"项目结束","duration":"0","prerequisite":"","start_date":"2024-05-20","end_date":"2024-05-20"}
                  ]
}




# 将数据转换为JSON格式
json_data = json.dumps(payload)

# 发送POST请求
response = requests.post(url, data=json_data, headers={'Content-Type': 'application/json'})

# 打印响应内容
print(response.text)