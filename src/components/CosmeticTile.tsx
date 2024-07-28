import { Box, Button, Heading, HStack, Image, Text, Tooltip, VStack } from "@chakra-ui/react";
import cosmetics from "../data/cosmetics.json";
import { findValue } from "../services/find";
import { getTileColor } from "../services/format";

interface Cosmetic {
  image_url: string;
  description: string;
  stack_boost: string;
  stack_reward: string;
  where_from: string;
}

export interface CosmeticData {
  color: number;
  quantity: number;
}

interface CosmeticTileProps {
  name: string;
  data: CosmeticData;
  onClick: () => void;
  onContextMenu: () => void;
}

const CosmeticTile = ({ name, data, onClick, onContextMenu }: CosmeticTileProps) => {
  // @ts-ignore
  const cosmetic = findValue(name, cosmetics) as Cosmetic;
  const color = getTileColor(data?.color ?? 0);

  const tile = (
    <Button
      backgroundColor={color}
      borderRadius={5}
      p={1}
      onClick={onClick}
      onContextMenu={(e) => {
        e.preventDefault();
        onContextMenu();
      }}
      sx={{
        ":hover": {
          backgroundColor: color.replace("0.3", "0.6"),
        },
      }}
    >
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
            In Book: {data?.quantity > 0 ? "Yes" : "No"}
          </Text>
          <Text className="box" fontSize="large" p={0.5} w="100%">
            In Stack: {data?.quantity}
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
