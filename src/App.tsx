import { Box, Center, Grid, GridItem, Heading, HStack, Image } from "@chakra-ui/react";
import arrows from "./assets/arrows.webp";
import background from "./assets/background.jpg";
import FooterButtons from "./components/FooterButtons";
import SproutTimer from "./components/SproutTimer";
import ItemStack from "./components/Stack";

const App = () => {
  return (
    <Box display="flex" flexDirection="column" minH="100vh" position="relative">
      <Box
        flex="1"
        backgroundImage={background}
        backgroundSize="cover"
        filter="blur(16px)"
        position="absolute"
        zIndex={0}
        width="100%"
        height="100%"
      />
      <HStack justifyContent="space-between" position="relative" pt="3vw" px="5%" zIndex={10}>
        <HStack justifyContent="center">
          <HStack backgroundColor="rgba(128, 128, 128, 0.5)" borderRadius={5} p={3}>
            <Heading className="heading">BSS Trader</Heading>
          </HStack>
        </HStack>
        <SproutTimer />
      </HStack>
      <Box
        backgroundColor="rgba(0, 0, 0, 0.5)"
        outline="5px solid rgba(255, 255, 0, 0.75)"
        borderRadius={10}
        mx="5%"
        my={5}
        position="relative"
        width="90%"
        zIndex={10}
      >
        <Grid
          templateAreas={{
            base: `"offering"
                    "center"
                    "looking-for"
                    "footer"`,
            md: `"offering center looking-for"
                 "footer footer footer"`,
          }}
          templateColumns={{
            base: "1fr",
            md: "1fr auto 1fr",
          }}
          gap={4}
          p={4}
          w="100%"
        >
          <GridItem gridArea="offering">
            <ItemStack color="rgb(231, 95, 95)" title="Offering" />
          </GridItem>
          <GridItem gridArea="center">
            <Center>
              <Image src={arrows} alt="Arrows" maxW={48} />
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
