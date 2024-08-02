import { Button, Image } from "@chakra-ui/react";

interface EggTileProps {
  egg: string;
  data: {
    image_url: string;
  };
  onClick: () => void;
  setSpinning: (spinning: boolean) => void;
}

const EggTile = ({ egg, data }: EggTileProps) => {
  return (
    <Button>
      <Image src={data.image_url} alt={egg} />
    </Button>
  );
};

export default EggTile;
