import os
import sys

# Add the parent directory to sys.path
parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.insert(0, parent_dir)

# Now import from backend
from backend import create_app, db

# Import models after app is created to avoid circular imports
app = create_app(os.getenv('FLASK_CONFIG') or 'default')

@app.shell_context_processor
def make_shell_context():
    """Configure Flask shell context."""
    # Import models here to avoid circular imports
    from backend.models import User, Project, Tag, Contact, Client, FreelanceProject, TimeLog, Invoice
    
    return dict(
        db=db, 
        User=User, 
        Project=Project, 
        Tag=Tag, 
        Contact=Contact,
        Client=Client,
        FreelanceProject=FreelanceProject,
        TimeLog=TimeLog,
        Invoice=Invoice
    )

if __name__ == '__main__':
    app.run(debug=True)