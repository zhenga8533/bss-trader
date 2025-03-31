import json
import os

from dotenv import load_dotenv
from util.file import download_file
from util.logger import Logger


def download_assets(data_path: str, category: str, logger: Logger) -> None:
    """
    Download data assets from the specified path and save images to the appropriate directory.

    :param data_path: The path to the data JSON file containing asset information.
    :param category: The category of assets to download.
    :param logger: A Logger instance for logging messages.
    :return: None
    """

    logger.info("download_cosmetics: Downloading data assets...")

    # Load the data from the specified path
    with open(data_path, "r") as f:
        asset_data = json.load(f)

    # Loop through category data dictionary
    for name, data in asset_data.items():
        logger.info(f"download_cosmetics: Processing item '{name}'...")
        image_url = data.get("image_url")

        file_name = name.lower().replace(" ", "_") + ".png"
        dir_path = f"{category}/{file_name}"
        data["image_path"] = "/bss-trader/assets/" + dir_path
        download_file(image_url, f"../../public/assets/{dir_path}", logger)

    # Save data with updated image paths
    with open(data_path, "w") as f:
        json.dump(asset_data, f, indent=4)

    logger.info("download_cosmetics: Finished downloading data assets.")


def download_cosmetics(data_path: str, logger: Logger) -> None:
    """
    Download cosmetics data from the specified path and save images to the appropriate directories.

    :param data_path: The path to the cosmetics data JSON file.
    :param logger: A Logger instance for logging messages.
    :return: None
    """

    logger.info("download_cosmetics: Downloading cosmetics data...")

    # Load the cosmetics data from the specified path
    with open(data_path, "r") as f:
        cosmetics_data = json.load(f)

    # Loop through cosmetic categories
    categories = ["cub", "hive", "voucher", "sticker"]
    for category in categories:
        logger.info(f"download_cosmetics: Processing category '{category}'...")
        category_data = cosmetics_data.get(category)

        # Loop through category data dictionary
        for item_name, item_data in category_data.items():
            logger.info(f"download_cosmetics: Processing item '{item_name}'...")
            image_url = item_data.get("image_url")

            file_name = item_name.lower().replace(" ", "_") + ".png"
            dir_path = f"cosmetics/{category}s/{file_name}"
            item_data["image_path"] = "/bss-trader/assets/" + dir_path
            download_file(image_url, f"../../public/assets/{dir_path}", logger)

    # Save cosmetics data with updated image paths
    with open(data_path, "w") as f:
        json.dump(cosmetics_data, f, indent=4)

    logger.info("download_cosmetics: Finished downloading cosmetics data.")


def main():
    # Load environment variables
    load_dotenv()
    LOG = os.getenv("LOG") == "True"

    COSMETICS_DATA_PATH = os.getenv("COSMETICS_DATA_PATH")
    EGGS_DATA_PATH = os.getenv("EGGS_DATA_PATH")
    NPC_DATA_PATH = os.getenv("NPCS_DATA_PATH")
    WAXES_DATA_PATH = os.getenv("WAXES_DATA_PATH")

    # Initialize logger
    logger = Logger("download_assets", "logs/download_assets.log", LOG)
    logger.info("main: Starting asset downloading script...")

    download_cosmetics(COSMETICS_DATA_PATH, logger)
    download_assets(EGGS_DATA_PATH, "eggs", logger)
    download_assets(NPC_DATA_PATH, "npcs", logger)
    download_assets(WAXES_DATA_PATH, "waxes", logger)


if __name__ == "__main__":
    main()
