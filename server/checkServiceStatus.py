import subprocess
import argparse

def check_if_script_running(script_name):
    try:
        # Use WMIC to get command lines of running processes
        wmic_process = subprocess.Popen(['wmic', 'process', 'get', 'CommandLine'], stdout=subprocess.PIPE)
        output, _ = wmic_process.communicate()
        output = output.decode('utf-8').strip()

        # Check if the script name is in the output
        if script_name in output:
            return True
        else:
            return False
    except Exception as e:
        print(f"An error occurred: {e}")
        return False

def main():
    parser = argparse.ArgumentParser(description='Check if a specific Python script is running.')
    parser.add_argument('script_name', type=str, help='The name of the Python script to check, e.g., validate_service')
    args = parser.parse_args()

    file_name = args.script_name + '.py'
    script_running = check_if_script_running(file_name)
    print(f"Is the service running? {'Yes' if script_running else 'No'}")

if __name__ == '__main__':
    main()