# File Mover Automation Script

## Overview
This Python script (`move_files.py`) automates the process of moving files from a source directory to a target directory. It is designed for robust file handling, featuring automatic timestamping of moved files to prevent overwrites and a dynamic logging system that organizes logs based on the source directory.

## Features

*   **File Moving**: Moves all files from a specified source path to a target path.
*   **Timestamping**: Appends a timestamp (`YYYYMMDDHHMMSS`) to the filename of every moved file (e.g., `file.txt` becomes `file_20231027123000.txt`).
*   **Dynamic Logging**:
    *   Automatically creates a subfolder in the log directory matching the name of the source folder (e.g., if source is `.../Sales`, logs go to `.../Log/Sales`).
    *   Log files are named using the source folder name and a timestamp (e.g., `Sales_20231027_123000.log`).
    *   Captures both standard output (`stdout`) and errors (`stderr`).
*   **Parameterized Execution**: Source, Target, and Log paths are passed as command-line arguments, making the script reusable for different workflows.

## Prerequisites

*   **Python 3.x** installed on the system.

## Environment Setup (Virtual Environment)

To ensure the code runs in an isolated environment, follow these steps to set up a Python Virtual Environment.

1.  **Create the Virtual Environment**:
    ```bash
    python -m venv venv
    ```

2.  **Activate the Virtual Environment**:
    *   **Windows**:
        ```powershell
        .\venv\Scripts\Activate
        ```
    *   **Linux/Mac**:
        ```bash
        source venv/bin/activate
        ```

3.  **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

## Usage

With the virtual environment activated, run the script using the following syntax:

```bash
python move_files.py --source_path <SOURCE_DIR> --target_path <TARGET_DIR> --log_path <LOG_DIR>
```

### Arguments

| Argument | Description | Required |
| :--- | :--- | :--- |
| `--source_path` | The absolute path to the directory containing the files you want to move. | Yes |
| `--target_path` | The absolute path where the files will be moved to. | Yes |
| `--log_path` | The base directory where logs will be stored. The script will create a subfolder here based on the source folder name. | Yes |

## Example

**Scenario**:
You want to move files from an "Inbound/Sales" folder to an "Archive/Sales" folder and store logs in a central "Log" directory.

**Command**:
```powershell
python move_files.py --source_path "C:\Users\niraj\OneDrive\SFTP\Inbound\Sales" --target_path "C:\Users\niraj\OneDrive\SFTP\Archive\Sales" --log_path "C:\Users\niraj\Project_Gen_AI\Project\Software_Development\Unix_Linux_Code_Base\Log"
```

**Execution Flow**:
1.  **Log Setup**:
    *   The script detects the source folder name is `Sales`.
    *   It creates the directory: `...\Unix_Linux_Code_Base\Log\Sales`.
    *   It creates a log file: `Sales_20231027_153000.log`.
2.  **File Operation**:
    *   Files found in `...\Inbound\Sales` are moved to `...\Archive\Sales`.
    *   Files are renamed with the current timestamp.
3.  **Completion**:
    *   All operations and errors are written to the log file.

## Error Handling

*   **Missing Directories**: If the target directory or log directory does not exist, the script attempts to create them automatically.
*   **File Errors**: If a specific file cannot be moved (e.g., permission issues), the error is logged, and the script continues processing the remaining files.
*   **Critical Failures**: If the log file cannot be created, the script prints a fatal error to the console and exits immediately.