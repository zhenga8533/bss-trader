import { Modal, ModalBody, ModalCloseButton, ModalContent } from "@chakra-ui/react";

interface QuestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuestModal = ({ isOpen, onClose }: QuestModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent bgColor="rgb(128, 32, 128)" borderRadius={5} color="black" maxW="60vw" minW="360px">
        <ModalCloseButton />
        <ModalBody mt={1}>E</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default QuestModal;
