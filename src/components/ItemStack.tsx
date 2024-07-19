import { Button, Divider, Heading, HStack, VStack } from "@chakra-ui/react";

interface ItemStackProps {
  color: string;
  title: string;
}

const ItemStack = ({ color, title }: ItemStackProps) => {
  return (
    <VStack>
      <Heading background={color} borderRadius={5} textAlign="center" size="lg" w="100%">
        {title}
      </Heading>
      <Divider />
      <HStack>
        <Button backgroundColor="rgba(0, 0, 255, 0.2)">Add</Button>
        <Button backgroundColor="rgba(255, 0, 0, 0.4)">Clear</Button>
      </HStack>
    </VStack>
  );
};

export default ItemStack;
