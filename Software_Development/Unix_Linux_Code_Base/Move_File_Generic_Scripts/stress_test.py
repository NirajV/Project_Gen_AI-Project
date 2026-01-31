import os
import sys
import subprocess
import time
import shutil

# --- Configuration ---
NUM_FOLDERS = 10          # Number of concurrent processes to run
FILES_PER_FOLDER = 50     # Number of files to generate per folder

# Define paths relative to this script
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
MOVER_SCRIPT = os.path.join(SCRIPT_DIR, "move_files.py")

# Test Area (will be created and deleted)
TEST_BASE_DIR = os.path.join(SCRIPT_DIR, "Stress_Test_Area")
LOG_BASE_PATH = os.path.join(TEST_BASE_DIR, "Logs")

def create_dummy_data():
    """Creates source directories and dummy files."""
    print(f"--- Setting up Test Environment in {TEST_BASE_DIR} ---")
    
    # Clean up previous test run
    if os.path.exists(TEST_BASE_DIR):
        shutil.rmtree(TEST_BASE_DIR)
    os.makedirs(TEST_BASE_DIR)

    folders = []
    for i in range(NUM_FOLDERS):
        folder_name = f"Source_Folder_{i}"
        source_path = os.path.join(TEST_BASE_DIR, "Inbound", folder_name)
        target_path = os.path.join(TEST_BASE_DIR, "Archive", folder_name)
        
        os.makedirs(source_path)
        # Note: Target folders are created by the script, so we don't make them here
        
        folders.append((source_path, target_path))

        # Create dummy files
        for j in range(FILES_PER_FOLDER):
            file_path = os.path.join(source_path, f"data_{i}_{j}.txt")
            with open(file_path, 'w') as f:
                f.write(f"Dummy content for file {i}_{j} generated at {time.time()}")
    
    print(f"Created {NUM_FOLDERS} folders with {FILES_PER_FOLDER} files each.")
    return folders

def run_concurrent_test(folders):
    """Runs the move_files.py script concurrently for all folders."""
    print(f"--- Starting Stress Test: Launching {NUM_FOLDERS} processes ---")
    processes = []
    start_time = time.time()

    for source, target in folders:
        # Command: python move_files.py --source_path X --target_path Y --log_path Z
        cmd = [
            sys.executable,
            MOVER_SCRIPT,
            "--source_path", source,
            "--target_path", target,
            "--log_path", LOG_BASE_PATH
        ]
        
        # Launch process without waiting (non-blocking)
        p = subprocess.Popen(cmd)
        processes.append(p)

    # Wait for all processes to finish
    for p in processes:
        p.wait()

    duration = time.time() - start_time
    print(f"--- Stress Test Execution Finished in {duration:.2f} seconds ---")

def verify_results(folders):
    """Verifies that files moved and logs exist."""
    print("--- Verifying Results ---")
    errors = 0
    
    for source, target in folders:
        # 1. Check Source is Empty
        if os.listdir(source):
            print(f"[FAIL] Source not empty: {source}")
            errors += 1
        
        # 2. Check Target has correct file count
        if not os.path.exists(target) or len(os.listdir(target)) != FILES_PER_FOLDER:
            print(f"[FAIL] Target missing or count mismatch: {target}")
            errors += 1
            
    if errors == 0:
        print("SUCCESS: All files moved correctly. No deadlocks or race conditions detected.")
    else:
        print(f"FINISHED with {errors} errors.")

if __name__ == "__main__":
    folders_list = create_dummy_data()
    run_concurrent_test(folders_list)
    verify_results(folders_list)