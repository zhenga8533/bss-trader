import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { getImport } from "../../services/data";

const LinkLoad = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const queryParams = new URLSearchParams(window.location.search);
  const data = queryParams.get("data")?.replace(/ /g, "");

  useEffect(() => {
    if (data) onOpen();
  }, [data, onOpen]);

  const setQuery = () => {
    if (!data) return;

    getImport(data);
    if (window.history.pushState) {
      const newurl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
      window.history.pushState({ path: newurl }, "", newurl);
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Data Import</ModalHeader>
        <ModalBody>
          <hr />
          <Text>You are about to import the following data:</Text>
          <Box className="box" p={1} mb={3}>
            <Text>{data}</Text>
          </Box>
          <Text>Do you want to continue?</Text>
          <Text fontWeight="bold">This action will overwrite your current data.</Text>
          <hr />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="green" mr={3} onClick={setQuery}>
            Import
          </Button>
          <Button colorScheme="red" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LinkLoad;
