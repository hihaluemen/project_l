import sql
import datetime
from sql import mysql_cli


def insert_project_image(imagePath, projectName, uploadTime=None):
    if uploadTime is None:
        uploadTime = datetime.datetime.now()
        uploadTime = uploadTime.strftime('%Y-%m-%d %H:%M:%S')
    sql_insert_project_image = f"""
    INSERT INTO project_image ( imagePath, projectName,uploadTime) 
    VALUES ('{imagePath}', '{projectName}', '{uploadTime}');"""
    print(sql_insert_project_image)
    insert_result = mysql_cli.execute_query(sql_insert_project_image)
    print("插入Project Image的结果为", insert_result)
    return insert_result


