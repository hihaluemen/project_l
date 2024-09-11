import sql



def insert_project_image(image_path, project_id):
    sql_insert_project_image = f"""
    INSERT INTO project_image ( image_path, project_id) 
    VALUES ('{image_path}', '{project_id}');
    """
    print(sql_insert_project_image)
    insert_result =sql.sql_excu (sql_insert_project_image)
    print("插入Project Image的结果为", insert_result)
    return insert_result

if __name__ == '__main__':
    image_path = "/project_l/images/test.jpg"
    project_id = 2
    insert_project_image(image_path, project_id)

