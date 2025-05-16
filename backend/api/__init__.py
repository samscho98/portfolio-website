from flask import Blueprint

api = Blueprint('api', __name__)

# Import routes at the bottom to avoid circular imports
from . import health
from . import projects
from . import contact 

# from . import auth
# from . import clients
# from . import freelance_projects
# from . import time_logs
# from . import invoices