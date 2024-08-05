import {
  Box,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import React, { Suspense, useEffect, useState } from "react";
import beequip from "../../assets/beequip.webp";
import beequips from "../../data/beequips.json";
import { isTermIncluded } from "../../services/find";
import BeequipInput from "./BeequipInput";
import { BeequipData } from "./BeequipTile";
const BeequipTile = React.lazy(() => import("./BeequipTile"));

interface BeequipTileProps {
  isOpen: boolean;
  onClose: () => void;
  addBeequip: (data: BeequipData) => void;
}

const BeequipModal = ({ isOpen, onClose, addBeequip }: BeequipTileProps) => {
  const keys = Object.keys(beequips);
  const [filtered, setFiltered] = useState(keys);
  const [searchTerm, setSearchTerm] = useState("");

  const [selected, setSelected] = useState("");
  const [inputOpen, setInputOpen] = useState(false);

  useEffect(() => {
    setFiltered(keys);
    setSearchTerm("");
  }, [beequips]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let term = event.target.value;
    setSearchTerm(term);
    if (!term.trim()) {
      setFiltered(keys);
    } else {
      term = term.toLowerCase();
      // @ts-ignore
      const filter = keys.filter((key) => isTermIncluded(beequips[key], term));
      setFiltered(filter);
    }
  };

  const body = (
    <VStack alignItems="left" backgroundColor="rgba(0, 0, 0, 0.1)" borderRadius={5} p={3}>
      <Input
        _placeholder={{ color: "gray.300" }}
        placeholder="Search for beequips..."
        value={searchTerm}
        onChange={handleSearchChange}
        size="md"
      />
      <Suspense
        fallback={
          <Box alignItems="center" display="flex" justifyContent="center" height="40vh" width="100%">
            <Spinner size="xl" />
          </Box>
        }
      >
        <Grid templateColumns="repeat(auto-fill, minmax(90px, 1fr))" borderRadius={5} columnGap={3} rowGap={5}>
          {filtered.map((name) => (
            <GridItem key={name}>
              <BeequipTile
                name={name}
                onClick={() => {
                  setSelected(name);
                  setInputOpen(true);
                }}
                onContextMenu={() => {}}
              />
            </GridItem>
          ))}
        </Grid>
      </Suspense>
    </VStack>
  );

  return (
    <Modal isOpen={isOpen} onClose={() => onClose()} size="custom">
      <ModalContent bgColor="rgb(255, 255, 64)" borderRadius={5} color="black" maxW="60vw" minW="360px">
        <ModalCloseButton />
        <ModalHeader>
          <HStack>
            <Heading className="heading" size="lg">
              Beequips
            </Heading>
            <Image src={beequip} alt="Beequip" boxSize="36px" />
          </HStack>
        </ModalHeader>
        <ModalBody>
          <BeequipInput name={selected} isOpen={inputOpen} onClose={() => setInputOpen(false)} onEnter={addBeequip} />
          {body}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default BeequipModal;
