import aj
import yaml

from aj.auth import AuthenticationProvider, OSAuthenticationProvider, AuthenticationService
from aj.config import UserConfigProvider
from jadi import component

@component(AuthenticationProvider)
class TMAuthenticationProvider(AuthenticationProvider):
    id = 'tm'
    name = 'TM Users'

    def __init__(self, context):
        self.context = context

    def authenticate(self, username, password):
        if username == "admin" and password == "Muster!":
            # permissions = { "sidebar:view:/view/dashboard": "true" }
            # return { "username": username, "password": password, "permissions": permissions }
            return True
        else:
            return False

    def authorize(self, username, permission):
        return True

    def get_isolation_uid(self, username):
        return 0

    def get_isolation_gid(self, username):
        return None

@component(UserConfigProvider)
class TMConfigProvider(UserConfigProvider):
    id = 'tm'
    name = "TM Config"

    def __init__(self, context):
        UserConfigProvider.__init__(self, context)
        self.context = context
        try:
            self.user = context.identity
        except AttributeError as e:
            self.user = None
        if self.user:
            self.load()
        else:
            self.data = {}

    def load(self):
        self.data = {}

    def save(self):
        return
