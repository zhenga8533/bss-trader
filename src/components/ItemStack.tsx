import { Button, Divider, Heading, HStack, VStack } from "@chakra-ui/react";
import { useState } from "react";
import ItemModal from "./ItemModal";

interface ItemStackProps {
  color: string;
  title: string;
}

const ItemStack = ({ color, title }: ItemStackProps) => {
  const [items, setItems] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(items);

  return (
    <>
      <ItemModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <VStack>
        <Heading background={color} borderRadius={5} textAlign="center" size="lg" w="100%">
          {title}
        </Heading>
        <Divider />
        <HStack>
          <Button backgroundColor="rgba(0, 0, 255, 0.2)" onClick={() => setIsModalOpen(true)}>
            Add
          </Button>
          <Button backgroundColor="rgba(255, 0, 0, 0.4)" onClick={() => setItems([])}>
            Clear
          </Button>
        </HStack>
      </VStack>
    </>
  );
};

export default ItemStack;
