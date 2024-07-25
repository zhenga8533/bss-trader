import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";
import { useRef } from "react";

interface FooterPromptProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: string) => void;
}

const FooterPrompt = ({ isOpen, onClose, onSubmit }: FooterPromptProps) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Import Data</ModalHeader>
        <ModalCloseButton />
        <Textarea ref={ref} placeholder="Paste data here..." rows={7} />

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={() => onSubmit(ref.current?.value ?? "")}>
            Submit
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FooterPrompt;
