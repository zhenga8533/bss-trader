import { Button, HStack, Image, Modal, ModalBody, ModalCloseButton, ModalContent } from "@chakra-ui/react";
import { useState } from "react";
import cub from "../assets/cub.webp";
import hive from "../assets/hive.webp";
import sticker from "../assets/sticker.webp";
import voucher from "../assets/voucher.webp";
import cubs from "../data/cubs.json";
import hives from "../data/hives.json";
import stickers from "../data/stickers.json";
import vouchers from "../data/vouchers.json";
import ItemSearch from "./ItemSearch";
import { StackItem } from "./Stack";

interface ItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  addItem: (item: any) => void;
  stackItems: { [key: string]: StackItem };
}

const ItemModal = ({ isOpen, onClose, addItem, stackItems }: ItemModalProps) => {
  const categories: { [key: string]: { icon: string; items: any[] } } = {
    Cub: {
      icon: cub,
      items: cubs,
    },
    Hive: {
      icon: hive,
      items: hives,
    },
    Sticker: {
      icon: sticker,
      items: stickers,
    },
    Voucher: {
      icon: voucher,
      items: vouchers,
    },
  };
  const [category, setCategory] = useState("Sticker");

  const getSearch = (key: string) => {
    const category = categories[key];
    return (
      <ItemSearch icon={category.icon} items={category.items} addItem={addItem} stackItems={stackItems} title={key} />
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={() => onClose()} size="custom">
      <ModalContent bgColor="rgb(255, 255, 64)" borderRadius={5} color="black" my={5} w="60vw">
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
                <Image src={categories[category].icon} alt={category} />
              </Button>
            ))}
          </HStack>
          {getSearch(category)}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ItemModal;
