import os
import mysql.connector
from mysql.connector import Error
from db_connection import create_db_connection, HOST, PORT, USER, PASSWORD, DATABASE

def execute_sql_script(script_path):
    # Connect to MySQL server
    # We connect directly to the database as it should already exist from the source load
    connection = create_db_connection(HOST, USER, PASSWORD, DATABASE, PORT)

    if connection is None:
        print("Exiting: Could not establish connection to MySQL server.")
        return

    cursor = connection.cursor()

    try:
        if not os.path.exists(script_path):
            print(f"Error: SQL file not found at {script_path}")
            return

        print(f"Reading SQL file: {script_path}")
        with open(script_path, 'r') as file:
            sql_script = file.read()

        print("Executing SQL statements...")
        
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
                    print(f"Failed to execute statement: {statement.strip()}")
                    print(f"Error: {err}")
                    # Rollback changes on error
                    connection.rollback()
                    raise

        # If all statements executed successfully, commit the transaction.
        connection.commit()
        print("Success: Target table created and data populated.")

    except Error as e:
        print(f"MySQL Error: {e}")
    finally:
        if connection and connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection closed.")

if __name__ == "__main__":
    # Locate the SQL file in the DDL_N_DML_Scripts directory
    current_dir = os.path.dirname(os.path.abspath(__file__))
    sql_file = os.path.join(current_dir, "DDL_N_DML_Scripts", "Target_Table_DDL.sql")
    
    execute_sql_script(sql_file)