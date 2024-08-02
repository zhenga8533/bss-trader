import { Modal, ModalCloseButton, ModalContent, ModalHeader } from "@chakra-ui/react";

interface StickerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const StickerModal = ({ isOpen, onClose }: StickerModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Sticker Printer</ModalHeader>
      </ModalContent>
    </Modal>
  );
};

export default StickerModal;
