from database.project_image import *
from database.user import query_user, query_user_project
from database.project import insert_project, delete_project

def get_user_password(user_id: int):
    """
    查询用户密码
    :param user_id: 用户ID
    :return: 用户密码，如果用户不存在则返回None
    """
    user_info = query_user(user_id)
    if user_info and len(user_info) > 0 and 'pass_word' in user_info[0]:
        return user_info[0]['pass_word']
    return None

def get_user_projects(user_id: int):
    """
    查询用户对应的project信息
    :param user_id: 用户ID
    :return: 用户的项目列表
    """
    return query_user_project(user_id)

def create_new_project(project_name: str, user_id: int):
    """
    插入新项目
    :param project_name: 项目名称
    :param user_id: 用户ID
    :return: 新项目的ID，如果插入失败则返回None
    """
    return insert_project(project_name, user_id)

def add_project_image(image_path: str, project_id: int):
    """
    为项目添加图片
    :param image_path: 图片路径
    :param project_id: 项目ID
    :return: 插入结果
    """
    return insert_project_image(image_path, project_id)

if __name__ == "__main__":
    # 测试代码
    test_user_id = 1
    
    # 测试获取用户密码
    # password = get_user_password(test_user_id)
    # print(f"用户 {test_user_id} 的密码是: {password}")
    
    # # 测试获取用户项目
    # projects = get_user_projects(test_user_id)
    # print(f"用户 {test_user_id} 的项目有: {projects}")

    # 测试创建新项目
    new_project_name = "测试新项目"
    new_project_id = create_new_project(new_project_name, test_user_id)
    if new_project_id:
        print(f"成功创建新项目，ID为: {new_project_id}")
    else:
        print("创建新项目失败")

    # 测试为项目添加图片
    if new_project_id:
        image_path = "./test_image.png"
        result = add_project_image(image_path, new_project_id)
        if result:
            print(f"成功为项目 {new_project_id} 添加图片")
        else:
            print(f"为项目 {new_project_id} 添加图片失败")







