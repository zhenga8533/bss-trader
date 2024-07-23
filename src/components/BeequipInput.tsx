import { Heading, HStack, Modal, ModalCloseButton, ModalContent, ModalHeader } from "@chakra-ui/react";
import { Beequip } from "./BeequipTile";

interface BeequipInputProps {
  beequip: Beequip | null;
  isOpen: boolean;
  onClose: () => void;
  onEnter: (beequip: Beequip) => void;
}

const BeequipInput = ({ beequip, isOpen, onClose, onEnter }: BeequipInputProps) => {
  return (
    <Modal isOpen={isOpen} onClose={() => onClose()} size="custom">
      <ModalContent bgColor="rgb(64, 64, 255)" borderRadius={5} color="black" my={10} w="40vw">
        <ModalCloseButton />
        <ModalHeader>
          <HStack>
            <Heading color="white" size="lg" textShadow={"1px 1px 2px black"}>
              Beequips
            </Heading>
          </HStack>
        </ModalHeader>
      </ModalContent>
    </Modal>
  );
};

export default BeequipInput;
