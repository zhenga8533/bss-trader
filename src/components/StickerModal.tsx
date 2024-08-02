import {
  Button,
  Center,
  Grid,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import eggs from "../data/eggs.json";

interface StickerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const StickerModal = ({ isOpen, onClose }: StickerModalProps) => {
  const [sticker, setSticker] = useState(null);
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
              <Button>
                <Image src={data.image_url} alt={egg} />
              </Button>
            ))}
          </Grid>
          <Center bgColor="rgba(0, 0, 0, 0.2)" borderRadius={5} my={3} w="100%">
            {spinning ? <Spinner size="xl" /> : sticker}
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default StickerModal;
