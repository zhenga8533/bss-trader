import { Box, Button, Divider, Flex, Grid, Heading, HStack, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import cosmeticsData from "../data/cosmetics.json";
import BeequipModal from "./BeequipModal";
import BeequipTile, { BeequipData } from "./BeequipModal/BeequipTile";
import CategoryModal from "./CategoryModal";
import CategoryTile from "./CategoryModal/CategoryTile";
import CosmeticModal from "./CosmeticModal";
import CosmeticTile, { CosmeticData } from "./CosmeticModal/CosmeticTile";

interface StackProps {
  color: string;
  title: string;
}

const Stack = ({ color, title }: StackProps) => {
  const id = title.toLowerCase().replace(/\s/g, "-");

  // Categories
  const getCategories = () => {
    const saveData = localStorage.getItem(id + "-categories");
    return saveData ? JSON.parse(saveData) : [];
  };

  const [categories, setCategories] = useState<string[]>(getCategories);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const addCategory = (name: string) => {
    setCategories((prevCategories) => [...prevCategories, name]);
  };

  const removeCategory = (index: number) => {
    setCategories((prevCategories) => {
      const newCategories = [...prevCategories];
      newCategories.splice(index, 1);
      return newCategories;
    });
  };

  useEffect(() => {
    localStorage.setItem(id + "-categories", JSON.stringify(categories));
  }, [categories]);

  // Cub Skins, Hive Skins, Stickers, and Vouchers
  const getCosmetics = () => {
    const saveData = localStorage.getItem(id + "-cosmetics");
    return saveData ? JSON.parse(saveData) : {};
  };

  const [cosmetics, setCosmetics] = useState<{ [key: string]: CosmeticData }>(getCosmetics);
  const [cosmeticsOpen, setCosmeticsOpen] = useState(false);

  const addCosmetic = (name: string) => {
    setCosmetics((prevCosmetics) => {
      const newCosmetics = { ...prevCosmetics };
      if (newCosmetics[name]) newCosmetics[name].quantity += 1;
      else newCosmetics[name] = { color: 0, quantity: 1 };
      return newCosmetics;
    });
  };

  const removeCosmetic = (name: string) => {
    setCosmetics((prevCosmetics) => {
      const newCosmetics = { ...prevCosmetics };
      if (newCosmetics[name].quantity > 1) newCosmetics[name].quantity -= 1;
      else delete newCosmetics[name];
      return newCosmetics;
    });
  };

  const colorCosmetic = (name: string) => {
    setCosmetics((prevCosmetics) => {
      const newCosmetics = { ...prevCosmetics };
      newCosmetics[name].color = (newCosmetics[name].color + 1) % 7;
      return newCosmetics;
    });
  };

  const sortCosmetics = () => {
    const referenceOrder: string[] = [];
    Object.entries(cosmeticsData).forEach(([_, value]) => {
      Object.keys(value).forEach((category) => {
        referenceOrder.push(category);
      });
    });

    const sortedCosmetics = Object.keys(cosmetics)
      .sort((a, b) => referenceOrder.indexOf(a) - referenceOrder.indexOf(b))
      .reduce((acc: { [key: string]: CosmeticData }, key) => {
        acc[key] = cosmetics[key];
        return acc;
      }, {});

    setCosmetics(sortedCosmetics);
  };

  useEffect(() => {
    localStorage.setItem(id + "-cosmetics", JSON.stringify(cosmetics));
  }, [cosmetics]);

  // Beequips
  const getBeequips = () => {
    const saveData = localStorage.getItem(id + "-beequips");
    return saveData ? JSON.parse(saveData) : [];
  };

  const [beequips, setBeequips] = useState<BeequipData[]>(getBeequips);
  const [beequipsOpen, setBeequipsOpen] = useState(false);

  const addBeequip = (data: BeequipData) => {
    setBeequips((prevBeequips) => [...prevBeequips, data]);
  };

  const removeBeequip = (index: number) => {
    setBeequips((prevBeequips) => {
      const newBeequips = [...prevBeequips];
      newBeequips.splice(index, 1);
      return newBeequips;
    });
  };

  const colorBeequip = (index: number) => {
    setBeequips((prevBeequips) => {
      const newBeequips = [...prevBeequips];
      newBeequips[index].color = (newBeequips[index].color + 1) % 7;
      return newBeequips;
    });
  };

  useEffect(() => {
    localStorage.setItem(id + "-beequips", JSON.stringify(beequips));
  }, [beequips]);

  // Event listener for updating the stack
  window.addEventListener("update", () => {
    setCategories(getCategories());
    setCosmetics(getCosmetics());
    setBeequips(getBeequips());
  });

  return (
    <>
      <BeequipModal isOpen={beequipsOpen} onClose={() => setBeequipsOpen(false)} addBeequip={addBeequip} />
      <CosmeticModal
        isOpen={cosmeticsOpen}
        stack={cosmetics}
        addCosmetic={addCosmetic}
        onClose={() => setCosmeticsOpen(false)}
      />
      <CategoryModal isOpen={categoriesOpen} addCategory={addCategory} onClose={() => setCategoriesOpen(false)} />
      <VStack>
        <Heading className="heading" background={color} borderRadius={5} textAlign="center" size="lg" w="100%">
          {title}
        </Heading>
        <Divider />
        {/** Categories */}
        {categories.length > 0 && (
          <HStack flexWrap="wrap" spacing={3} justifyContent="center">
            {categories.map((category, index) => (
              <CategoryTile key={category} category={category} onClick={() => removeCategory(index)} />
            ))}
          </HStack>
        )}
        {/** Cosmetics */}
        <Grid gap={2} templateColumns="repeat(auto-fill, minmax(90px, 1fr))" w="100%" columnGap={3} rowGap={5}>
          {Object.entries(cosmetics).map(([name, data]) => (
            <CosmeticTile
              key={name}
              name={name}
              data={data}
              showQuantity={true}
              onClick={() => removeCosmetic(name)}
              onContextMenu={() => colorCosmetic(name)}
            />
          ))}
        </Grid>
        {/** Beequips */}
        <Flex wrap="wrap" justifyContent="space-around" w="100%">
          {beequips.map((beequip, index) => (
            <Box key={beequip.name} p={2} minW="90px" maxW="1fr">
              <BeequipTile
                name={beequip.name}
                data={beequip}
                onClick={() => removeBeequip(index)}
                onContextMenu={() => colorBeequip(index)}
              />
            </Box>
          ))}
        </Flex>
        <Divider />
        <HStack flexWrap="wrap" justifyContent="center">
          <Button colorScheme="green" onClick={() => setCategoriesOpen(true)}>
            Categories
          </Button>
          <Button colorScheme="yellow" onClick={() => setCosmeticsOpen(true)}>
            Cosmetics
          </Button>
          <Button colorScheme="blue" onClick={() => setBeequipsOpen(true)}>
            Beequips
          </Button>

          <Button colorScheme="purple" ml={5} onClick={sortCosmetics}>
            Sort
          </Button>
          <Button
            colorScheme="red"
            onClick={() => {
              setBeequips([]);
              setCosmetics({});
              setCategories([]);
            }}
          >
            Clear
          </Button>
        </HStack>
      </VStack>
    </>
  );
};

export default Stack;
