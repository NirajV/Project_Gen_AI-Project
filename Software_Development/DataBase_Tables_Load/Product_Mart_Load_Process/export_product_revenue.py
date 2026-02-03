import os
import csv
import datetime
from db_connection import create_db_connection, HOST, PORT, USER, PASSWORD, DATABASE

def export_table_to_csv():
    """
    Exports the Product_Revenue_Analysis table to a pipe-delimited CSV file.
    """
    output_dir = r"C:\Users\niraj\OneDrive\SFTP\Outbound\Product_Revenue_Analysis"
    table_name = "Product_Revenue_Analysis"
    db_name = "EDW_DIM_DB"
    
    # Ensure the output directory exists
    if not os.path.exists(output_dir):
        try:
            os.makedirs(output_dir)
            print(f"Created directory: {output_dir}")
        except OSError as e:
            print(f"Error creating directory {output_dir}: {e}")
            return

    # Connection to create DB if not exists
    try:
        initial_connection = create_db_connection(HOST, USER, PASSWORD, None, PORT)
        if not initial_connection:
            print("Failed to connect to MySQL server.")
            return
        
        cursor = initial_connection.cursor()
        cursor.execute(f"CREATE DATABASE IF NOT EXISTS {db_name}")
        print(f"Database '{db_name}' ensured to exist.")
        cursor.close()
        initial_connection.close()

    except Exception as e:
        print(f"Error ensuring database exists: {e}")
        return


    connection = create_db_connection(HOST, USER, PASSWORD, db_name, PORT)
    if not connection:
        print(f"Failed to connect to the database '{db_name}'.")
        return

    try:
        cursor = connection.cursor()
        
        print(f"Exporting data from {db_name}.{table_name}...")
        
        # Query the data
        cursor.execute(f"SELECT * FROM {table_name}")
        
        # Get header
        header = [i[0] for i in cursor.description]
        
        # Fetch all rows
        rows = cursor.fetchall()
        
        # Generate file name
        timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
        file_name = f"{table_name}_{timestamp}.txt"
        file_path = os.path.join(output_dir, file_name)
        
        # Write to CSV
        with open(file_path, 'w', newline='', encoding='utf-8') as csvfile:
            writer = csv.writer(csvfile, delimiter='|')
            
            # Write header
            writer.writerow(header)
            
            # Write rows
            writer.writerows(rows)
            
        print(f"Successfully exported {len(rows)} rows to {file_path}")

    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        if connection and connection.is_connected():
            cursor.close()
            connection.close()
            print("Database connection closed.")

if __name__ == "__main__":
    export_table_to_csv()
