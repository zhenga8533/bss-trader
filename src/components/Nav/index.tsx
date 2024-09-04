import { Heading, HStack } from "@chakra-ui/react";
import ThemeSwitch from "./ThemeSwitch";
import Toggle from "./Toggle";

interface NavProps {
  onSetBoxes: (showBoxes: boolean) => void;
  onSetQR: (showQR: boolean) => void;
}

const Nav = ({ onSetBoxes, onSetQR }: NavProps) => {
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
        <Toggle id="showBoxes" title="Boxes" onSet={onSetBoxes} />
        <Toggle id="showQR" title="QR Code" onSet={onSetQR} />
        <ThemeSwitch />
      </HStack>
    </HStack>
  );
};

export default Nav;
