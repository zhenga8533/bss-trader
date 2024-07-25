import { Box, Button, Heading, HStack, Image, Text, Tooltip, VStack } from "@chakra-ui/react";
import cosmetics from "../data/cosmetics.json";
import { findValue } from "../services/find";

interface Cosmetic {
  image_url: string;
  description: string;
  stack_boost: string;
  stack_reward: string;
  where_from: string;
}

interface CosmeticTileProps {
  name: string;
  quantity: number;
  onClick: (name: string) => void;
}

const CosmeticTile = ({ name, quantity, onClick }: CosmeticTileProps) => {
  // @ts-ignore
  const cosmetic = findValue(name, cosmetics) as Cosmetic;

  const tile = (
    <Button backgroundColor="rgba(0, 0, 0, 0.2)" borderRadius={5} p={1} onClick={() => onClick(name)}>
      <Image src={cosmetic.image_url} alt={name} />
    </Button>
  );

  const label = (
    <VStack alignItems="left" color="black" my={1}>
      <Heading size="md">{name}</Heading>
      <HStack>
        <Box className="box" boxSize="50%" p={5}>
          <Image src={cosmetic.image_url} alt={name} />
        </Box>
        <VStack w="50%">
          <Text className="box" fontSize="large" p={0.5} w="100%">
            Skin
          </Text>
          <Text className="box" fontSize="large" p={0.5} w="100%">
            In Book: {quantity > 0 ? "Yes" : "No"}
          </Text>
          <Text className="box" fontSize="large" p={0.5} w="100%">
            In Stack: {quantity}
          </Text>
          <Text className="box" fontSize="large" p={0.5} w="100%">
            Type
          </Text>
        </VStack>
      </HStack>
      <Text fontStyle="italic">{cosmetic.description}</Text>
      <Text fontWeight="bold">Stack Boost: {cosmetic.stack_boost}</Text>
      <Text fontWeight="bold">Stack Reward: {cosmetic.stack_reward}</Text>
      <Box backgroundColor="rgba(0, 0, 0, 0.1)" borderRadius={5} px={2} whiteSpace="pre-line">
        <Text fontWeight="bold">Where it's from:</Text>
        <Text>{"● " + cosmetic.where_from.replace(/\n/g, "\n● ")}</Text>
      </Box>
    </VStack>
  );

  return (
    <Tooltip label={label} bg="rgb(255, 255, 48)" borderRadius={5} placement="bottom" transform="rotate(15deg)">
      {tile}
    </Tooltip>
  );
};

export default CosmeticTile;
