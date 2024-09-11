import sql


def insert_project(project_name):
    sql_insert_project = f"""
    INSERT INTO project_image (project_name) 
    VALUES ('{project_name}');
    """
    print(sql_insert_project)
    insert_result =sql.sql_excu (sql_insert_project)
    print("插入Project Image的结果为", insert_result)
    return insert_result

if __name__ == '__main__':
    image_path = "test1"
    insert_project(image_path)