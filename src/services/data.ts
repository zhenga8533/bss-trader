import LZString from "lz-string";
import beequips from "../data/beequips.json";
import categories from "../data/categories.json";
import cosmetics from "../data/cosmetics.json";
import waxes from "../data/waxes.json";

// Set up item map
let counter = 0;
const itemMap: { [key: string]: number } = {};
const itemRevMap: { [key: number]: string } = {};

Object.values(cosmetics).forEach((cosmetic: any) => {
  Object.keys(cosmetic).forEach((key) => {
    itemMap[key] = counter;
    itemRevMap[counter] = key;
    counter++;
  });
});
Object.keys(beequips).forEach((beequip) => {
  itemMap[beequip] = counter;
  itemRevMap[counter] = beequip;
  counter++;
});
Object.keys(categories).forEach((category) => {
  itemMap[category] = counter;
  itemRevMap[counter] = category;
  counter++;
});
Object.keys(waxes).forEach((wax) => {
  itemMap[wax] = counter;
  itemRevMap[counter] = wax;
  counter++;
});

/**
 * Export cosmetics data to a compressed string.
 *
 * @param id - the id of the data to export
 * @returns the compressed string of the cosmetics data
 */
const exportCosmetics = (id: string) => {
  const cosmetics = JSON.parse(localStorage.getItem(`${id}-cosmetics`) ?? "{}");
  const comp = Object.keys(cosmetics).map((key) => {
    const cosmetic = cosmetics[key];
    return [itemMap[key], cosmetic.color, cosmetic.quantity];
  });

  return LZString.compressToBase64(JSON.stringify(comp));
};

/**
 * Import cosmetics data from a compressed string.
 *
 * @param data - the compressed string of the cosmetics data
 * @returns the cosmetics data
 */
const importCosmetics = (data: string) => {
  const decomp = JSON.parse(LZString.decompressFromBase64(data));
  const cosmetics = Object.fromEntries(
    decomp.map((cosmetic: any) => {
      const key = itemRevMap[cosmetic[0]];
      return [key, { color: cosmetic[1], quantity: cosmetic[2] }];
    })
  );

  return cosmetics;
};

/**
 * Export beequips data to a compressed string.
 *
 * @param id - the id of the data to export
 * @returns the compressed string of the beequips data
 */
const exportBeequips = (id: string) => {
  const beequips = JSON.parse(localStorage.getItem(`${id}-beequips`) ?? "[]");
  const comp = beequips.map((beequip: any) => {
    const waxes = beequip.waxes.map((wax: string) => itemMap[wax]);
    return [itemMap[beequip.name], beequip.color, beequip.activeStats, beequip.potential, waxes];
  });

  return LZString.compressToBase64(JSON.stringify(comp));
};

/**
 * Import beequips data from a compressed string.
 *
 * @param data - the compressed string of the beequips data
 * @returns the beequips data
 */
const importBeequips = (data: string) => {
  const decomp = JSON.parse(LZString.decompressFromBase64(data));
  const beequips = decomp.map((beequip: any) => {
    const waxes = beequip[4].map((wax: number) => itemRevMap[wax]);
    return {
      name: itemRevMap[beequip[0]],
      color: beequip[1],
      activeStats: beequip[2],
      potential: beequip[3],
      waxes,
    };
  });

  return beequips;
};

/**
 * Export categories data to a compressed string.
 *
 * @param id - the id of the data to export
 * @returns the compressed string of the categories data
 */
const exportCategories = (id: string) => {
  const categories = JSON.parse(localStorage.getItem(`${id}-categories`) ?? "[]");
  const comp = categories.map((category: string) => {
    if (!itemMap.hasOwnProperty(category)) return category;
    else return itemMap[category];
  });

  return LZString.compressToBase64(JSON.stringify(comp));
};

/**
 * Import categories data from a compressed string.
 *
 * @param data - the compressed string of the categories data
 * @returns the categories data
 */
const importCategories = (data: string) => {
  const decomp = JSON.parse(LZString.decompressFromBase64(data));
  const categories = decomp.map((category: any) => {
    if (!itemRevMap.hasOwnProperty(category)) return category;
    else return itemRevMap[category];
  });

  return categories;
};

/**
 * Import trade data from a compressed string.
 *
 * @param data - the compressed string of the trade data
 */
export const getImport = (data: string) => {
  try {
    const json = LZString.decompressFromBase64(data.replace(/-/g, "+"));
    const parsed = JSON.parse(json);
    localStorage.setItem("offering-cosmetics", JSON.stringify(importCosmetics(parsed[0])));
    localStorage.setItem("looking-for-cosmetics", JSON.stringify(importCosmetics(parsed[1])));
    localStorage.setItem("offering-beequips", JSON.stringify(importBeequips(parsed[2])));
    localStorage.setItem("looking-for-beequips", JSON.stringify(importBeequips(parsed[3])));
    localStorage.setItem("offering-categories", JSON.stringify(importCategories(parsed[4])));
    localStorage.setItem("looking-for-categories", JSON.stringify(importCategories(parsed[5])));
    window.dispatchEvent(new CustomEvent("update"));
  } catch (e) {
    localStorage.clear();
  }
};

/**
 * Export trade data to a compressed string.
 *
 * @returns - the compressed string of the trade data
 */
export const getExport = () => {
  const data = [
    exportCosmetics("offering"),
    exportCosmetics("looking-for"),
    exportBeequips("offering"),
    exportBeequips("looking-for"),
    exportCategories("offering"),
    exportCategories("looking-for"),
  ];

  const jsonString = JSON.stringify(data);
  return LZString.compressToBase64(jsonString).replace(/\+/g, "-");
};

/**
 * Save the trade data to local storage.
 *
 * @param id - the id of the data to save
 */
export const saveData = (id: string) => {
  const data = [
    exportCosmetics("offering"),
    exportCosmetics("looking-for"),
    exportBeequips("offering"),
    exportBeequips("looking-for"),
    exportCategories("offering"),
    exportCategories("looking-for"),
  ];

  localStorage.setItem(id, JSON.stringify(data));
};

/**
 * Load the trade data from local storage.
 *
 * @param id - the id of the data to load
 */
export const loadData = (id: string) => {
  const data = JSON.parse(
    localStorage.getItem(id) ?? '["NoXSA===","NoXSA===","NoXSA===","NoXSA===","NoXSA===","NoXSA==="]'
  );

  localStorage.setItem("offering-cosmetics", JSON.stringify(importCosmetics(data[0])));
  localStorage.setItem("looking-for-cosmetics", JSON.stringify(importCosmetics(data[1])));
  localStorage.setItem("offering-beequips", JSON.stringify(importBeequips(data[2])));
  localStorage.setItem("looking-for-beequips", JSON.stringify(importBeequips(data[3])));
  localStorage.setItem("offering-categories", JSON.stringify(importCategories(data[4])));
  localStorage.setItem("looking-for-categories", JSON.stringify(importCategories(data[5])));
  window.dispatchEvent(new CustomEvent("update"));
};

/**
 * Clear the trade data from local storage.
 *
 * @param id - the id of the data to clear
 */
export const clearData = (id: string) => {
  localStorage.removeItem(id);
  window.dispatchEvent(new CustomEvent("update"));
};
