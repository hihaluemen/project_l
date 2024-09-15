from database.sql import sql_excu, sql_search


def insert_project(project_name: str, user_id: int):
    """
    插入新项目并建立与用户的关联
    :param project_name: 项目名称
    :param user_id: 创建项目的用户ID
    :return: 新插入项目的ID，如果插入失败则返回None
    """
    # 插入项目
    sql_insert_project = f"""
    INSERT INTO project (project_name) VALUES ('{project_name}');
    """
    print(f"执行插入项目SQL: {sql_insert_project}")
    insert_result = sql_excu(sql_insert_project)
    
    if insert_result:
        # 查询刚刚插入的项目ID
        sql_get_project_id = f"""
        SELECT project_id FROM project WHERE project_name = '{project_name}'
        ORDER BY update_time DESC LIMIT 1;
        """
        print(f"执行查询新项目ID的SQL: {sql_get_project_id}")
        project_id_result = sql_search(sql_get_project_id)
        
        if project_id_result and len(project_id_result) > 0 and 'project_id' in project_id_result[0]:
            new_project_id = project_id_result[0]['project_id']
            
            # 创建用户-项目关联
            sql_insert_user_project = f"""
            INSERT INTO user_project (project_id, user_id) VALUES ({new_project_id}, {user_id});
            """
            print(f"执行插入用户-项目关联SQL: {sql_insert_user_project}")
            user_project_result = sql_excu(sql_insert_user_project)
            
            if user_project_result:
                return new_project_id
            else:
                print("创建用户-项目关联失败")
                return None
        else:
            print("获取新项目ID失败")
            return None
    else:
        print("插入项目失败")
        return None

def delete_project(project_id: int):
    """
    删除指定ID的项目
    :param project_id: 要删除的项目ID
    :return: 布尔值，表示删除操作是否成功
    """
    # 首先删除user_project表中的相关记录
    sql_delete_user_project = f"""
    DELETE FROM user_project WHERE project_id = {project_id};
    """
    print(f"执行删除用户项目关联SQL: {sql_delete_user_project}")
    sql_excu(sql_delete_user_project)

    # 然后删除project表中的记录
    sql_delete_project = f"""
    DELETE FROM project WHERE project_id = {project_id};
    """
    print(f"执行删除项目SQL: {sql_delete_project}")
    result = sql_excu(sql_delete_project)
    return result


if __name__ == "__main__":
    # 测试插入函数
    new_project_name = "测试项目"
    test_user_id = 1  # 假设用户ID为1
    new_project_id = insert_project(new_project_name, test_user_id)
    if new_project_id:
        print(f"成功插入新项目并与用户关联，新项目ID为: {new_project_id}")
    else:
        print("插入项目或创建用户-项目关联失败")

    # 测试删除函数
    # if new_project_id:
    #     delete_result = delete_project(new_project_id)
    #     if delete_result:
    #         print(f"成功删除项目，ID为: {new_project_id}")
    #     else:
    #         print(f"删除项目失败，ID为: {new_project_id}")

