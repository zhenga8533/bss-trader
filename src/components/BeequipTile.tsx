import { Box, Button, Grid, Heading, HStack, Image, Text, Tooltip, VStack } from "@chakra-ui/react";
import { FaRegStar } from "react-icons/fa";

export interface Beequip {
  name: string;
  image_url: string;
  level: string;
  color: string;
  limit: string;
  description: string;
  bees: string[];
  requirement: string;
  stats: string[];
}

interface BeequipTileProps {
  beequip: Beequip;
  onClick: (beequip: Beequip) => void;
}

const BeequipTile = ({ beequip, onClick }: BeequipTileProps) => {
  const tile = (
    <Button className="box" p={1} onClick={() => onClick(beequip)}>
      <Image src={beequip.image_url} alt={beequip.name} />
    </Button>
  );

  const label = (
    <VStack alignItems="left" my={1}>
      <VStack alignItems="left" my={1}>
        <Heading size="md">{beequip.name}</Heading>
        <HStack>
          <Box className="box" boxSize="50%" p={5}>
            <Image src={beequip.image_url} alt={beequip.name} />
          </Box>
          <VStack w="50%">
            <Text className="box" fontSize="large" p={0.5} w="100%">
              Level: {beequip.level}
            </Text>
            <Text className="box" fontSize="large" p={0.5} w="100%">
              Color: {beequip.color}
            </Text>
            <Text className="box" fontSize="large" p={0.5} w="100%">
              Limit: {beequip.limit}
            </Text>
            <HStack className="box" p={2} w="100%">
              {Array.from({ length: 5 }, (_, index) => (
                <FaRegStar key={index} size="large" />
              ))}
            </HStack>
          </VStack>
        </HStack>
        <Text fontStyle="italic">{beequip.description}</Text>
        {/* Requirements */}
        <VStack alignItems="left" className="box" p={1}>
          {beequip.bees.length > 0 && (
            <HStack>
              <Text textAlign="center">Only For:</Text>
              <Grid templateColumns="repeat(6, 1fr)" columnGap={2}>
                {beequip.bees.map((bee) => (
                  <Image src={bee} alt={bee} />
                ))}
              </Grid>
            </HStack>
          )}
          {beequip.requirement !== "None" && <Text>{"● " + beequip.requirement}</Text>}
        </VStack>
      </VStack>
      {/* Stats */}
      <VStack alignItems="left" className="box" p={1} gap={0}>
        <Text fontWeight="bold">Stats:</Text>
        {beequip.stats.map((stat, index) => (
          <Text key={index}>{"● " + stat}</Text>
        ))}
      </VStack>
    </VStack>
  );

  return (
    <Tooltip label={label} borderRadius={5} placement="right" transform="rotate(15deg)">
      {tile}
    </Tooltip>
  );
};

export default BeequipTile;
