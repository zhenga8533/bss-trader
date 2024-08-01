import { Button, Flex, Heading } from "@chakra-ui/react";

const StickerPrinter = () => {
  return (
    <Flex justifyContent="flex-start">
      <Button bgColor="rgba(0, 0, 0, 0.75)" borderRadius={5} p={3} h="100%">
        <Heading className="heading">Sticker Printer</Heading>
      </Button>
    </Flex>
  );
};

export default StickerPrinter;
