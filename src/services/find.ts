/**
 * Find a value in an object by key.
 *
 * @param key - key to find in the object
 * @param obj - object to search
 * @returns the value of the key in the object
 */
export const findValue = (key: string, obj: any): any => {
  if (obj[key]) {
    return obj[key];
  } else {
    for (const k in obj) {
      if (typeof obj[k] === "object") {
        const result = findValue(key, obj[k]);
        if (result) {
          return result;
        }
      }
    }
  }
};

/**
 * Find a value in an object by key.
 *
 * @param obj - object to search
 * @param term - term to search for
 * @returns true if the term is included in the object
 */
export const isTermIncluded = (obj: any, term: string): boolean => {
  for (const key in obj) {
    const value = obj[key];
    if (typeof value === "string" && value.toLowerCase().includes(term)) {
      return true;
    } else if (typeof value === "object" && isTermIncluded(value, term)) {
      return true;
    }
  }
  return false;
};
