import requests
import time
import json
import os
from datetime import datetime

def fetch_latest_release(repo):
    response = requests.get(f'https://api.github.com/repos/{repo}/releases/latest')
    if response.status_code != 200:
        raise Exception('Error fetching the latest release')
    return response.json()

def download_file(url, save_path):
    response = requests.get(url, stream=True)
    if response.status_code == 200:
        with open(save_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        log_message(f'File downloaded: {save_path}')
    else:
        raise Exception(f'Error downloading file: {response.status_code}')

def save_manifest(version, local_path, file_path):
    local_path = f'../../{local_path}'

    manifest = {
        "name": "Bruce",
        "version": version + "-latest",
        "builds": [
            {
                "chipFamily": "ESP32",
                "parts": [
                    {
                        "path": local_path,
                        "offset": 0
                    }
                ]
            }
        ]
    }

    with open(file_path, 'w') as f:
        json.dump(manifest, f, indent=2)
    
    log_message(f'Manifest saved for version {version} in {file_path}')

def log_message(message):
    with open('autoupdate_log.txt', 'a') as log_file:
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        log_file.write(f'[{timestamp}] {message}\n')

def main():
    repo = 'pr3y/Bruce'
    last_version = None

    while True:
        try:
            release_data = fetch_latest_release(repo)
            latest_version = release_data['tag_name']
            download_url_cplus2 = f'https://github.com/pr3y/Bruce/releases/download/{latest_version}/Bruce-m5stack-cplus2.bin'
            download_url_cplus1_full = f'https://github.com/pr3y/Bruce/releases/download/{latest_version}/Bruce-m5stack-cplus1_1-full.bin'

            if latest_version != last_version:
                local_path_cplus2 = f'firmwares/stickplus2/Bruce_cplus2_latest.bin'
                local_path_cplus1 = f'firmwares/stickplus1/Bruce_cplus1_latest.bin'

                download_file(download_url_cplus2, local_path_cplus2)
                download_file(download_url_cplus1_full, local_path_cplus1)

                path_cplus2 = 'manifests/stickplus2/Bruce_cplus2_latest.json'
                save_manifest(latest_version, local_path_cplus2, path_cplus2)

                path_cplus1 = 'manifests/stickplus1/Bruce_cplus1_latest.json'
                save_manifest(latest_version, local_path_cplus1, path_cplus1)

                last_version = latest_version
            else:
                log_message('No new version found.')

        except Exception as e:
            log_message(f'Error: {e}')

        time.sleep(600) 

if __name__ == '__main__':
    main()
