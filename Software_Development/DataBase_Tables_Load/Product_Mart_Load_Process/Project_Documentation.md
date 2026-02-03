# Project Documentation: Product Mart Load Process

## 1. Project Overview

This project implements an ETL (Extract, Transform, Load) process for a product mart. It is designed to perform the following actions:
- Create source and target database schemas.
- Populate source tables with initial and supplementary fake data.
- Execute a transformation and load data into a product revenue analysis table.
- Provide a master script to orchestrate the end-to-end process.
- Export the final analysis table to a pipe-delimited text file.

## 2. Project Structure

The project is organized into several key files and directories:

```
.
├── .venv/                  # Python virtual environment
├── DDL_N_DML_Scripts/      # Contains all SQL scripts
│   ├── Load_Product_Revenue.sql
│   ├── Source_Table_DDL_DML.sql
│   └── Target_Table_DDL.sql
├── Status_Logs/            # Contains status logs from script executions
├── .gitignore              # Specifies files to be ignored by Git
├── create_source_tables.py # Creates and populates the source tables
├── create_target_table.py  # Creates the target analysis table
├── db_connection.py        # Handles database connection logic
├── export_product_revenue.py # Exports the analysis table to a CSV file
├── generate_fake_data.py   # Generates and inserts additional fake data
├── load_product_revenue.py # Loads data into the analysis table
├── master_load_process.py  # Main script to run the entire ETL process
└── requirements.txt        # Lists the Python dependencies for the project
```

## 3. Setup and Installation

### 3.1. Prerequisites
- Python 3.x
- MySQL Server

### 3.2. Installation Steps

1.  **Clone the repository** (or download the project files).

2.  **Create a virtual environment**:
A virtual environment is recommended to manage project-specific dependencies.
    ```bash
    python -m venv .venv
    ```

3.  **Activate the virtual environment**:
    -   On Windows:
        ```bash
        .\.venv\Scripts\activate
        ```
    -   On macOS/Linux:
        ```bash
        source .venv/bin/activate
        ```

4.  **Install the required packages**:
    ```bash
    pip install -r requirements.txt
    ```

## 4. Database Configuration

Database connection parameters are centralized in the `db_connection.py` file. Before running the application, you must update the following variables in this file to match your MySQL server configuration:

- `HOST`: The hostname or IP address of your MySQL server (e.g., "127.0.0.1").
- `PORT`: The port number for the MySQL server (e.g., 3306).
- `USER`: The username for your MySQL user (e.g., "root").
- `PASSWORD`: The password for the MySQL user.

The project creates and uses two databases:
- `EDW_STAGE_DB`: For the initial source tables.
- `EDW_DIM_DB`: For the final `Product_Revenue_Analysis` table.

These database names are hardcoded in the scripts and SQL files.

## 5. Running the Application

The main entry point for the application is the `master_load_process.py` script. This script orchestrates the entire ETL workflow.

To run the end-to-end process, execute the following command from the project root directory:

```bash
python master_load_process.py
```

This will:
1. Check if the source tables exist in `EDW_STAGE_DB`. If not, it will create them and populate them with initial data.
2. Create the `Product_Revenue_Analysis` table in `EDW_DIM_DB`.
3. Load the transformed data into the `Product_Revenue_Analysis` table.

## 6. Scripts Description

### `master_load_process.py`
This is the main orchestration script. It runs the necessary steps of the ETL process in the correct order.

### `db_connection.py`
A utility module that provides a function to create a connection to the MySQL database. It reads connection parameters from constants defined within the file.

### `create_source_tables.py`
Executes the `DDL_N_DML_Scripts/Source_Table_DDL_DML.sql` script to create the source tables (`Departments`, `Employees`, `Products`, etc.) in the `EDW_STAGE_DB` database and insert initial sample data.

### `create_target_table.py`
Executes the `DDL_N_DML_Scripts/Target_Table_DDL.sql` script to create the final `Product_Revenue_Analysis` table in the `EDW_DIM_DB` database.

### `load_product_revenue.py`
Executes the `DDL_N_DML_Scripts/Load_Product_Revenue.sql` script, which contains the logic to transform the data from the source tables and load it into the `Product_Revenue_Analysis` table.

### `generate_fake_data.py`
This script can be run to generate and insert additional randomized fake data into the source tables. It uses the `Faker` library to create realistic data and is useful for testing the ETL process with a larger dataset. To run it:
    ```bash
    python generate_fake_data.py
    ```

### `export_product_revenue.py`
This script exports the data from the `Product_Revenue_Analysis` table into a pipe-delimited (`|`) text file. The file is saved in the `C:\Users\niraj\OneDrive\SFTP\Outbound` directory with a timestamped name. To run it:
    ```bash
    python export_product_revenue.py
    ```
