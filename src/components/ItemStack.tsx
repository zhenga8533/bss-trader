import { Box, Button, Divider, Grid, Heading, HStack, VStack } from "@chakra-ui/react";
import { useState } from "react";
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
  const [items, setItems] = useState<{ [key: string]: Item & { quantity: number } }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <>
      <ItemModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} addItem={addItem} stackItems={items} />
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
        <Grid gap={2} templateColumns="repeat(auto-fill, minmax(90px, 1fr))" w="100%">
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
        <HStack>
          <Button backgroundColor="rgba(0, 0, 255, 0.2)" onClick={() => setIsModalOpen(true)}>
            Add
          </Button>
          <Button backgroundColor="rgba(255, 0, 0, 0.4)" onClick={() => setItems({})}>
            Clear
          </Button>
        </HStack>
      </VStack>
    </>
  );
};

export default ItemStack;
