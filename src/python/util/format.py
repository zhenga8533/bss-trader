def format_percent(value: float) -> str:
    """
    Convert a percentage value to a formatted string with a percent sign.

    :param value: The percentage value to format. Can be a float or int.
    :return: A string representation of the percentage value with a percent sign.
    """

    if value == "-":
        return "-"

    value = value * 100
    if value.is_integer():
        return f"{int(value)}%"
    else:
        return f"{value:.2f}%"
