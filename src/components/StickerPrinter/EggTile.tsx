import { Button, Image } from "@chakra-ui/react";

interface EggTileProps {
  egg: string;
  data: {
    image_url: string;
  };
  onClick: () => void;
}

const EggTile = ({ egg, data, onClick }: EggTileProps) => {
  return (
    <Button onClick={onClick}>
      <Image src={data.image_url} alt={egg} />
    </Button>
  );
};

export default EggTile;
