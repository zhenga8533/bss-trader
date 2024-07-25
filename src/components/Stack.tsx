import { Box, Button, Divider, Flex, Grid, Heading, HStack, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import BeequipModal from "./BeequipModal";
import BeequipTile, { Beequip } from "./BeequipTile";
import CosmeticModal from "./CosmeticModal";
import CosmeticTile from "./CosmeticTile";

interface StackProps {
  color: string;
  title: string;
}

const Stack = ({ color, title }: StackProps) => {
  const id = title.toLowerCase().replace(/\s/g, "-");

  // Cub Skins, Hive Skins, Stickers, and Vouchers
  const [cosmetics, setCosmetics] = useState<{ [key: string]: number }>(() => {
    const saveData = localStorage.getItem(id + "-items");
    return saveData ? JSON.parse(saveData) : {};
  });
  const [cosmeticsOpen, setCosmeticsOpen] = useState(false);

  const addCosmetic = (name: string) => {
    setCosmetics((prevCosmetics) => ({ ...prevCosmetics, [name]: (prevCosmetics[name] ?? 0) + 1 }));
  };

  const removeCosmetic = (name: string) => {
    setCosmetics((prevCosmetics) => {
      const newCosmetics = { ...prevCosmetics };
      if (newCosmetics[name] && newCosmetics[name] > 0) {
        newCosmetics[name] -= 1;
      }
      return newCosmetics;
    });
  };

  useEffect(() => {
    localStorage.setItem(id + "-items", JSON.stringify(cosmetics));
  }, [cosmetics]);

  // Beequips
  const [beequips, setBeequips] = useState<Beequip[]>(() => {
    const saveData = localStorage.getItem(id + "-beequips");
    return saveData ? JSON.parse(saveData) : [];
  });
  const [beequipsOpen, setBeequipsOpen] = useState(false);

  const addBeequip = (beequip: Beequip) => {
    setBeequips((prevBeequips) => [...prevBeequips, beequip]);
  };

  const removeBeequip = (beequip: Beequip) => {
    setBeequips((prevBeequips) => prevBeequips.filter((b) => b.name !== beequip.name));
  };

  useEffect(() => {
    localStorage.setItem(id + "-beequips", JSON.stringify(beequips));
  }, [beequips]);

  return (
    <>
      <BeequipModal isOpen={beequipsOpen} onClose={() => setBeequipsOpen(false)} addBeequip={addBeequip} />
      <CosmeticModal
        isOpen={cosmeticsOpen}
        stack={cosmetics}
        addCosmetic={addCosmetic}
        onClose={() => setCosmeticsOpen(false)}
      />
      <VStack>
        <Heading className="heading" background={color} borderRadius={5} textAlign="center" size="lg" w="100%">
          {title}
        </Heading>
        <Divider />
        <Grid gap={2} templateColumns="repeat(auto-fill, minmax(90px, 1fr))" w="100%" columnGap={3} rowGap={5}>
          {Object.entries(cosmetics).map(([name, quantity]) => (
            <Box position={"relative"} key={name}>
              <CosmeticTile name={name} quantity={quantity} onClick={removeCosmetic} />
              <Box
                backgroundColor="rgba(0, 0, 0, 0.5)"
                borderRadius={5}
                color="white"
                position="absolute"
                p={0.5}
                right={-1}
                bottom={-2}
              >
                x{quantity}
              </Box>
            </Box>
          ))}
        </Grid>
        <Flex wrap="wrap" justifyContent="space-around" w="100%">
          {beequips.map((beequip) => (
            <Box key={beequip.name} p={2} minW="90px" maxW="1fr">
              <BeequipTile beequip={beequip} detailed={true} onClick={removeBeequip} />
            </Box>
          ))}
        </Flex>
        <Divider />
        <HStack>
          <Button colorScheme="blue" onClick={() => setBeequipsOpen(true)}>
            Beequips
          </Button>
          <Button colorScheme="green" onClick={() => setCosmeticsOpen(true)}>
            Cosmetics
          </Button>
          <Button
            colorScheme="red"
            onClick={() => {
              setBeequips([]);
              setCosmetics({});
            }}
          >
            Clear
          </Button>
        </HStack>
      </VStack>
    </>
  );
};

export default Stack;
