import sql



def insert_project_image(image_path:str, project_id:int):
    sql_insert_project_image = f"""
    INSERT INTO project_image ( image_path, project_id) 
    VALUES ('{image_path}', '{project_id}');
    """
    print(sql_insert_project_image)
    insert_result =sql.sql_excu (sql_insert_project_image)
    print("插入Project Image的结果为", insert_result)
    return insert_result

def query_project_image(project_id:int):
    sql_query_project_image = f"""
    SELECT * FROM project_image WHERE project_id = '{project_id}';
    """
    print(sql_query_project_image)
    query_result =sql.sql_excu (sql_query_project_image)
    print("查询Project Image的结果为", query_result)
    return query_result

def update_project_image(image_path:str, project_id:int):
    sql_update_project_image = f"""
    UPDATE project_image SET image_path = '{image_path}' WHERE project_id = '{project_id}';
    """
    print(sql_update_project_image)
    update_result =sql.sql_excu (sql_update_project_image)
    print("更新Project Image的结果为", update_result)
    return update_result
def delete_project_image(project_id:int):
    sql_delete_project_image = f"""
    DELETE FROM project_image WHERE project_id = '{project_id}';
    """
    print(sql_delete_project_image)
    delete_result =sql.sql_excu (sql_delete_project_image)
    print("删除Project Image的结果为", delete_result)
    return delete_result

if __name__ == '__main__':
    project_id = 2
    delete_project_image(project_id);


