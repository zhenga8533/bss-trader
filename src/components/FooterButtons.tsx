import { Button, Center, HStack } from "@chakra-ui/react";

const FooterButtons = () => {
  const textify = () => {
    const lf = localStorage.getItem("looking-for-items");
    console.log(lf);
  };

  return (
    <Center>
      <HStack>
        <Button colorScheme="green" variant="solid">
          Textify
        </Button>
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
