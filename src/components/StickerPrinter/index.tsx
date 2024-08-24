import { Button, Flex, Heading } from "@chakra-ui/react";
import { useState } from "react";
import PrinterModal from "./PrinterModal";

const StickerPrinter = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Flex justifyContent="flex-start">
      <PrinterModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <Button bgColor="rgba(255, 255, 255, 0.5)" borderRadius={5} p={3} h="100%" onClick={() => setIsOpen(true)}>
        <Heading className="heading">🖨️ Printer</Heading>
      </Button>
    </Flex>
  );
};

export default StickerPrinter;
