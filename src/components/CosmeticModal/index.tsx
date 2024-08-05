import { Button, HStack, Image, Modal, ModalBody, ModalCloseButton, ModalContent } from "@chakra-ui/react";
import { useState } from "react";
import cub from "../../assets/cub.webp";
import hive from "../../assets/hive.webp";
import sticker from "../../assets/sticker.webp";
import voucher from "../../assets/voucher.webp";
import CosmeticSearch from "./CosmeticSearch";
import { CosmeticData } from "./CosmeticTile";

interface CosmeticModalProps {
  isOpen: boolean;
  stack: { [name: string]: CosmeticData };
  addCosmetic: (name: string) => void;
  onClose: () => void;
}

const CosmeticModal = ({ isOpen, stack, onClose, addCosmetic }: CosmeticModalProps) => {
  const categories: { [key: string]: string } = {
    cub: cub,
    hive: hive,
    sticker: sticker,
    voucher: voucher,
  };
  const [category, setCategory] = useState("sticker");

  const getSearch = (key: string) => {
    const icon = categories[key];
    if (!icon) {
      return null;
    }

    return <CosmeticSearch key={key} icon={icon} type={key} stack={stack} addCosmetic={addCosmetic} />;
  };

  return (
    <Modal isOpen={isOpen} onClose={() => onClose()} size="custom">
      <ModalContent bgColor="rgb(255, 255, 64)" borderRadius={5} color="black" maxW="60vw" minW="360px">
        <ModalCloseButton />
        <ModalBody mt={1}>
          <HStack mb={4}>
            {Object.keys(categories).map((category) => (
              <Button
                className="button"
                key={category}
                onClick={() => {
                  setCategory(category);
                }}
              >
                <Image src={categories[category]} alt={category} />
              </Button>
            ))}
          </HStack>
          {getSearch(category)}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CosmeticModal;
