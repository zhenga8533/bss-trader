import { Grid, GridItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader } from "@chakra-ui/react";
import beequips from "../data/beequips.json";
import BeequipTile from "./BeequipTile";

interface BeequipTileProps {
  isOpen: boolean;
  onClose: () => void;
  addItem: (item: any) => void;
}

const BeequipModal = ({ isOpen, onClose, addItem }: BeequipTileProps) => {
  return (
    <Modal isOpen={isOpen} onClose={() => onClose()} size="custom">
      <ModalContent bgColor="rgb(255, 255, 64)" borderRadius={5} color="black" my={5} w="60vw">
        <ModalCloseButton />
        <ModalHeader>Beequips</ModalHeader>
        <ModalBody>
          <Grid templateColumns="repeat(auto-fill, minmax(90px, 1fr))" borderRadius={5} columnGap={3} rowGap={5}>
            {beequips.map((beequip) => (
              <GridItem key={beequip.name}>
                <BeequipTile beequip={beequip} onClick={addItem} />
              </GridItem>
            ))}
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default BeequipModal;
