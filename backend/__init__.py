from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
import os

# Initialize extensions
db = SQLAlchemy()
migrate = Migrate()

def create_app(config_name=None):
    """Create and configure the Flask application."""
    app = Flask(__name__)
    
    # Determine the configuration to use
    if config_name is None:
        config_name = os.environ.get('FLASK_CONFIG', 'default')
    
    # Import config at runtime to avoid circular imports
    from backend.config import config
    
    # Apply configuration
    app.config.from_object(config[config_name])
    
    # Initialize extensions with app
    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app)
    
    # Register blueprints
    from backend.api import api as api_blueprint
    app.register_blueprint(api_blueprint, url_prefix='/api')
    
    return app