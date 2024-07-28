import { Box, Button, Grid, GridItem, Heading, HStack, Image, Text, Tooltip, VStack } from "@chakra-ui/react";
import { FaRegStar, FaStar } from "react-icons/fa";
import beequips from "../data/beequips.json";
import { getTileColor } from "../services/format";
import { formatStat } from "./StatsPopover";

export interface Beequip {
  image_url: string;
  level: string;
  color: string;
  limit: string;
  description: string;
  bees: string[];
  requirement: string;
  stats: string[];
}

export interface BeequipData {
  name: string;
  color: number;
  activeStats: string[];
  potential: number;
  waxes: string[];
}

interface BeequipTileProps {
  name: string;
  data?: BeequipData;
  onClick: () => void;
  onContextMenu: () => void;
}

const BeequipTile = ({ name, data, onClick, onContextMenu }: BeequipTileProps) => {
  // @ts-ignore
  const beequip = beequips[name] as Beequip;
  const color = getTileColor(data?.color ?? 0);

  const tile = data ? (
    <Button
      className="box"
      backgroundColor={color}
      h="auto"
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
      <Grid
        templateAreas='"button stats"
                       "waxes  stats"'
        alignItems="center"
        justifyItems="center"
        gap={1}
      >
        <GridItem area="button">
          <HStack>
            <Image src={beequip.image_url} alt={name} maxW="56px" />
            <HStack spacing={0}>
              <Text color="white">{data.potential}</Text>
              <FaStar color="white" />
            </HStack>
          </HStack>
        </GridItem>
        <GridItem area="stats">
          <VStack className="box" p={1} spacing={0}>
            {data.activeStats.map((stat, index) => formatStat(stat, index))}
          </VStack>
        </GridItem>
        <GridItem area="waxes">
          <HStack className="box" p={1}>
            {data.waxes.map((wax, index) => (
              <Image key={index} src={wax} alt={wax} boxSize="24px" />
            ))}
          </HStack>
        </GridItem>
      </Grid>
    </Button>
  ) : (
    <Button className="box" p={1} onClick={onClick}>
      <Image src={beequip.image_url} alt={name} />
    </Button>
  );

  const label = (
    <VStack alignItems="left" my={1}>
      <VStack alignItems="left" my={1}>
        <Heading size="md">{name}</Heading>
        <HStack>
          <Box className="box" boxSize="50%" p={5}>
            <Image src={beequip.image_url} alt={name} />
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
              {Array.from({ length: 5 }, (_, index) =>
                data?.potential ?? 0 > index ? <FaStar key={index} /> : <FaRegStar key={index} />
              )}
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
                {beequip.bees.map((bee, index) => (
                  <Image key={index} src={bee} alt={bee} />
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
        {data?.activeStats?.length
          ? data.activeStats.map((stat, index) => formatStat(stat, index))
          : beequip.stats.map((stat, index) => formatStat(stat, index))}
      </VStack>
      {/* Waxes */}
      {data?.waxes?.length && (
        <Grid className="box" templateColumns="repeat(5, 1fr)" gap={1}>
          {data.waxes.map((wax, index) => (
            <GridItem key={index} className="box" m={1}>
              <Image src={wax} alt={wax} p={1} />
            </GridItem>
          ))}
        </Grid>
      )}
    </VStack>
  );

  return (
    <Tooltip label={label} borderRadius={5} placement="right" hasArrow>
      {tile}
    </Tooltip>
  );
};

export default BeequipTile;
