import os
import signal
import subprocess
import sys
import argparse

# Parse command-line arguments
parser = argparse.ArgumentParser(description='Start a Python file')
parser.add_argument('python_file', help='Path to the Python file you want to run')
args = parser.parse_args()

PYTHON_FILE = args.python_file

# Command to run the Python file
command = f'python {PYTHON_FILE}'

try:
    # Start the Python process
    process = subprocess.Popen(command.split(), shell=False)
    print(f'Started process with PID: {process.pid}')

    # Wait for the process to complete or handle signals
    while True:
        try:
            # Wait for the process to complete
            process.wait()
            break
        except KeyboardInterrupt:
            # Handle keyboard interrupt (Ctrl+C)
            print('Keyboard interrupt received, stopping the process...')
            try:
                # Terminate the process
                process.terminate()
                process.wait(timeout=5)
            except subprocess.TimeoutExpired:
                # If the process doesn't terminate within 5 seconds, kill it
                print('Process did not terminate within 5 seconds, killing it...')
                process.kill()
            break
        except Exception as e:
            # Handle any other exceptions
            print(f'An error occurred: {e}')
            try:
                # Terminate the process
                process.terminate()
                process.wait(timeout=5)
            except subprocess.TimeoutExpired:
                # If the process doesn't terminate within 5 seconds, kill it
                print('Process did not terminate within 5 seconds, killing it...')
                process.kill()
            break

except Exception as e:
    print(f'An error occurred while starting the process: {e}')
    sys.exit(1)