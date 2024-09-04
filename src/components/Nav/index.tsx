import { Heading, HStack, Switch, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface NavProps {
  onSetBoxes: (showBoxes: boolean) => void;
  onSetQR: (showQR: boolean) => void;
}

const Nav = ({ onSetBoxes, onSetQR }: NavProps) => {
  const [showBoxes, setShowBoxes] = useState(localStorage.getItem("showBoxes") !== "false");
  useEffect(() => {
    localStorage.setItem("showBoxes", showBoxes.toString());
  }, [showBoxes]);

  const [showQR, setShowQR] = useState(localStorage.getItem("showQR") !== "false");
  useEffect(() => {
    localStorage.setItem("showQR", showQR.toString());
  }, [showQR]);

  return (
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
          <Text fontSize="xl">Boxes</Text>
          <Switch
            size="lg"
            defaultChecked={showBoxes}
            onChange={() => {
              onSetBoxes(!showBoxes);
              setShowBoxes(!showBoxes);
            }}
          />
        </HStack>
        <HStack>
          <Text fontSize="xl">QR Code</Text>
          <Switch
            size="lg"
            defaultChecked={showQR}
            onChange={() => {
              onSetQR(!showQR);
              setShowQR(!showQR);
            }}
          />
        </HStack>
      </HStack>
    </HStack>
  );
};

export default Nav;
