import { Box, Heading, HStack, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import ThemeSwitch from "./ThemeSwitch";
import Toggle from "./Toggle";

interface NavProps {
  onSetBoxes: (showBoxes: boolean) => void;
  onSetQR: (showQR: boolean) => void;
}

const Nav = ({ onSetBoxes, onSetQR }: NavProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <HStack
      width="100%"
      backgroundColor={{ base: "rgb(13, 9, 7)", md: "rgba(0, 0, 0, 0.75)" }}
      color="white"
      padding="1rem"
      position="relative"
      zIndex={20}
      justifyContent="space-between"
    >
      <Heading size="lg">BSS Trader</Heading>
      <Box display={{ base: "block", md: "none" }}>
        <IconButton
          icon={isMenuOpen ? <FaTimes /> : <FaBars />}
          aria-label="Toggle Menu"
          onClick={toggleMenu}
          color="white"
          backgroundColor="transparent"
          _hover={{ backgroundColor: "transparent" }}
        />
      </Box>
      <HStack
        spacing={4}
        display={{ base: isMenuOpen ? "flex" : "none", md: "flex" }}
        flexDirection={{ base: "column", md: "row" }}
        position={{ base: "absolute", md: "relative" }}
        top={{ base: "100%", md: "auto" }}
        left={{ base: 0, md: "auto" }}
        width={{ base: "100%", md: "auto" }}
        backgroundColor={{ base: "rgb(53, 56, 57)", md: "transparent" }}
        padding={{ base: "1rem", md: 0 }}
      >
        <Toggle id="showBoxes" title="Boxes" onSet={onSetBoxes} />
        <Toggle id="showQR" title="QR Code" onSet={onSetQR} />
        <ThemeSwitch />
      </HStack>
    </HStack>
  );
};

export default Nav;
