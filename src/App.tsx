import { Box, Center, Grid, GridItem, Heading, HStack, Image, Switch, Text, VStack } from "@chakra-ui/react";
import QRCode from "qrcode.react";
import { useEffect, useState } from "react";
import arrows from "./assets/arrows.webp";
import background from "./assets/backgrounds/doodle.webp";
import discord from "./assets/discord.png";
import roblox from "./assets/roblox.png";
import url from "./assets/url.png";
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

  const [showQR, setShowQR] = useState(localStorage.getItem("showQR") !== "false");
  useEffect(() => {
    localStorage.setItem("showQR", showQR.toString());
  }, [showQR]);

  const [showBoxes, setShowBoxes] = useState(localStorage.getItem("showBoxes") !== "false");
  useEffect(() => {
    localStorage.setItem("showBoxes", showBoxes.toString());
  }, [showBoxes]);

  return (
    <Box display="flex" flexDirection="column" minH="100vh" position="relative">
      {/* Heading */}
      <HStack
        width="100%"
        backgroundColor="rgba(0, 0, 0, 0.75)"
        color="white"
        padding="1rem"
        position="relative"
        zIndex={10}
        justifyContent="space-between"
      >
        <Heading size="lg">BSS Trader</Heading>
        <HStack spacing={4}>
          <HStack>
            <Text fontSize="xl">QR Code</Text>
            <Switch size="lg" defaultChecked={showQR} onChange={() => setShowQR(!showQR)} />
          </HStack>
          <HStack>
            <Text fontSize="xl">Boxes</Text>
            <Switch size="lg" defaultChecked={showBoxes} onChange={() => setShowBoxes(!showBoxes)} />
          </HStack>
        </HStack>
      </HStack>

      {/* Main Content */}
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
      {showBoxes && (
        <Grid
          templateColumns="repeat(auto-fit, minmax(200px, 1fr))"
          gap={4}
          px="5%"
          py={5}
          position="relative"
          zIndex={10}
        >
          <StickerPrinter />
          <SproutTimer />
        </Grid>
      )}
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
                <Box position="relative">
                  <Image src={arrows} alt="Arrows" />
                  {showQR && (
                    <QRCode
                      key={seed}
                      value={"https://bsstrader.com?data=" + getExport()}
                      style={{ position: "absolute", top: "15%", left: "15%", width: "70%", height: "70%" }}
                    />
                  )}
                </Box>
                <Image
                  src={url}
                  alt="bsstrader.com"
                  position="absolute"
                  bottom={showQR ? "3%" : "50%"}
                  className="wiggle"
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
      <VStack color="white" mb={5} position="relative" spacing={2} width="100%">
        <Text className="heading">made by</Text>
        {/*<HStack cursor="pointer" onClick={() => window.open("https://discord.com/users/166928679467745282")}>*/}
        <HStack>
          <Image src={discord} alt="Discord" boxSize={10} />
          <Heading className="heading" size="md">
            grapefruited
          </Heading>
        </HStack>
        <HStack cursor="pointer" onClick={() => window.open("https://www.roblox.com/users/157670655/profile")}>
          <Image src={roblox} alt="Roblox" boxSize={10} />
          <Heading className="heading" size="md">
            ItsAnEif
          </Heading>
        </HStack>
      </VStack>
    </Box>
  );
};

export default App;
