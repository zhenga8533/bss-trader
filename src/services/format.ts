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
