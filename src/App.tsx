import { Box, Grid, GridItem, Heading, HStack, Image } from "@chakra-ui/react";
import background from "./assets/background.jpg";
import sticker from "./assets/sticker.webp";
import ItemStack from "./components/ItemStack";
import SproutTimer from "./components/SproutTimer";

const App = () => {
  return (
    <Box position="relative">
      <Box
        minH="100vh"
        minW="100vw"
        backgroundImage={background}
        backgroundSize="cover"
        filter="blur(24px)"
        position="absolute"
        zIndex={0}
      />
      <Box
        backgroundColor="rgba(0, 0, 0, 0.5)"
        outline="5px solid rgba(255, 255, 0, 0.5)"
        borderRadius={10}
        zIndex={10}
        mt={10}
        ml="5vw"
        width="90vw"
        minH="80vh"
        position="absolute"
      >
        <Grid
          templateAreas={`"div header timer"
                          "offering center giving"
                          "footer footer footer"`}
          templateColumns={"1fr auto 1fr"}
          gap={4}
          p={4}
          w="100%"
        >
          <GridItem gridArea="header" justifyContent="start">
            <HStack justifyContent="center">
              <HStack backgroundColor="rgba(128, 128, 128, 0.5)" borderRadius={5} p={3} position="relative">
                <Image src={sticker} alt="Sticker" />
                <Heading>BSS Trader</Heading>
                <Image src={sticker} alt="Sticker" />
              </HStack>
            </HStack>
          </GridItem>
          <GridItem gridArea="timer">
            <SproutTimer />
          </GridItem>
          <GridItem gridArea="offering">
            <ItemStack color="rgba(255, 64, 64, 0.5)" title="Offering" />
          </GridItem>
          <GridItem gridArea="center">
            <Heading>Center</Heading>
          </GridItem>
          <GridItem gridArea="giving">
            <ItemStack color="rgba(64, 255, 64, 0.5)" title="Giving" />
          </GridItem>
          <GridItem gridArea="footer">
            <Heading>Footer</Heading>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};

export default App;
