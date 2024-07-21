import { Box, Button, Heading, HStack, Image, Text, Tooltip, VStack } from "@chakra-ui/react";

export interface Item {
  image_url: string;
  name: string;
  description: string;
  stack_boost: string;
  stack_reward: string;
  where_from: string;
}

interface ItemTileProps {
  item: Item;
  onClick: (item: Item) => void;
}

const ItemTile = ({ item, onClick }: ItemTileProps) => {
  const tile = (
    <Button backgroundColor="rgba(0, 0, 0, 0.2)" borderRadius={5} p={1} onClick={() => onClick(item)}>
      <Image src={item.image_url} alt={item.name} />
    </Button>
  );

  const label = (
    <VStack alignItems="left" my={1}>
      <Heading size="md">{item.name}</Heading>
      <HStack>
        <Box className="box" boxSize="50%" p={5}>
          <Image src={item.image_url} alt={item.name} />
        </Box>
        <VStack w="50%">
          <Text className="box" fontSize="large" p={0.5} w="100%">
            Sticker
          </Text>
          <Text className="box" fontSize="large" p={0.5} w="100%">
            In Book:
          </Text>
          <Text className="box" fontSize="large" p={0.5} w="100%">
            In Stack:
          </Text>
          <Text className="box" fontSize="large" p={0.5} w="100%">
            Type
          </Text>
        </VStack>
      </HStack>
      <Text fontStyle="italic">{item.description}</Text>
      <Text fontWeight="bold">Stack Boost: {item.stack_boost}</Text>
      <Text fontWeight="bold">Stack Reward: {item.stack_reward}</Text>
      <Box backgroundColor="rgba(0, 0, 0, 0.1)" borderRadius={5} px={2} whiteSpace="pre-line">
        <Text fontWeight="bold">Where it's from:</Text>
        <Text>{"● " + item.where_from.replace(/\n/g, "\n● ")}</Text>
      </Box>
    </VStack>
  );

  return (
    <Tooltip label={label} placement="top" borderRadius={5} transform="rotate(15deg)">
      {tile}
    </Tooltip>
  );
};

export default ItemTile;
