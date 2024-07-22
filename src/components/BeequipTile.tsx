import { Button, Image, Text, Tooltip, VStack } from "@chakra-ui/react";

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
    <Button backgroundColor="rgba(0, 0, 0, 0.2)" borderRadius={5} p={1} onClick={() => onClick(beequip)}>
      <Image src={beequip.image_url} alt={beequip.name} />
    </Button>
  );

  const label = (
    <VStack alignItems="left" my={1}>
      <Text>Placeholder</Text>
    </VStack>
  );

  return (
    <Tooltip label={label} bg="rgb(255, 255, 48)" borderRadius={5} placement="bottom" transform="rotate(15deg)">
      {tile}
    </Tooltip>
  );
};

export default BeequipTile;
