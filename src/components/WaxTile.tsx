import { Button, Heading, Image, Text, Tooltip, VStack } from "@chakra-ui/react";

interface Wax {
  image_url: string;
  description: string;
}

interface WaxTileProps {
  name: string;
  wax: Wax;
  onClick: () => void;
}

const WaxTile = ({ name, wax, onClick }: WaxTileProps) => {
  return (
    <Tooltip
      className="box"
      hasArrow
      label={
        <VStack>
          <Heading size="sm">{name}</Heading>
          <Text>{wax.description}</Text>
        </VStack>
      }
    >
      <Button colorScheme="blue" variant="solid" onClick={onClick}>
        <Image src={wax.image_url} alt={"wax"} boxSize="36px" />
      </Button>
    </Tooltip>
  );
};

export default WaxTile;
