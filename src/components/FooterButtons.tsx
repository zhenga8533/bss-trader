import { Button, Center, HStack } from "@chakra-ui/react";

const FooterButtons = () => {
  return (
    <Center>
      <HStack>
        <Button colorScheme="blue" variant="solid">
          Export
        </Button>
        <Button colorScheme="red" variant="solid">
          Import
        </Button>
      </HStack>
    </Center>
  );
};

export default FooterButtons;
