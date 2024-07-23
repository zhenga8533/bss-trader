import {
  Button,
  Divider,
  Heading,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import waxData from "../data/waxes.json";
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
      <ModalContent bgColor="rgb(64, 64, 255)" borderRadius={5} color="black" my={20} maxW="40vw" minW="420px">
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
          <VStack className="box" mb={3} p={2}>
            <HStack>
              {/* Waxes */}
              {Object.entries(waxData).map(([name, wax]) => (
                <Button key={name} colorScheme="blue" variant="solid" onClick={() => setWaxes([...waxes, name])}>
                  <Image src={wax} alt={name} boxSize="36px" />
                </Button>
              ))}
            </HStack>
            <Divider /> {/* Stats */}
            <Text className="heading">Add Stat</Text>
            <Input
              color="white"
              placeholder="Enter any stat..."
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter" && e.currentTarget.value) {
                  setStats([...stats, e.currentTarget.value]);
                  e.currentTarget.value = "";
                }
              }}
            />
            {stats.map((stat, index) => (
              <Button
                key={index}
                colorScheme=""
                variant="solid"
                onClick={() => setStats(stats.filter((_, i) => i !== index))}
              >
                {stat}
              </Button>
            ))}
            <Divider mt={1} /> {/* Potential */}
            <Text className="heading">Select Potential</Text>
            <NumberInput
              defaultValue={0}
              min={0}
              max={5}
              color="white"
              onChange={(value) => setPotential(Number(value))}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper color="white" />
                <NumberDecrementStepper color="white" />
              </NumberInputStepper>
            </NumberInput>
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
