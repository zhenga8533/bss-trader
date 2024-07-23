import {
  Button,
  Heading,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { Beequip } from "./BeequipTile";

interface BeequipInputProps {
  beequip: Beequip | null;
  isOpen: boolean;
  onClose: () => void;
  onEnter: (beequip: Beequip) => void;
}

const BeequipInput = ({ beequip, isOpen, onClose, onEnter }: BeequipInputProps) => {
  if (beequip === null) return null;

  const [waxes, setWaxes] = useState<string[]>([]);
  const [stats, setStats] = useState<string[]>([]);
  const [potential, setPotential] = useState<number>(0);

  return (
    <Modal isOpen={isOpen} onClose={() => onClose()} size="custom">
      <ModalContent bgColor="rgb(64, 64, 255)" borderRadius={5} color="black" my={20} w="40vw">
        <ModalCloseButton />
        <ModalHeader>
          <HStack>
            <Heading className="heading" size="lg">
              {beequip.name}
            </Heading>
            <Image src={beequip.image_url} alt={beequip.name} boxSize="36px" />
          </HStack>
        </ModalHeader>
        <ModalBody>
          <VStack className="box" mb={3}>
            <Text>Add Waxes</Text>
            <Text>Add Stat</Text>
            <Text>Select Potential</Text>
          </VStack>
          <HStack>
            <Button colorScheme="blue" variant="solid" onClick={() => onEnter(beequip)}>
              Add
            </Button>
            <Button colorScheme="red" variant="solid" onClick={() => onClose()}>
              Cancel
            </Button>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default BeequipInput;
