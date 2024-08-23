import { Box, Center, Grid, GridItem, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import QRCode from "qrcode.react";
import { useState } from "react";
import arrows from "./assets/arrows.webp";
import background from "./assets/backgrounds/doodle.webp";
import discord from "./assets/discord.png";
import Footer from "./components/Footer";
import SproutTimer from "./components/SproutTimer";
import ItemStack from "./components/Stack";
import StickerPrinter from "./components/StickerPrinter";
import { getExport } from "./services/data";

const App = () => {
  const [seed, setSeed] = useState(1);
  const reset = () => {
    setSeed(Math.random());
  };

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
      <Grid
        templateColumns="repeat(auto-fit, minmax(200px, 1fr))"
        gap={4}
        px="5%"
        py={5}
        position="relative"
        zIndex={10}
      >
        <StickerPrinter />
        <Center>
          <Heading className="heading" backgroundColor="rgba(255, 255, 32, 0.75)" borderRadius={5} p={3}>
            BSS Trader
          </Heading>
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
            <ItemStack color="rgb(231, 95, 95)" title="Offering" onChange={reset} />
          </GridItem>
          <GridItem gridArea="center">
            <Center>
              <Box maxW={64} position="relative">
                <Image src={arrows} alt="Arrows" />
                <QRCode
                  key={seed}
                  value={"www.bsstrader.com?data=" + getExport()}
                  style={{ position: "absolute", top: "15%", left: "15%", width: "70%", height: "70%" }}
                />
              </Box>
            </Center>
          </GridItem>
          <GridItem gridArea="looking-for">
            <ItemStack color="rgb(110, 222, 75)" title="Looking For" onChange={reset} />
          </GridItem>
        </Grid>
      </Box>
      <HStack justifyContent="space-between" position="relative" px="5%" zIndex={10}>
        <Footer />
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
