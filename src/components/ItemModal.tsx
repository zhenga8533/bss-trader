import { Button, HStack, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader } from "@chakra-ui/react";
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
        <ModalBody mt={-6}>
          <HStack mb={6}>
            <Button className="button">
              <Image src={cub} alt="Cub" />
            </Button>
            <Button className="button">
              <Image src={sticker} alt="Sticker" />
            </Button>
          </HStack>
          <ItemSearch icon={cub} items={cubs} title="Cubs" />
          <ItemSearch icon={sticker} items={stickers} title="Stickers" />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ItemModal;
