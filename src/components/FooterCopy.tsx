import {
  Button,
  HStack,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import QRCode from "qrcode.react";

interface FooterCopyProps {
  data: string;
  isOpen: boolean;
  showQR: boolean;
  onClose: () => void;
}

const FooterCopy = ({ data, isOpen, showQR, onClose }: FooterCopyProps) => {
  const toast = useToast();
  const copy = () => {
    navigator.clipboard.writeText(data);
    toast({
      title: "Text copied to clipboard!",
      status: "success",
      variant: "subtle",
      position: "top",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Import Data</ModalHeader>
        <ModalCloseButton />
        <Textarea value={data} rows={10} />

        <ModalFooter justifyContent="space-between">
          {showQR && <QRCode value={"https://zhenga8533.github.io/bss-trader?data=" + data} size={64} />}
          <HStack>
            <Button colorScheme="blue" variant="solid" mr={3} onClick={copy}>
              Copy
            </Button>
            <Button colorScheme="red" variant="solid" onClick={onClose}>
              Cancel
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FooterCopy;
