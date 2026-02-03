import os
import datetime
from db_connection import create_db_connection, HOST, PORT, USER, PASSWORD, DATABASE

def check_source_tables_exist(connection):
    """
    Checks if the source tables (specifically 'Products') exist in the database.
    """
    cursor = connection.cursor()
    try:
        cursor.execute(f"""
            SELECT COUNT(*)
            FROM information_schema.tables
            WHERE table_schema = '{DATABASE}' AND table_name IN ('Departments', 'Employees', 'Categories', 'Suppliers', 'Products', 'Customers', 'Shippers', 'Orders', 'OrderDetails', 'Payments');
        """)
        count = cursor.fetchone()[0]
        # There are 10 source tables
        return count == 10
    except Exception as e:
        log_status(f"Error checking for source tables: {e}")
        return False
    finally:
        cursor.close()

def execute_sql_from_file(script_path, connection):
    """
    Executes a SQL script from a file.
    """
    cursor = connection.cursor()
    try:
        with open(script_path, 'r') as file:
            sql_script = file.read()
        
        statements = sql_script.split(';')

        for statement in statements:
            if statement.strip():
                cursor.execute(statement)
                if cursor.with_rows:
                    cursor.fetchall() # Consume any results
        
        connection.commit()
        log_status(f"Successfully executed {os.path.basename(script_path)}")
    except Exception as e:
        log_status(f"Error executing {os.path.basename(script_path)}: {e}")
        connection.rollback()
        raise
    finally:
        cursor.close()

def log_status(message):
    """
    Logs a message to a status file with a timestamp.
    """
    log_dir = "Status_Logs"
    if not os.path.exists(log_dir):
        os.makedirs(log_dir)
    
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    log_file_path = os.path.join(log_dir, f"Status_log_{timestamp}.txt")
    
    with open(log_file_path, "a") as f:
        f.write(f"{datetime.datetime.now()}: {message}\n")
    print(message)

def main():
    """
    Main function to orchestrate the data loading process.
    """
    log_status("Master load process started.")
    
    # It's important to connect to the DB without specifying a database initially
    # to check if it exists and to create it if it doesn't.
    # The create_source_tables.py script handles database creation.
    # However, for the check, we must connect to a database.
    # We will connect to the target DB, and if it fails, we assume it's the first run.
    
    connection = create_db_connection(HOST, USER, PASSWORD, DATABASE, PORT)
    
    if not connection:
        log_status("Could not connect to the database. Running initial setup...")
        # If connection to the specific database fails, we can't check for tables.
        # We should run the full process.
        # The create_source_tables.py script itself connects without a DB initially.
        # For simplicity, we will call the scripts directly.
        # In a more robust implementation, we would import their main functions.
        
        # We need a connection without a database to run the first script.
        db_less_connection = create_db_connection(HOST, USER, PASSWORD, None, PORT)
        if not db_less_connection:
            log_status("Fatal: Could not connect to MySQL server. Aborting.")
            return

        # Execute source creation
        source_script_path = os.path.join("DDL_N_DML_Scripts", "Source_Table_DDL_DML.sql")
        execute_sql_from_file(source_script_path, db_less_connection)
        db_less_connection.close() # Close the db-less connection

        # Now reconnect to the database which should exist
        connection = create_db_connection(HOST, USER, PASSWORD, DATABASE, PORT)
        if not connection:
            log_status(f"Fatal: Could not connect to database '{DATABASE}' after creation. Aborting.")
            return

    else: # Connection succeeded, now check for tables
        if check_source_tables_exist(connection):
            log_status("Source tables already exist. Skipping creation.")
        else:
            log_status("Source tables do not exist. Creating and populating source tables...")
            source_script_path = os.path.join("DDL_N_DML_Scripts", "Source_Table_DDL_DML.sql")
            execute_sql_from_file(source_script_path, connection)

    # At this point, source tables should exist, and we have a valid connection.
    try:
        # Create target table
        log_status("Creating target table...")
        target_script_path = os.path.join("DDL_N_DML_Scripts", "Target_Table_DDL.sql")
        execute_sql_from_file(target_script_path, connection)
        
        # Load data into target table
        log_status("Loading data into product revenue table...")
        load_script_path = os.path.join("DDL_N_DML_Scripts", "Load_Product_Revenue.sql")
        execute_sql_from_file(load_script_path, connection)

        log_status("Master load process finished successfully.")
    
    except Exception as e:
        log_status(f"An error occurred during the master load process: {e}")
    finally:
        if connection and connection.is_connected():
            connection.close()
            log_status("Database connection closed.")


if __name__ == "__main__":
    main()
