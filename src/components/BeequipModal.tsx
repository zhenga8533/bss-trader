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
import beequip from "../assets/beequip.webp";
import beequips from "../data/beequips.json";
import { isTermIncluded } from "../services/format";
const BeequipTile = React.lazy(() => import("./BeequipTile"));

interface BeequipTileProps {
  isOpen: boolean;
  onClose: () => void;
  addBeequip: (beequip: any) => void;
}

const BeequipModal = ({ isOpen, onClose, addBeequip }: BeequipTileProps) => {
  const [filteredBeequips, setFilteredBeequips] = useState(beequips);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setFilteredBeequips(beequips);
    setSearchTerm("");
  }, [beequips]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let term = event.target.value;
    setSearchTerm(term);
    if (!term.trim()) {
      setFilteredBeequips(beequips);
    } else {
      term = term.toLowerCase();
      const filtered = beequips.filter((beequip) => isTermIncluded(beequip, term));
      setFilteredBeequips(filtered);
    }
  };

  const body = (
    <VStack alignItems="left" backgroundColor="rgba(0, 0, 0, 0.1)" borderRadius={5} p={3}>
      <Input
        _placeholder={{ color: "gray.400" }}
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
          {filteredBeequips.map((beequip) => (
            <GridItem key={beequip.name}>
              <BeequipTile beequip={beequip} onClick={addBeequip} />
            </GridItem>
          ))}
        </Grid>
      </Suspense>
    </VStack>
  );

  return (
    <Modal isOpen={isOpen} onClose={() => onClose()} size="custom">
      <ModalContent bgColor="rgb(255, 255, 64)" borderRadius={5} color="black" my={5} w="60vw">
        <ModalCloseButton />
        <ModalHeader>
          <HStack>
            <Heading color="white" size="lg" textShadow={"1px 1px 2px black"}>
              Beequips
            </Heading>
            <Image src={beequip} alt="Beequip" boxSize="36px" />
          </HStack>
        </ModalHeader>
        <ModalBody>{body}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default BeequipModal;
