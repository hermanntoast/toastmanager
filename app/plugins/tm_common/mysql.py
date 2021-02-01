import mysql.connector

from .config import ConfigReader
from .exceptions import MySQLException

class MySQLConnector:
    def __init__(self):
        config = ConfigReader().load().get()
        self.mysql = mysql.connector.connect(
          host=config["mysql_host"],
          user=config["mysql_user"],
          password=config["mysql_password"],
          database=config["mysql_database"]
        )
        if self.mysql == None:
            raise(MySQLException("MySQL Connection failed!"))

    def query(self, query):
        cursor = self.mysql.cursor()
        cursor.execute(query)
        return cursor.fetchall()

    def get(self, table, fields, append=""):
        cursor = self.mysql.cursor()
        field_string = ""
        for field in fields:
            field_string += field + ","
        field_string = field_string[:-1]
        cursor.execute("SELECT " + field_string + " FROM " + table + " " + append)
        query_results = cursor.fetchall()
        result = []
        for query_result in query_results:
            tmp = {}
            for i in range(0, len(fields)):
                tmp[fields[i]] = str(query_result[i])
            result.append(tmp)
        return result

    def insert(self, table, data_param):
        if type(data_param) == type([]):
            datas = data_param
        else:
            datas = [data_param]

        for data in datas:
            cursor = self.mysql.cursor()
            fields = list(data.keys())
            values = []
            for value in data:
                values.append(data[value])
            fields_string = ""
            for field in fields:
                fields_string += field + ","
            fields_string = fields_string[:-1]
            values_placeholder = ""
            for value in values:
                values_placeholder += "%s" + ","
            values_placeholder = values_placeholder[:-1]
            cursor.execute("INSERT INTO " + table + " (" + fields_string + ") VALUES (" + values_placeholder + ")", values)
            self.mysql.commit()
        return {"status": "success"}

    def delete(self, table, filter):
        cursor = self.mysql.cursor()
        cursor.execute("DELETE FROM " + table + " WHERE " + filter)
        self.mysql.commit()
        return {"status": "success"}
