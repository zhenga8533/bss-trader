/**
 * Capitalizes the first letter of a string.
 *
 * @param str - The string to capitalize
 * @returns - The capitalized string
 */
export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Formats a stat string with color based on the prefix.
 *
 * @param stat - The stat string to format
 * @returns - The formatted stat string
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

/**
 * Formats a stat string with color based on the prefix.
 *
 * @param color - The color index of the tile
 * @returns - The color of the tile
 */
export const getTileColor = (color: number) => {
  return [
    "rgba(0, 0, 0, 0.3)",
    "rgba(255, 48, 48, 0.3)",
    "rgba(255, 165, 48, 0.3)",
    "rgba(255, 255, 48, 0.3)",
    "rgba(48, 255, 48, 0.3)",
    "rgba(48, 48, 255, 0.3)",
    "rgba(255, 48, 255, 0.3)",
  ][color ?? 0];
};
