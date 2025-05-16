from flask import jsonify, request
from backend import db
from backend.models import Project, Tag
from . import api

@api.route('/projects', methods=['GET'])
def get_projects():
    """Get all projects or filter by tag."""
    try:
        # Check if tag filter is provided
        tag = request.args.get('tag')
        
        if tag:
            # Filter projects by tag
            projects = Project.query.join(Project.tags).filter(Tag.name == tag).all()
        else:
            # Get all projects
            projects = Project.query.all()
        
        # Convert projects to JSON format
        result = []
        for project in projects:
            project_data = {
                'id': project.id,
                'title': project.title,
                'slug': project.slug,
                'description': project.description,
                'github': project.github,
                'private': project.private,
                'featured': project.featured,
                'tags': [tag.name for tag in project.tags]
            }
            result.append(project_data)
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@api.route('/projects/featured', methods=['GET'])
def get_featured_projects():
    """Get featured projects."""
    try:
        # Get all featured projects
        featured_projects = Project.query.filter_by(featured=True).all()
        
        # Convert projects to JSON format
        result = []
        for project in featured_projects:
            project_data = {
                'id': project.id,
                'title': project.title,
                'slug': project.slug,
                'description': project.description,
                'github': project.github,
                'private': project.private,
                'featured': project.featured,
                'tags': [tag.name for tag in project.tags]
            }
            result.append(project_data)
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@api.route('/projects/<slug>', methods=['GET'])
def get_project_by_slug(slug):
    """Get a project by its slug."""
    try:
        # Find project by slug
        project = Project.query.filter_by(slug=slug).first()
        
        if not project:
            return jsonify({
                'status': 'error',
                'message': 'Project not found'
            }), 404
        
        # Convert project to JSON format
        project_data = {
            'id': project.id,
            'title': project.title,
            'slug': project.slug,
            'description': project.description,
            'github': project.github,
            'private': project.private,
            'featured': project.featured,
            'content': project.content,
            'tags': [tag.name for tag in project.tags]
        }
        
        return jsonify(project_data)
    
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500