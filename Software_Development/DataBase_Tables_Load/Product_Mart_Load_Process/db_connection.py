import mysql.connector
from mysql.connector import Error

# Connection details
HOST = "127.0.0.1"
PORT = 3306
USER = "root"
PASSWORD = "12345678"
DATABASE = "EDW_STAGE_DB"

def create_db_connection(host_name, user_name, user_password, db_name, port_num):
    connection = None
    try:
        connection = mysql.connector.connect(
            host=host_name,
            user=user_name,
            passwd=user_password,
            database=db_name,
            port=port_num
        )
        print("MySQL Database connection successful")
    except Error as err:
        print(f"Error: '{err}'")

    return connection

if __name__ == "__main__":
    # Create connection
    connection = create_db_connection(HOST, USER, PASSWORD, DATABASE, PORT)

    # Close connection to verify it works cleanly
    if connection and connection.is_connected():
        connection.close()
        print("Connection closed")