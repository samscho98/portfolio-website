#!/usr/bin/env python
"""
Script to seed the database with project data for Sam Schonenberg's portfolio.

This script reads from the projects.json file and populates the database
with project and tag data.
"""

import json
import os
import sys
from sqlalchemy import inspect

# Add the parent directory to sys.path
parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
sys.path.insert(0, parent_dir)

from backend import create_app, db
from backend.models import Project, Tag

def seed_projects():
    """Seed the database with projects from JSON file."""
    try:
        # Get the path to the projects.json file
        projects_path = os.path.join('backend', 'data', 'projects.json')
        
        # Check if the file exists
        if not os.path.exists(projects_path):
            print(f"Error: {projects_path} not found.")
            return
        
        with open(projects_path, 'r', encoding='utf-8') as f:
            projects_data = json.load(f)
        
        print(f"Found {len(projects_data)} projects in JSON file.")
        
        # Create tags first
        all_tags = set()
        for project in projects_data:
            for tag in project.get('tags', []):
                all_tags.add(tag)
        
        tag_objects = {}
        for tag_name in all_tags:
            # Check if tag already exists
            existing_tag = Tag.query.filter_by(name=tag_name).first()
            if existing_tag:
                tag_objects[tag_name] = existing_tag
                print(f"Tag '{tag_name}' already exists.")
            else:
                tag = Tag(name=tag_name)
                db.session.add(tag)
                tag_objects[tag_name] = tag
                print(f"Created tag '{tag_name}'.")
        
        # Commit tags to get their IDs
        db.session.commit()
        
        # Create projects
        for project_data in projects_data:
            # Check if project already exists
            existing_project = Project.query.filter_by(slug=project_data['slug']).first()
            if existing_project:
                print(f"Project '{project_data['title']}' with slug '{project_data['slug']}' already exists. Skipping.")
                continue
            
            project = Project(
                title=project_data['title'],
                slug=project_data['slug'],
                description=project_data['description'],
                github=project_data.get('github', ''),
                private=project_data.get('private', False),
                featured=project_data.get('featured', False),
                content=project_data.get('content', ''),
                image_url=project_data.get('image_url', '')
            )
            
            # Add tags to project
            for tag_name in project_data.get('tags', []):
                project.tags.append(tag_objects[tag_name])
            
            db.session.add(project)
            print(f"Created project '{project_data['title']}'.")
        
        db.session.commit()
        print(f"Successfully seeded {len(projects_data)} projects with {len(all_tags)} tags.")
    
    except Exception as e:
        print(f"Error seeding projects: {str(e)}")
        db.session.rollback()

def main():
    """Initialize the database with seed data."""
    # Create and configure app
    app = create_app('development')
    with app.app_context():
        # Check if tables exist using inspect
        inspector = inspect(db.engine)
        if 'projects' not in inspector.get_table_names():
            print("Error: Database tables don't exist. Please run migrations first.")
            return

        # Seed projects
        seed_projects()
        
        print('Database seeding complete.')

if __name__ == '__main__':
    main()