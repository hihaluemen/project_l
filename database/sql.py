import pymysql
from dbutils.pooled_db import PooledDB

mysql_config = {"host": "localhost", "user": "root",
                "password": "bluemen", "database": "manager_system"}

class MysqlConn(object):
    """这是一个mysql整合类"""

    def __init__(self, mysql_config):
        # mysql连接池
        self.mysqlPool = PooledDB(
            creator=pymysql,
            maxconnections=32,
            mincached=10,
            blocking=True,
            ping=1,  # 设置为1，连接池会检查连接是否有效
            host=mysql_config["host"],
            user=mysql_config["user"],
            password=mysql_config["password"],
            database=mysql_config["database"],
            port=3306,
        )
        self.conn = None
        self.cursor = None

    def open(self):
        self.conn = self.mysqlPool.connection()
        try:
            # 尝试执行一个简单的查询来检查连接是否有效
            self.conn.cursor().execute('SELECT 1')
            self.cursor = self.conn.cursor(cursor=pymysql.cursors.DictCursor)
        except Exception as e:
            # 如果出现异常，则关闭连接并重新获取一个新连接
            self.conn.close()
            self.conn = self.mysqlPool.connection()
            self.cursor = self.conn.cursor(cursor=pymysql.cursors.DictCursor)

    def close(self):
        try:
            if self.conn:
                # 尝试回滚事务（如果有的话）
                self.conn.rollback()
                self.cursor.close()
                self.conn.close()
                self.conn = None
                self.cursor = None
        except Exception as e:
            print(f"Error closing connection: {e}")

    def execu_sql(self, sql, args=None):
        self.open()
        try:
            result = self.cursor.execute(sql, args)
            self.conn.commit()  # 确保更改被提交
            self.close()
            return result
        except Exception as e:
            print(f"Error executing SQL: {sql} with args {args}, error: {e}")
            self.conn.rollback()
            self.close()
            return False

    def list_data(self, sql, args=None):
        self.open()
        try:
            self.cursor.execute(sql, args)
            result = self.cursor.fetchall()
            self.conn.commit()  # 确保查询被提交
            self.close()
            return result
        except Exception as e:
            print(f"Error executing SQL: {sql} with args {args}, error: {e}")
            self.conn.rollback()
            self.close()
            return []


mysql_cli = MysqlConn(mysql_config)


def sql_excu(sql_str: str) -> int:
    result = mysql_cli.execu_sql(sql_str)
    print("sql执行的结果是：", result)
    return result


def sql_search(sql_str: str) -> int:
    result = mysql_cli.list_data(sql_str)
    print(f"一共查询到 {len(result)} 个结果")
    return result
