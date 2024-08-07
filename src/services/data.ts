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
 *
 * @param id
 * @returns
 */
export const exportCosmetics = (id: string) => {
  const cosmetics = JSON.parse(localStorage.getItem(`${id}-cosmetics`) ?? "{}");
  const comp = Object.keys(cosmetics).map((key) => {
    const cosmetic = cosmetics[key];
    return [itemMap[key], cosmetic.color, cosmetic.quantity];
  });

  return LZString.compressToBase64(JSON.stringify(comp));
};

export const importCosmetics = (data: string) => {
  const decomp = JSON.parse(LZString.decompressFromBase64(data));
  const cosmetics = Object.fromEntries(
    decomp.map((cosmetic: any) => {
      const key = itemRevMap[cosmetic[0]];
      return [key, { color: cosmetic[1], quantity: cosmetic[2] }];
    })
  );

  return cosmetics;
};

export const exportBeequips = (id: string) => {
  const beequips = JSON.parse(localStorage.getItem(`${id}-beequips`) ?? "[]");
  const comp = beequips.map((beequip: any) => {
    const waxes = beequip.waxes.map((wax: string) => itemMap[wax]);
    return [itemMap[beequip.name], beequip.color, beequip.activeStats, beequip.potential, waxes];
  });

  return LZString.compressToBase64(JSON.stringify(comp));
};

export const importBeequips = (data: string) => {
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

export const exportCategories = (id: string) => {
  const categories = JSON.parse(localStorage.getItem(`${id}-categories`) ?? "[]");
  const comp = categories.map((category: string) => {
    if (!itemMap.hasOwnProperty(category)) return category;
    else return itemMap[category];
  });

  return LZString.compressToBase64(JSON.stringify(comp));
};

export const importCategories = (data: string) => {
  const decomp = JSON.parse(LZString.decompressFromBase64(data));
  const categories = decomp.map((category: any) => {
    if (!itemRevMap.hasOwnProperty(category)) return category;
    else return itemRevMap[category];
  });

  return categories;
};
