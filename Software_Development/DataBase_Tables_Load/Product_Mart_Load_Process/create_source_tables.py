import os
import mysql.connector
from mysql.connector import Error
from db_connection import create_db_connection, HOST, PORT, USER, PASSWORD, DATABASE

def execute_sql_script(script_path):
    # Connect to MySQL server without selecting a specific database
    # This is necessary because the SQL script creates the database
    connection = create_db_connection(HOST, USER, PASSWORD, None, PORT)

    if connection is None:
        print("Exiting: Could not establish connection to MySQL server.")
        return

    cursor = connection.cursor()

    try:
        cursor.execute(f"SHOW DATABASES LIKE '{DATABASE}'")
        result = cursor.fetchone()
        if result:
            print(f"Database '{DATABASE}' already exists.")
        else:
            print(f"Database '{DATABASE}' does not exist.")

        if not os.path.exists(script_path):
            print(f"Error: SQL file not found at {script_path}")
            return

        print(f"Reading SQL file: {script_path}")
        with open(script_path, 'r') as file:
            sql_script = file.read()

        print("Executing SQL statements...")
        # multi=True allows executing multiple statements (DDL & DML) in one go
        for result in cursor.execute(sql_script, multi=True):
            pass  # Iterate through the generator to ensure all statements execute
        # The `multi=True` parameter for cursor.execute() has been deprecated
        # in newer versions of mysql-connector-python, causing the TypeError.
        # A reliable method is to split the script into individual statements.
        for statement in sql_script.split(';'):
            if statement.strip():
                cursor.execute(statement)

        connection.commit()
        print("Success: Database tables created and data inserted.")

    except Error as e:
        print(f"MySQL Error: {e}")
    finally:
        if connection and connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection closed.")

if __name__ == "__main__":
    # Locate the SQL file in the same directory as this script
    current_dir = os.path.dirname(os.path.abspath(__file__))
    sql_file = os.path.join(current_dir, "DDL_N_DML_Scripts", "Source_Table_DDL_DML.sql")
    
    execute_sql_script(sql_file)