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

        # In newer versions of mysql-connector-python, the `multi=True`
        # argument is removed. The execute() method now handles multiple
        # statements by default. We must iterate through the results
        # using the cursor.nextset() method.
        
        # We split the script by semicolons to execute statement by statement.
        # This is a simple and effective way to handle most SQL scripts.
        # Note: This might not work for scripts containing stored procedures
        # that redefine the DELIMITER.
        
        # Read the entire SQL script from the file
        with open(sql_file_path, 'r') as f:
            sql_script = f.read()

        # Split the script into individual statements
        statements = sql_script.split(';')

        for statement in statements:
            # Skip empty statements that can result from splitting
            if statement.strip():
                try:
                    cursor.execute(statement)
                    # If the statement was a DML (INSERT, UPDATE, etc.),
                    # commit the transaction.
                    if cursor.rowcount > 0:
                         print(f"Rows affected: {cursor.rowcount}")
                    
                    # If the statement was a SELECT, we need to fetch the results
                    # to avoid an "Unread result" error.
                    if cursor.with_rows:
                        cursor.fetchall()

                except mysql.connector.Error as err:
                    # If a single statement fails, print the error and stop.
                    print(f"Failed to execute statement: {statement.strip()}")
                    print(f"Error: {err}")
                    # Rollback changes on error
                    cnx.rollback()
                    raise

        # If all statements executed successfully, commit the transaction.
        cnx.commit()


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