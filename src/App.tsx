import { Box, Center, Grid, GridItem, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import arrows from "./assets/arrows.webp";
import background from "./assets/backgrounds/war.jpg";
import discord from "./assets/discord.png";
import FooterButtons from "./components/FooterButtons";
import SproutTimer from "./components/SproutTimer";
import ItemStack from "./components/Stack";
import StickerPrinter from "./components/StickerPrinter";

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
      <Grid templateColumns="repeat(3, 1fr)" gap={4} px="5%" py={5} position="relative" zIndex={10}>
        <StickerPrinter />
        <Center backgroundColor="rgba(255, 255, 32, 0.75)" borderRadius={5} p={3}>
          <Heading className="heading">BSS Trader</Heading>
        </Center>
        <SproutTimer />
      </Grid>
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
                    "looking-for"`,
            md: `"offering center looking-for"`,
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
              <Box maxW={48}>
                <Image src={arrows} alt="Arrows" />
              </Box>
            </Center>
          </GridItem>
          <GridItem gridArea="looking-for">
            <ItemStack color="rgb(110, 222, 75)" title="Looking For" />
          </GridItem>
        </Grid>
      </Box>
      <HStack justifyContent="space-between" position="relative" px="5%" zIndex={10}>
        <FooterButtons />
      </HStack>
      <VStack color="white" mb={5} position="relative" spacing={1} width="100%">
        <Text className="heading">made by</Text>
        <HStack>
          <Image src={discord} alt="Discord" boxSize={10} />
          <Heading className="heading" size="md">
            grapefruited
          </Heading>
        </HStack>
      </VStack>
    </Box>
  );
};

export default App;
