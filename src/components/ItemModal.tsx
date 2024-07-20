import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader } from "@chakra-ui/react";
import cub from "../assets/cub.webp";
import sticker from "../assets/sticker.webp";
import cubs from "../data/cubs.json";
import stickers from "../data/stickers.json";
import ItemSearch from "./ItemSearch";

interface ItemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ItemModal = ({ isOpen, onClose }: ItemModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={() => onClose()} size="full">
      <ModalContent bgColor="rgb(255, 255, 64)" borderRadius={5} color="black" my={5} w="60vw">
        <ModalHeader fontSize="xx-large" fontWeight={500}>
          Item Index
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ItemSearch icon={cub} items={cubs} title="Cubs" />
          <ItemSearch icon={sticker} items={stickers} title="Stickers" />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ItemModal;
