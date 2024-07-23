import { Box, Center, Grid, GridItem, Heading, HStack, Image } from "@chakra-ui/react";
import arrows from "./assets/arrows.webp";
import background from "./assets/background.jpg";
import sticker from "./assets/sticker.webp";
import FooterButtons from "./components/FooterButtons";
import SproutTimer from "./components/SproutTimer";
import ItemStack from "./components/Stack";

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
        position="absolute"
      >
        <Grid
          templateAreas={`"div header timer"
                          "offering center looking-for"
                          "footer footer footer"`}
          templateColumns={"1fr auto 1fr"}
          gap={4}
          p={4}
          w="100%"
        >
          <GridItem gridArea="header" justifyContent="start">
            <HStack justifyContent="center">
              <HStack backgroundColor="rgba(128, 128, 128, 0.5)" borderRadius={5} p={3}>
                <Image src={sticker} alt="Sticker" />
                <Heading className="heading">BSS Trader</Heading>
                <Image src={sticker} alt="Sticker" />
              </HStack>
            </HStack>
          </GridItem>
          <GridItem gridArea="timer">
            <SproutTimer />
          </GridItem>
          <GridItem gridArea="offering">
            <ItemStack color="rgb(231, 95, 95)" title="Offering" />
          </GridItem>
          <GridItem gridArea="center">
            <Center>
              <Image src={arrows} alt="Arrows" />
            </Center>
          </GridItem>
          <GridItem gridArea="looking-for">
            <ItemStack color="rgb(110, 222, 75)" title="Looking For" />
          </GridItem>
          <GridItem gridArea="footer">
            <FooterButtons />
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};

export default App;
