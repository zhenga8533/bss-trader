import os

import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry
from util.logger import Logger


def download_file(url: str, file_path: str, logger: Logger) -> None:
    """
    Download a file from a URL and save it to the specified file path.

    :param url: The URL to download the file from.
    :param file_path: The path where the downloaded file will be saved.
    :param logger: A Logger instance for logging messages.
    :return: None
    """

    # Create the directory if it doesn't exist
    os.makedirs(os.path.dirname(file_path), exist_ok=True)

    # Check if file_path already exists, if so, we can skip downloading
    if os.path.exists(file_path):
        logger.info(f"download_file: File already exists at {file_path}. Skipping download.")
        return

    # Initialize a session with retry strategy
    session = requests.Session()

    retry_strategy = Retry(
        total=5, status_forcelist=[429, 500, 502, 503, 504], allowed_methods=["GET"], backoff_factor=1
    )

    adapter = HTTPAdapter(max_retries=retry_strategy)
    session.mount("http://", adapter)
    session.mount("https://", adapter)

    # Attempt to download the file with a timeout
    logger.info(f"download_file: Downloading file from {url} to {file_path}...")
    try:
        response = session.get(url, stream=True, timeout=10)
        response.raise_for_status()

        with open(file_path, "wb") as f:
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:
                    logger.debug(f"download_file: Writing chunk of size {len(chunk)} to {file_path}.")
                    f.write(chunk)
    except requests.exceptions.RequestException as e:
        logger.error(f"download_file: Failed to download file from {url}. Error: {e}")
    finally:
        session.close()
