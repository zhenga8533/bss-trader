import { Box, Button, Divider, Flex, Grid, Heading, HStack, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import BeequipModal from "./BeequipModal";
import BeequipTile, { BeequipData } from "./BeequipTile";
import CosmeticModal from "./CosmeticModal";
import CosmeticTile from "./CosmeticTile";

interface StackProps {
  color: string;
  title: string;
}

const Stack = ({ color, title }: StackProps) => {
  const id = title.toLowerCase().replace(/\s/g, "-");

  // Cub Skins, Hive Skins, Stickers, and Vouchers
  const getCosmetics = () => {
    const saveData = localStorage.getItem(id + "-cosmetics");
    return saveData ? JSON.parse(saveData) : {};
  };

  const [cosmetics, setCosmetics] = useState<{ [key: string]: number }>(getCosmetics);
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
    localStorage.setItem(id + "-cosmetics", JSON.stringify(cosmetics));
  }, [cosmetics]);

  // Beequips
  const getBeequips = () => {
    const saveData = localStorage.getItem(id + "-beequips");
    return saveData ? JSON.parse(saveData) : [];
  };

  const [beequips, setBeequips] = useState<BeequipData[]>(getBeequips);
  const [beequipsOpen, setBeequipsOpen] = useState(false);

  const addBeequip = (data: BeequipData) => {
    setBeequips((prevBeequips) => [...prevBeequips, data]);
  };

  const removeBeequip = (index: number) => {
    setBeequips((prevBeequips) => {
      const newBeequips = [...prevBeequips];
      newBeequips.splice(index, 1);
      return newBeequips;
    });
  };

  useEffect(() => {
    localStorage.setItem(id + "-beequips", JSON.stringify(beequips));
  }, [beequips]);

  // Event listener for updating the stack
  window.addEventListener("update", () => {
    setBeequips(getBeequips());
    setCosmetics(getCosmetics());
  });

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
          {beequips.map((beequip, index) => (
            <Box key={beequip.name} p={2} minW="90px" maxW="1fr">
              <BeequipTile name={beequip.name} data={beequip} onClick={() => removeBeequip(index)} />
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
