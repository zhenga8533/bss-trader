import { Box, Button, Divider, Grid, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import BeequipModal from "./BeequipModal";
import { Beequip } from "./BeequipTile";
import ItemModal from "./ItemModal";
import ItemTile, { Item } from "./ItemTile";

interface ItemStackProps {
  color: string;
  title: string;
}

export interface StackItem extends Item {
  quantity: number;
}

const ItemStack = ({ color, title }: ItemStackProps) => {
  const id = title.toLowerCase().replace(/\s/g, "-");

  // Cub Skins, Hive Skins, Stickers, and Vouchers
  const [items, setItems] = useState<{ [key: string]: Item & { quantity: number } }>(() => {
    const saveData = localStorage.getItem(id + "-items");
    return saveData ? JSON.parse(saveData) : {};
  });
  const [itemsOpen, setItemsOpen] = useState(false);

  const addItem = (item: Item) => {
    setItems((prevItems) => {
      if (prevItems[item.name]) {
        return {
          ...prevItems,
          [item.name]: { ...prevItems[item.name], quantity: prevItems[item.name].quantity + 1 },
        };
      } else {
        return { ...prevItems, [item.name]: { ...item, quantity: 1 } };
      }
    });
  };

  const removeItem = (item: Item) => {
    setItems((prevItems) => {
      if (prevItems[item.name].quantity > 1) {
        return {
          ...prevItems,
          [item.name]: { ...prevItems[item.name], quantity: prevItems[item.name].quantity - 1 },
        };
      } else {
        const newItems = { ...prevItems };
        delete newItems[item.name];
        return newItems;
      }
    });
  };

  useEffect(() => {
    localStorage.setItem(id + "-items", JSON.stringify(items));
  }, [items]);

  // Beequips
  const [beequips, setBeequips] = useState<Beequip[]>(() => {
    const saveData = localStorage.getItem(id + "-beequips");
    return saveData ? JSON.parse(saveData) : [];
  });
  const [beequipsOpen, setBeequipsOpen] = useState(false);

  const addBeequip = (beequip: Beequip) => {
    setBeequips((prevBeequips) => [...prevBeequips, beequip]);
  };

  return (
    <>
      <BeequipModal isOpen={beequipsOpen} onClose={() => setBeequipsOpen(false)} addItem={addBeequip} />
      <ItemModal isOpen={itemsOpen} onClose={() => setItemsOpen(false)} addItem={addItem} stackItems={items} />
      <VStack>
        <Heading
          background={color}
          borderRadius={5}
          textAlign="center"
          textShadow={"1px 1px 2px black"}
          size="lg"
          w="100%"
        >
          {title}
        </Heading>
        <Divider />
        <Grid gap={2} templateColumns="repeat(auto-fill, minmax(90px, 1fr))" w="100%" columnGap={3} rowGap={5}>
          {Object.values(items).map((item) => (
            <Box position={"relative"} key={item.name}>
              <ItemTile item={item} stackQuantity={items[item.name]?.quantity ?? 0} onClick={removeItem} />
              <Box
                backgroundColor="rgba(0, 0, 0, 0.5)"
                borderRadius={5}
                color="white"
                position="absolute"
                p={0.5}
                right={-1}
                bottom={-2}
              >
                x{item.quantity}
              </Box>
            </Box>
          ))}
        </Grid>
        <VStack>
          {beequips.map((beequip) => (
            <Text>{beequip.name}</Text>
          ))}
        </VStack>
        <Divider />
        <HStack>
          <Button backgroundColor="rgba(0, 0, 255, 0.2)" onClick={() => setBeequipsOpen(true)}>
            Beequips
          </Button>
          <Button backgroundColor="rgba(0, 255, 0, 0.2)" onClick={() => setItemsOpen(true)}>
            Cosmetics
          </Button>
          <Button
            backgroundColor="rgba(255, 0, 0, 0.4)"
            onClick={() => {
              setBeequips([]);
              setItems({});
            }}
          >
            Clear
          </Button>
        </HStack>
      </VStack>
    </>
  );
};

export default ItemStack;
