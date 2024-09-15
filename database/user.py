from database.sql import sql_search, sql_excu


def query_user(user_id:int):
    sql_query_project_image = f"""
    SELECT * FROM user WHERE user_id = '{user_id}';
    """
    print(sql_query_project_image)
    query_result = sql_search(sql_query_project_image)
    print("查询Project Image的结果为", query_result)
    return query_result


def query_user_project(user_id: int):
    sql_query_user_projects = f"""
    SELECT p.project_id, p.project_name, p.update_time
    FROM project p
    JOIN user_project up ON p.project_id = up.project_id
    WHERE up.user_id = {user_id};
    """
    print(sql_query_user_projects)
    query_result = sql_search(sql_query_user_projects)
    print("查询用户项目的结果为", query_result)
    return query_result


if __name__ == "__main__":
    # query_user(1)
    query_user_project(1)