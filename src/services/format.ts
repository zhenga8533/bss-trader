export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Formats a stat string with color based on the prefix.
 *
 * @param stat
 * @returns
 */
export const getStatColor = (stat: string) => {
  const color = stat.startsWith("+")
    ? "green"
    : stat.startsWith("-")
    ? "red"
    : stat.startsWith("[")
    ? "yellow"
    : stat.startsWith("Ability:")
    ? "cyan"
    : "white";
  return color;
};
