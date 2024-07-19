import { Box } from "@chakra-ui/react";
import background from "./assets/background.jpg";

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
        ml="10vw"
        width="80vw"
        minH="80vh"
        display="flex"
        position="absolute"
      ></Box>
    </Box>
  );
};

export default App;
