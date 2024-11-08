import requests
import json

# 定义请求的URL
# url = 'http://127.0.0.1:29000/data'
url = 'http://127.0.0.1:29000/data-new'

# # 定义请求参数
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
# payload = {
#     "work_data": [
#         # {"identifier":"1","partition":"土地","classify":"土地","name":"项目开始","duration":"0","prerequisite":"","start_date":"2024-02-01","end_date":"2024-02-01","cost":""},
#         {"identifier":"2","partition":"土地","classify":"土地","name":"城市花园开发总计划","duration":"110","prerequisite":"","start_date":"2024-02-01","end_date":"2024-05-20","cost":""},
#         {"identifier":"3","partition":"土地","classify":"土地","name":"1号楼","duration":"110","prerequisite":"","start_date":"2024-02-01","end_date":"2024-05-20","cost":""},
#         {"identifier":"4","partition":"土地","classify":"土地","name":"  地基与基础","duration":"75","prerequisite":"","start_date":"2024-02-01","end_date":"2024-04-15","cost":"10"},
#         {"identifier":"5","partition":"土地","classify":"土地","name":"     施工准备","duration":"29","prerequisite":"","start_date":"2024-02-01","end_date":"2024-02-29","cost":"10"},
#         {"identifier":"6","partition":"土地","classify":"土地","name":"     支护","duration":"21","prerequisite":"5","start_date":"2024-03-01","end_date":"2024-03-20","cost":"10"},
#         {"identifier":"7","partition":"土地","classify":"土地","name":"     基础施工","duration":"31","prerequisite":"5","start_date":"2024-03-01","end_date":"2024-03-31","cost":"10"},
#         {"identifier":"8","partition":"土地","classify":"土地","name":"     地下室结构","duration":"15","prerequisite":"6，7","start_date":"2024-04-01","end_date":"2024-04-15","cost":"10"},
#         {"identifier":"9","partition":"土地","classify":"土地","name":"  主体结构施工","duration":"35","prerequisite":"","start_date":"2024-04-16","end_date":"2024-05-10","cost":"10"},
#         {"identifier":"10","partition":"土地","classify":"土地","name":"    1-4层混泥土结构","duration":"17","prerequisite":"8","start_date":"2024-04-16","end_date":"2024-05-02","cost":"10"},
#         {"identifier":"11","partition":"土地","classify":"土地","name":"    5-8层混泥土结构","duration":"18","prerequisite":"10","start_date":"2024-05-03","end_date":"2024-05-20","cost":"10"},
#         # {"identifier":"12","partition":"土地","classify":"土地","name":"项目结束","duration":"0","prerequisite":"","start_date":"2024-05-20","end_date":"2024-05-20"}
#     ]
# }


# 定义请求参数
# payload = {
#     "work_data": [{"identifier":"1","partition":"土地","classify":"土地","name":"项目开始","duration":"3","prerequisite":"","start_date":"2024-01-29","end_date":"2024-02-01","cost":""},
#                   {"identifier":"2","partition":"土地","classify":"土地","name":"城市花园开发总计划","duration":"110","prerequisite":"1","start_date":"2024-02-01","end_date":"2024-05-20","cost":""},
#                   {"identifier":"3","partition":"土地","classify":"土地","name":"1号楼","duration":"110","prerequisite":"1","start_date":"2024-02-01","end_date":"2024-05-20","cost":""},
#                   {"identifier":"4","partition":"土地","classify":"土地","name":"  地基与基础","duration":"10","prerequisite":"2","start_date":"2024-05-20","end_date":"2024-05-30","cost":"10"},
#                   {"identifier":"5","partition":"土地","classify":"土地","name":"     施工准备","duration":"11","prerequisite":"2, 3","start_date":"2024-05-20","end_date":"2024-05-31","cost":"10"},
#                   {"identifier":"6","partition":"土地","classify":"土地","name":"     支护","duration":"10","prerequisite":"4, 5","start_date":"2024-06-01","end_date":"2024-06-10","cost":"10"}
#                   ]
# }

# payload = {
#   "work_data": [
#     {
#       "identifier": "2",
#       "partition": "施工",
#       "classify": "施工",
#       "name": "施工计划修正",
#       "duration": "4",
#       "prerequisite": "",
#       "start_date": "2006-01-01",
#       "end_date": "2006-01-05",
#       "cost": ""
#     },
#     {
#       "identifier": "7",
#       "partition": "施工",
#       "classify": "施工",
#       "name": "1号楼施工准备",
#       "duration": "6",
#       "prerequisite": "2",
#       "start_date": "2006-01-05",
#       "end_date": "2006-01-11",
#       "cost": ""
#     },
#     {
#       "identifier": "8",
#       "partition": "施工",
#       "classify": "施工",
#       "name": "1号楼机电工程安装",
#       "duration": "26",
#       "prerequisite": "7",
#       "start_date": "2006-01-11",
#       "end_date": "2006-02-06",
#       "cost": ""
#     },
#     {
#       "identifier": "11",
#       "partition": "施工",
#       "classify": "施工",
#       "name": "2号楼施工准备",
#       "duration": "6",
#       "prerequisite": "2",
#       "start_date": "2006-01-05",
#       "end_date": "2006-01-11",
#       "cost": ""
#     },
#     {
#       "identifier": "12",
#       "partition": "施工",
#       "classify": "施工",
#       "name": "2号楼机电工程安装",
#       "duration": "39",
#       "prerequisite": "11",
#       "start_date": "2006-01-11",
#       "end_date": "2006-02-19",
#       "cost": ""
#     },
#     {
#       "identifier": "13",
#       "partition": "施工",
#       "classify": "施工",
#       "name": "2号楼分项工程检验、调试",
#       "duration": "14",
#       "prerequisite": "12",
#       "start_date": "2006-02-19",
#       "end_date": "2006-03-05",
#       "cost": ""
#     },
#     {
#       "identifier": "16",
#       "partition": "施工",
#       "classify": "施工",
#       "name": "3号楼施工准备",
#       "duration": "6",
#       "prerequisite": "2",
#       "start_date": "2006-01-05",
#       "end_date": "2006-01-11",
#       "cost": ""
#     },
#     {
#       "identifier": "17",
#       "partition": "施工",
#       "classify": "施工",
#       "name": "3号楼机电工程安装",
#       "duration": "18",
#       "prerequisite": "16",
#       "start_date": "2006-01-11",
#       "end_date": "2006-01-29",
#       "cost": ""
#     },
#     {
#       "identifier": "18",
#       "partition": "施工",
#       "classify": "施工",
#       "name": "3号楼分项工程检验、调试",
#       "duration": "8",
#       "prerequisite": "17",
#       "start_date": "2006-01-29",
#       "end_date": "2006-02-06",
#       "cost": ""
#     },
#     {
#       "identifier": "20",
#       "partition": "施工",
#       "classify": "施工",
#       "name": "全系统联调、试运行",
#       "duration": "10",
#       "prerequisite": "8,13,18",
#       "start_date": "2006-03-05",
#       "end_date": "2006-03-15",
#       "cost": ""
#     },
#     {
#       "identifier": "21",
#       "partition": "施工",
#       "classify": "施工",
#       "name": "综合交工验收",
#       "duration": "5",
#       "prerequisite": "20",
#       "start_date": "2006-03-15",
#       "end_date": "2006-03-20",
#       "cost": ""
#     }
#   ]
# }

payload = {
  "work_data": [
    {
      "identifier": "A",
      "partition": "施工",
      "classify": "施工",
      "name": "施工计划修正",
      "duration": "4",
      "prerequisite": "",
      "start_date": "2006-01-01",
      "end_date": "2006-01-05",
      "cost": ""
    },
    {
      "identifier": "B",
      "partition": "施工",
      "classify": "施工",
      "name": "1号楼施工准备",
      "duration": "6",
      "prerequisite": "A",
      "start_date": "2006-01-05",
      "end_date": "2006-01-11",
      "cost": ""
    },
    {
      "identifier": "C",
      "partition": "施工",
      "classify": "施工",
      "name": "1号楼机电工程安装",
      "duration": "26",
      "prerequisite": "B",
      "start_date": "2006-01-11",
      "end_date": "2006-02-06",
      "cost": ""
    },
    {
      "identifier": "D",
      "partition": "施工",
      "classify": "施工",
      "name": "2号楼施工准备",
      "duration": "6",
      "prerequisite": "A",
      "start_date": "2006-01-05",
      "end_date": "2006-01-11",
      "cost": ""
    },
    {
      "identifier": "E",
      "partition": "施工",
      "classify": "施工",
      "name": "2号楼机电工程安装",
      "duration": "39",
      "prerequisite": "D",
      "start_date": "2006-01-11",
      "end_date": "2006-02-19",
      "cost": ""
    },
    {
      "identifier": "F",
      "partition": "施工",
      "classify": "施工",
      "name": "2号楼分项工程检验、调试",
      "duration": "14",
      "prerequisite": "E",
      "start_date": "2006-02-19",
      "end_date": "2006-03-05",
      "cost": ""
    },
    {
      "identifier": "G",
      "partition": "施工",
      "classify": "施工",
      "name": "3号楼施工准备",
      "duration": "6",
      "prerequisite": "A",
      "start_date": "2006-01-05",
      "end_date": "2006-01-11",
      "cost": ""
    },
    {
      "identifier": "H",
      "partition": "施工",
      "classify": "施工",
      "name": "3号楼机电工程安装",
      "duration": "18",
      "prerequisite": "G",
      "start_date": "2006-01-11",
      "end_date": "2006-01-29",
      "cost": ""
    },
    {
      "identifier": "I",
      "partition": "施工",
      "classify": "施工",
      "name": "3号楼分项工程检验、调试",
      "duration": "8",
      "prerequisite": "H",
      "start_date": "2006-01-29",
      "end_date": "2006-02-06",
      "cost": ""
    },
    {
      "identifier": "J",
      "partition": "施工",
      "classify": "施工",
      "name": "全系统联调、试运行",
      "duration": "10",
      "prerequisite": "C,F,I",
      "start_date": "2006-03-05",
      "end_date": "2006-03-15",
      "cost": ""
    },
    {
      "identifier": "K",
      "partition": "施工",
      "classify": "施工",
      "name": "综合交工验收",
      "duration": "5",
      "prerequisite": "J",
      "start_date": "2006-03-15",
      "end_date": "2006-03-20",
      "cost": ""
    }
  ]
}

payload = {
  "work_data": [
  {
    "identifier": "A",
    "partition": "土建工程",
    "classify": "基础施工",
    "name": "基础开挖",
    "duration": 5,
    "prerequisite": "",
    "start_date": "2023-04-01",
    "end_date": "2023-04-06",
    "cost": ""
  },
  {
    "identifier": "B",
    "partition": "土建工程",
    "classify": "主体结构",
    "name": "混凝土浇筑",
    "duration": 7,
    "prerequisite": "A",
    "start_date": "2023-04-06",
    "end_date": "2023-04-13",
    "cost": ""
  },
  {
    "identifier": "C",
    "partition": "电气工程",
    "classify": "电缆敷设",
    "name": "主电缆铺设",
    "duration": 7,
    "prerequisite": "A",
    "start_date": "2023-04-06",
    "end_date": "2023-04-13",
    "cost": ""
  },
  {
    "identifier": "D",
    "partition": "电气工程",
    "classify": "设备安装",
    "name": "变压器安装",
    "duration": 2,
    "prerequisite": "B",
    "start_date": "2023-04-13",
    "end_date": "2023-04-15",
    "cost": ""
  },
  {
    "identifier": "E",
    "partition": "暖通空调工程",
    "classify": "管道安装",
    "name": "冷热水管路安装",
    "duration": 4,
    "prerequisite": "B,C",
    "start_date": "2023-04-13",
    "end_date": "2023-04-17",
    "cost": ""
  },
  {
    "identifier": "F",
    "partition": "暖通空调工程",
    "classify": "设备安装",
    "name": "空调机组安装",
    "duration": 3,
    "prerequisite": "D,E",
    "start_date": "2023-04-17",
    "end_date": "2023-04-19",
    "cost": ""
  }
]
}



# 将数据转换为JSON格式
json_data = json.dumps(payload)

# 发送POST请求
response = requests.post(url, data=json_data, headers={'Content-Type': 'application/json'})

# 打印响应内容
print(response.text)
for k, v in response.json().items():
  if k == 'edge_info':
    for kk, vv in v.items():
      print(kk)
      print(vv)
      print('=======')
