import { Box, Button, Heading, HStack, Image, Text, Tooltip, VStack } from "@chakra-ui/react";

interface EggTileProps {
  egg: string;
  data: {
    image_url: string;
    description: string;
    obtainment: string[];
    odds: {
      rare: number;
      epic: number;
      legendary: number;
      mythic: number;
    };
  };
  onClick: () => void;
}

const EggTile = ({ egg, data, onClick }: EggTileProps) => {
  const tile = (
    <Button onClick={onClick}>
      <Image src={data.image_url} alt={egg} />
    </Button>
  );

  const label = (
    <VStack alignItems="left" my={1} color="black">
      <VStack alignItems="left" my={1}>
        <Heading size="md">{egg}</Heading>
        <HStack>
          <Box className="box" boxSize="50%" p={5}>
            <Image src={data.image_url} alt={egg} />
          </Box>
          <VStack w="50%">
            <Text className="box" fontSize="large" p={0.5} w="100%">
              Rare: {data.odds.rare * 100}%
            </Text>
            <Text className="box" fontSize="large" p={0.5} w="100%">
              Epic: {data.odds.epic * 100}%
            </Text>
            <Text className="box" fontSize="large" p={0.5} w="100%">
              Legendary: {data.odds.legendary * 100}%
            </Text>
            <Text className="box" fontSize="large" p={0.5} w="100%">
              Mythic: {data.odds.mythic * 100}%
            </Text>
          </VStack>
        </HStack>
        <Text fontStyle="italic">{data.description}</Text>
        <VStack className="box" p={1}>
          {data.obtainment.map((obtainment, index) => (
            <Text key={index}>{obtainment}</Text>
          ))}
        </VStack>
      </VStack>
    </VStack>
  );

  return (
    <Tooltip label={label} bg="rgb(255, 255, 255)" borderRadius={5} placement="right" transform="rotate(15deg)">
      {tile}
    </Tooltip>
  );
};

export default EggTile;
