import { Center, Grid, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import eggs from "../../data/eggs.json";
import printer from "../../data/printer.json";
import CosmeticTile from "../CosmeticModal/CosmeticTile";
import EggTile from "./EggTile";

interface Printer {
  [key: string]: { sticker: string; probability: number }[];
}

const randomizeSticker = (items: Printer[keyof Printer]) => {
  const total = items.reduce((acc, item) => acc + item.probability, 0);
  let random = Math.random() * total;
  for (const item of items) {
    random -= item.probability;
    if (random <= 0) {
      return item.sticker;
    }
  }
  return items[0].sticker;
};

interface StickerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const StickerModal = ({ isOpen, onClose }: StickerModalProps) => {
  const [sticker, setSticker] = useState<JSX.Element | null>(null);
  const [spinning, setSpinning] = useState(false);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Sticker Printer</ModalHeader>
        <ModalBody>
          <Grid
            templateColumns="repeat(auto-fill, minmax(90px, 1fr))"
            bgColor="rgba(0, 0, 0, 0.2)"
            borderRadius={5}
            columnGap={3}
            rowGap={5}
            className="custom-scroll"
            maxH="64vh"
            overflow="auto"
            p={6}
          >
            {Object.entries(eggs).map(([egg, data]) => (
              <EggTile
                key={egg}
                egg={egg}
                data={data}
                onClick={() => {
                  setSpinning(true);
                  setTimeout(() => {
                    const sticker = randomizeSticker((printer as Printer)[egg]);
                    setSticker(
                      <CosmeticTile
                        name={sticker}
                        data={{ color: 0, quantity: 1 }}
                        showQuantity={false}
                        onClick={() => {}}
                        onContextMenu={() => {}}
                      />
                    );
                    setSpinning(false);
                  }, 500);
                }}
              />
            ))}
          </Grid>
          <Center bgColor="rgba(0, 0, 0, 0.2)" borderRadius={5} my={3} py={1} w="100%">
            {spinning ? <Spinner size="xl" /> : sticker}
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default StickerModal;
