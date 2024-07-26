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
  Tooltip,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import beequips from "../data/beequips.json";
import waxData from "../data/waxes.json";
import { Beequip, BeequipData } from "./BeequipTile";
import StatsPopover from "./StatsPopover";
import WaxTile from "./WaxTile";

interface BeequipInputProps {
  name: string;
  isOpen: boolean;
  onClose: () => void;
  onEnter: (data: BeequipData) => void;
}

const BeequipInput = ({ name, isOpen, onClose, onEnter }: BeequipInputProps) => {
  // @ts-ignore
  const beequip = beequips[name] as Beequip;
  if (!beequip) return null;

  const [waxes, setWaxes] = useState<string[]>([]);
  const [stats, setStats] = useState<string[]>([]);
  const [potential, setPotential] = useState<number>(0);
  const toast = useToast();

  return (
    <Modal isOpen={isOpen} onClose={() => onClose()} size="custom">
      <ModalContent bgColor="rgb(64, 64, 255)" borderRadius={5} color="black" my={20} maxW="40vw" minW="420px">
        <ModalCloseButton />
        <ModalHeader>
          <HStack>
            <Heading className="heading" size="lg">
              {name}
            </Heading>
            <Image src={beequip.image_url} alt={name} boxSize="36px" />
          </HStack>
          <HStack>
            {waxes.map((wax, index) => (
              <Button
                key={index}
                colorScheme="cyan"
                mt={1}
                variant="solid"
                onClick={() => setWaxes(waxes.filter((_, i) => i !== index))}
              >
                <Image src={wax} alt={"wax"} boxSize="36px" />
              </Button>
            ))}
          </HStack>
        </ModalHeader>
        <ModalBody>
          <VStack className="box" mb={3} p={2}>
            <HStack>
              {/* Waxes */}
              {Object.entries(waxData).map(([name, wax]) => (
                <WaxTile
                  key={name}
                  name={name}
                  wax={wax}
                  onClick={() => {
                    if (waxes.length < 5) setWaxes([...waxes, wax.image_url]);
                    else
                      toast({
                        title: "The Wax didn't seem to help...",
                        description: "You can only apply up to 5 Waxes to a Beequip.",
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                        position: "top",
                        variant: "subtle",
                      });
                  }}
                />
              ))}
            </HStack>
            <Divider /> {/* Stats */}
            <StatsPopover stats={beequip.stats} />
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
            <Tooltip
              className="box"
              hasArrow
              placement="right"
              label={
                <>
                  <Heading size="sm" mb={1}>
                    Potential
                  </Heading>
                  <Text whiteSpace="pre-line">
                    {`Beequips have a potential that can range from 0-5 stars, but potential is measured in 10 points(including 0), since those stars can appear halved.
                      The higher the potential a beequip has, the higher chance the beequip having better base stats and stats increase when modified using Waxes.
                      The potential of a beequip cannot change.`}
                  </Text>
                </>
              }
            >
              <Button colorScheme="gray" variant="solid">
                Potential
              </Button>
            </Tooltip>
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
            <Button
              colorScheme="blue"
              variant="solid"
              onClick={() => {
                onEnter({
                  name: name,
                  activeStats: stats,
                  potential: potential,
                  waxes: waxes,
                });
                onClose();
              }}
            >
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
