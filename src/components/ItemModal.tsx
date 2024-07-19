import {
  Box,
  Grid,
  GridItem,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  VStack,
} from "@chakra-ui/react";
import stickers from "../data/stickers.json";

interface ItemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ItemModal = ({ isOpen, onClose }: ItemModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={() => onClose()} size="full">
      <ModalContent bgColor="rgb(255, 255, 64)" borderRadius={5} color="black" mt={5} w="60vw">
        <ModalHeader fontSize="xx-large" fontWeight={500}>
          Item Index
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack backgroundColor="rgba(0, 0, 0, 0.1)" borderRadius={5}>
            <Heading size="md">Stickers</Heading>
            <Grid templateColumns="repeat(10, 1fr)" borderRadius={5} gap={4} marginX={3}>
              {stickers.map((sticker) => (
                <GridItem key={sticker.name}>
                  <Box backgroundColor="rgba(0, 0, 0, 0.2)" borderRadius={5}>
                    <Image src={sticker.image_url} alt={sticker.name} p={1} />
                  </Box>
                </GridItem>
              ))}
            </Grid>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ItemModal;
