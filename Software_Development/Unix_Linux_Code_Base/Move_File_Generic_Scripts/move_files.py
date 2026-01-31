import os
import sys
import shutil
import argparse
from datetime import datetime
def setup_logging(log_dir, log_prefix=None):
    """
    Sets up logging to a file in the specified directory.
    """
    # Create the log directory if it doesn't exist
    os.makedirs(log_dir, exist_ok=True)

    # Generate a timestamp for the log file
    TIMESTAMP = datetime.now().strftime("%Y%m%d_%H%M%S")

    # Use the provided prefix or default to the script name
    if not log_prefix:
        log_prefix = os.path.basename(__file__).replace('.py', '')

    # Create the full log file name
    # Append Process ID (PID) to ensure unique log files during concurrent execution
    pid = os.getpid()
    LOG_FILENAME = f"{log_prefix}_{TIMESTAMP}_{pid}.log"
    LOG_FILEPATH = os.path.join(log_dir, LOG_FILENAME)

    # Redirect standard output and standard error to the log file
    try:
        sys.stdout = open(LOG_FILEPATH, 'w')
        sys.stderr = sys.stdout
    except IOError as e:
        # If logging can't be set up, print an error to the original stderr
        # and exit or handle as appropriate.
        # We need to temporarily reset stderr to its original stream to do this.
        original_stderr = sys.__stderr__
        sys.stderr = original_stderr
        print(f"Fatal Error: Could not open log file {LOG_FILEPATH} for writing: {e}", file=sys.stderr)
        sys.exit(1) # Exit if we cannot log

    print(f"--- Log started at {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} ---")

def move_files_with_timestamp(source_dir, target_dir):
    """
    Moves files from a source directory to a target directory,
    adding a timestamp to each filename.
    """
    # Ensure target directory exists (thread/process safe)
    os.makedirs(target_dir, exist_ok=True)

    for filename in os.listdir(source_dir):
        source_path = os.path.join(source_dir, filename)

        if os.path.isfile(source_path):
            try:
                # Add timestamp to the filename
                timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
                name, extension = os.path.splitext(filename)
                new_filename = f"{name}_{timestamp}{extension}"
                target_path = os.path.join(target_dir, new_filename)

                # Move the file
                shutil.move(source_path, target_path)
                print(f"Moved: {filename} to {new_filename}")

            except Exception as e:
                print(f"Error moving {filename}: {e}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Move files with timestamp and logging.")
    
    # Define arguments
    parser.add_argument("--source_path", required=True, help="Path to the source directory")
    parser.add_argument("--target_path", required=True, help="Path to the target directory")
    parser.add_argument("--log_path", required=True, help="Path to the log directory")
    
    args = parser.parse_args()
    
    # Extract the last folder name from the source path to create a specific log subfolder
    source_folder_name = os.path.basename(os.path.normpath(args.source_path))
    dynamic_log_path = os.path.join(args.log_path, source_folder_name)
    
    setup_logging(dynamic_log_path, source_folder_name)
    move_files_with_timestamp(args.source_path, args.target_path)
