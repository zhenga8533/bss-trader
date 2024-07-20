import { Button, HStack, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader } from "@chakra-ui/react";
import { useEffect, useState } from "react";
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
  const cubSearch = <ItemSearch icon={cub} items={cubs} title="Cub" />;
  const stickerSearch = <ItemSearch icon={sticker} items={stickers} title="Sticker" />;
  const [category, setCategory] = useState("Sticker");
  const [search, setSearch] = useState(stickerSearch);

  useEffect(() => {
    if (category === "Cub") {
      setSearch(cubSearch);
    } else {
      setSearch(stickerSearch);
    }
  }, [category]);

  return (
    <Modal isOpen={isOpen} onClose={() => onClose()} size="custom">
      <ModalContent bgColor="rgb(255, 255, 64)" borderRadius={5} color="black" my={5} w="60vw">
        <ModalHeader fontSize="xx-large" fontWeight={500}>
          {category} Index
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody mt={-6}>
          <HStack mb={4}>
            <Button
              className="button"
              onClick={() => {
                setCategory("Cub");
              }}
            >
              <Image src={cub} alt="Cub" />
            </Button>
            <Button
              className="button"
              onClick={() => {
                setCategory("Sticker");
              }}
            >
              <Image src={sticker} alt="Sticker" />
            </Button>
          </HStack>
          {search}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ItemModal;
