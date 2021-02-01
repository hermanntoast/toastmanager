from jadi import component

from aj.api.http import url, HttpPlugin
from aj.auth import authorize
from aj.api.endpoint import endpoint, EndpointError
from aj.plugins.tm_common.mysql import MySQLConnector

@component(HttpPlugin)
class Handler(HttpPlugin):
    def __init__(self, context):
        self.context = context

    @url(r'/api/tm/projects/list')
    #@authorize('tm_projects:show')
    @endpoint(api=True)
    def handle_api_tm_projects_list(self, http_context):
        mysql = MySQLConnector()
        if http_context.method == 'GET':
            result = mysql.get("tm_projects", ["id", "name", "description"])
            return result

    @url(r'/api/tm/projects/get')
    #@authorize('tm_projects:show')
    @endpoint(api=True)
    def handle_api_tm_projects_get(self, http_context):
        mysql = MySQLConnector()
        if http_context.method == 'POST':
            project_id = http_context.json_body()['project_id']
            result = mysql.get("tm_projects", ["id", "name", "description", "permission", "created", "author", "global_username", "global_password", "global_sshkey"], "WHERE id LIKE '" + str(project_id) + "'")
            return result

    @url(r'/api/tm/projects/create')
    #@authorize('tm_projects:show')
    @endpoint(api=True)
    def handle_api_tm_projects_create(self, http_context):
        mysql = MySQLConnector()
        if http_context.method == 'POST':
            project = {}
            project["name"] = http_context.json_body()['project_name']
            project["description"] = http_context.json_body()['project_description']
            project["permission"] = http_context.json_body()['project_permission']
            project["author"] = http_context.json_body()['project_author']
            try:
                project["global_username"] = http_context.json_body()['project_global_username']
            except:
                project["global_username"] = ""
            try:
                project["global_password"] = http_context.json_body()['project_global_password']
            except:
                project["global_password"] = ""
            try:
                project["global_sshkey"] = http_context.json_body()['project_global_sshkey']
            except:
                project["global_sshkey"] = ""
            result = mysql.insert("tm_projects", project)
            return result

    @url(r'/api/tm/projects/delete')
    #@authorize('tm_projects:show')
    @endpoint(api=True)
    def handle_api_tm_projects_delete(self, http_context):
        mysql = MySQLConnector()
        if http_context.method == 'POST':
            project_id = http_context.json_body()['project_id']
            result = mysql.delete("tm_projects", "id LIKE '" + str(project_id) + "'")
            return result

    @url(r'/api/tm/hosts/list')
    #@authorize('tm_projects:show')
    @endpoint(api=True)
    def handle_api_tm_hosts_list(self, http_context):
        mysql = MySQLConnector()
        if http_context.method == 'POST':
            project_id = http_context.json_body()['project_id']
            result = mysql.get("tm_hosts", ["id", "name", "address", "description"], "WHERE project LIKE '" + project_id + "'")
            return result

    @url(r'/api/tm/hosts/create')
    #@authorize('tm_projects:show')
    @endpoint(api=True)
    def handle_api_tm_hosts_create(self, http_context):
        mysql = MySQLConnector()
        if http_context.method == 'POST':
            host = {}
            host["name"] = http_context.json_body()['host_name']
            host["address"] = http_context.json_body()['host_address']
            host["description"] = http_context.json_body()['host_description']
            host["author"] = http_context.json_body()['host_author']
            host["project"] = http_context.json_body()['host_project']
            try:
                host["username"] = http_context.json_body()['project_username']
            except:
                host["username"] = ""
            try:
                host["password"] = http_context.json_body()['project_password']
            except:
                host["password"] = ""
            try:
                host["sshkey"] = http_context.json_body()['project_sshkey']
            except:
                host["sshkey"] = ""
            try:
                host["hophost"] = http_context.json_body()['host_hophost']
            except:
                pass
            result = mysql.insert("tm_hosts", host)
            return result
