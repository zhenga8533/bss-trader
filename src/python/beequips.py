import os

from dotenv import load_dotenv
from util.logger import Logger


def main() -> None:
    # Load environment variables
    load_dotenv()
    LOG = os.getenv("LOG") == "True"

    # Initialize logger
    logger = Logger("beequips", "logs/beequips.log", LOG)


if __name__ == "__main__":
    main()
