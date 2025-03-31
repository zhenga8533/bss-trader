import os

import pandas as pd
from dotenv import load_dotenv
from util.file import download_file
from util.format import format_percent
from util.logger import Logger


def load_beequips(data_path: str, logger: Logger) -> list:
    """
    Load beequips from the given path.

    :param data_path: Path to the beequips file.
    :param logger: Logger instance for logging.
    :return: List of beequips.
    """

    logger.info(f"load_beequips: Loading beequips from {data_path}...")
    df = pd.ExcelFile(data_path, engine="openpyxl")

    # Load all beequip titles in format:
    # Introduction
    # Very Important Notes
    # Upcoming Beequip Information
    # Intro
    # Beequip 1
    # Beequip 2
    # ...
    # Beequip N
    logger.info("load_beequips: Loading all beequip titles...")
    beequips = []
    sheet_titles = df.sheet_names
    for sheet in sheet_titles[4:]:
        logger.info(f"load_beequips: Parsing '{sheet}'...")
        beequips.append(df.parse(sheet))

    return beequips


def parse_stat_str(stat: str, values: pd.Series) -> str:
    """
    Parse a stat string and its corresponding values to create a formatted stat string.

    :param stat: The stat string to parse. It may contain multiple lines.
    :param values: A pandas Series containing the corresponding values for the stat.
    :return: A formatted string representing the stat and its values.
    """

    # Process each stat row to extract values
    minimum_base = values.iloc[0]
    maximum_base = values.iloc[1]
    maximum_total = values.iloc[2]
    chance = values.iloc[3]
    upgrade_weight = values.iloc[4]
    # max_upgrades = values.iloc[5]
    upgrade_value_1 = values.iloc[6]
    # bias = values.iloc[7]
    # upgrade_value_2 = values.iloc[8]
    caustic_lock = values.iloc[9]

    # Create stat string based on the values
    stat_str = ""
    bonus = stat.split("\n")[1]

    # Convert percentages to formatted strings
    if bonus.startswith("%"):
        minimum_base = format_percent(minimum_base)
        maximum_base = format_percent(maximum_base)
        maximum_total = format_percent(maximum_total)
        upgrade_value_1 = format_percent(upgrade_value_1)

    # Ability Tokens
    if stat.startswith("Bee Ability Token"):
        stat_str += "[Ability] "
        bonus = bonus[1:]
    # Hive Bonus
    elif stat.startswith("Hive Bonus"):
        stat_str += "[Hive Bonus] "

    # Handle waxing bonuses
    stat_str += bonus
    if chance == 0 or chance == "-":
        stat_str += f" (from waxing, {upgrade_weight} chance"
        stat_str += ", caustic only)" if caustic_lock else ")"
    elif chance != 1:
        stat_str += f" ({chance} base)"
    elif stat.startswith("Bee Ability Token"):
        stat_str += " (guaranteed)"

    # Stat Range
    if minimum_base != "-" and maximum_base != "-":
        stat_str += f": {minimum_base} to {maximum_base}"
        stat_str += f" (up to {maximum_total}, {upgrade_weight} chance"
        stat_str += ", caustic only)" if caustic_lock else ")"
    elif upgrade_value_1 != "-" and maximum_total != "-":
        stat_str += f": {upgrade_value_1} to {maximum_total}"

    return stat_str


def update_beequips(data_path: str, beequips: list, logger: Logger) -> None:
    logger.info("update_beequips: Updating beequips...")

    # Load json file from data_path
    data = pd.read_json(data_path)

    # Loop through each beequip and update the data dictionary
    for beequip in beequips:
        name = beequip.iloc[0, 1]
        beequip_data = data.get(name)
        logger.info(f"update_beequips: Processing beequip '{name}'...")

        stats = beequip.iloc[1:, 1]
        stat_strs = []

        # Parse stat strings for each stat in the beequip
        for i, stat in enumerate(stats, 1):
            values = beequip.iloc[i, 2:]
            stat_str = parse_stat_str(stat, values)
            stat_strs.append(stat_str)

        # Download beequip image if it doesn't exist
        file_name = name.lower().replace(" ", "_") + ".png"
        download_file(beequip_data.get("image_url"), f"../assets/beequips/{file_name}", logger)

        # Update the data dictionary with the new stats
        beequip_data["stats"] = stat_strs
        logger.info(f"update_beequips: Updated stats for {name}")

    # Save new data
    logger.info("update_beequips: Saving updated beequips data...")
    save_data = data.to_json(indent=4)
    with open(data_path, "w") as f:
        f.write(save_data)
    logger.info("update_beequips: Successfully updated beequips data.")


def main():
    # Load environment variables
    load_dotenv()
    LOG = os.getenv("LOG") == "True"

    BEEQUIPS_RAW_PATH = os.getenv("BEEQUIPS_RAW_PATH")
    BEEQUIPS_DATA_PATH = os.getenv("BEEQUIPS_DATA_PATH")

    # Initialize logger
    logger = Logger("beequips", "logs/beequips.log", LOG)
    logger.info("main: Starting parser script...")

    beequips = load_beequips(BEEQUIPS_RAW_PATH, logger)
    update_beequips(BEEQUIPS_DATA_PATH, beequips, logger)


if __name__ == "__main__":
    main()
