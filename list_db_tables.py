#!/usr/bin/env python
"""
Database Table Lister for Sam Schonenberg's Portfolio Project

This script connects to the PostgreSQL database specified in your .env file
and lists all tables, their columns, data types, and constraints in a JSON format
suitable for importing into Claude.ai as project knowledge.

Usage:
    python list_db_tables.py

Requirements:
    - python-dotenv
    - psycopg2-binary
    - sqlalchemy

Install with:
    pip install python-dotenv psycopg2-binary sqlalchemy
"""

import os
import json
import datetime
from dotenv import load_dotenv
from sqlalchemy import create_engine, inspect
from sqlalchemy.exc import SQLAlchemyError

# Load environment variables from .env
load_dotenv()

# Get database URL from environment or use default from README
DATABASE_URL = os.getenv('DATABASE_URL', 'postgresql://sschonenberg:noalynn56@localhost:5433/portfolio')

def get_table_info():
    """Connect to the database and retrieve all table information"""
    try:
        # Create engine
        engine = create_engine(DATABASE_URL)
        
        # Get inspector
        inspector = inspect(engine)
        
        # Dictionary to store all table info
        db_info = {
            "database_name": "portfolio",
            "tables": []
        }
        
        # Get all table names
        table_names = inspector.get_table_names()
        
        if not table_names:
            print("No tables found in the database. The database appears to be empty.")
            return db_info
        
        # For each table, get columns, primary keys, foreign keys, and indexes
        for table_name in table_names:
            table_info = {
                "table_name": table_name,
                "columns": [],
                "primary_keys": inspector.get_pk_constraint(table_name).get('constrained_columns', []),
                "foreign_keys": [],
                "indexes": []
            }
            
            # Get columns
            columns = inspector.get_columns(table_name)
            for column in columns:
                col_info = {
                    "name": column['name'],
                    "type": str(column['type']),
                    "nullable": column.get('nullable', True),
                    "default": str(column.get('default', 'None'))
                }
                table_info["columns"].append(col_info)
            
            # Get foreign keys
            fkeys = inspector.get_foreign_keys(table_name)
            for fkey in fkeys:
                fk_info = {
                    "constrained_columns": fkey.get('constrained_columns', []),
                    "referred_table": fkey.get('referred_table', ''),
                    "referred_columns": fkey.get('referred_columns', [])
                }
                table_info["foreign_keys"].append(fk_info)
            
            # Get indexes
            indexes = inspector.get_indexes(table_name)
            for index in indexes:
                idx_info = {
                    "name": index.get('name', ''),
                    "columns": index.get('column_names', []),
                    "unique": index.get('unique', False)
                }
                table_info["indexes"].append(idx_info)
            
            # Add table info to database info
            db_info["tables"].append(table_info)
            
        return db_info
        
    except SQLAlchemyError as e:
        print(f"Error connecting to database: {e}")
        return None

def save_to_json(db_info):
    """Save the database information to a JSON file"""
    try:
        # Create a more descriptive and structured format for the JSON output
        output_data = {
            "database_name": db_info["database_name"],
            "total_tables": len(db_info["tables"]),
            "last_updated": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "tables": {}
        }
        
        # Process each table into a more readable format
        for table in db_info["tables"]:
            table_name = table["table_name"]
            output_data["tables"][table_name] = {
                "columns": {},
                "primary_keys": table["primary_keys"],
                "foreign_keys": table["foreign_keys"],
                "indexes": table["indexes"]
            }
            
            # Process columns
            for column in table["columns"]:
                output_data["tables"][table_name]["columns"][column["name"]] = {
                    "type": column["type"],
                    "nullable": column["nullable"],
                    "default": column["default"]
                }
        
        # Save to JSON file
        with open('temp/portfolio_db_schema.json', 'w') as json_file:
            json.dump(output_data, json_file, indent=2)
            print(f"Database schema saved to portfolio_db_schema.json")
    
    except Exception as e:
        print(f"Error saving JSON file: {e}")

def main():
    print("Connecting to PostgreSQL database...")
    db_info = get_table_info()
    
    if db_info:
        if db_info["tables"]:
            print(f"Found {len(db_info['tables'])} tables in the database.")
            # Save to JSON file
            save_to_json(db_info)
            print("JSON file is ready to be imported into your Claude.ai project knowledge.")
        else:
            print("No tables found in the database. An empty schema JSON file has been created.")
            save_to_json(db_info)
    else:
        print("Failed to retrieve database information.")

if __name__ == "__main__":
    main()