import { Button, Flex, Heading } from "@chakra-ui/react";
import { useState } from "react";
import StickerModal from "./StickerModal";

const StickerPrinter = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Flex justifyContent="flex-start">
      <StickerModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <Button bgColor="rgba(0, 0, 0, 0.75)" borderRadius={5} p={3} h="100%" onClick={() => setIsOpen(true)}>
        <Heading className="heading">🖨️ Printer</Heading>
      </Button>
    </Flex>
  );
};

export default StickerPrinter;
