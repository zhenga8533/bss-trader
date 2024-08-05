import {
  Heading,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import category from "../../assets/category.webp";
import categories from "../../data/categories.json";
import CategoryInput from "./CategoryInput";
import CategoryTile from "./CategoryTile";

interface CategoryModalProps {
  isOpen: boolean;
  addCategory: (name: string) => void;
  onClose: () => void;
}

const CategoryModal = ({ isOpen, onClose, addCategory }: CategoryModalProps) => {
  const [filtered, setFiltered] = useState(categories);
  const [searchTerm, setSearchTerm] = useState("");
  const [inputOpen, setInputOpen] = useState(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let term = event.target.value;
    setSearchTerm(term);
    if (!term.trim()) {
      setFiltered(categories);
    } else {
      term = term.toLowerCase();
      const filter = categories.filter((category) => category.toLowerCase().includes(term));
      setFiltered(filter);
    }
  };

  const body = (
    <VStack alignItems="left" backgroundColor="rgba(0, 0, 0, 0.1)" borderRadius={5} p={3}>
      <Input
        _placeholder={{ color: "gray.300" }}
        placeholder={`Search for categories...`}
        value={searchTerm}
        onChange={handleSearchChange}
        size="md"
      />
      <HStack flexWrap="wrap" spacing={3} justifyContent="center">
        {filtered.map((category) => (
          <CategoryTile key={category} category={category} onClick={() => addCategory(category)} />
        ))}
      </HStack>
      {"custom text".includes(searchTerm.toLowerCase()) && (
        <CategoryTile category="Custom Text" onClick={() => setInputOpen(true)} />
      )}
    </VStack>
  );

  return (
    <Modal isOpen={isOpen} onClose={() => onClose()} size="custom">
      <ModalContent bgColor="rgb(64, 255, 64)" borderRadius={5} color="black" maxW="60vw" minW="360px">
        <ModalCloseButton />
        <ModalHeader>
          <HStack>
            <Heading className="heading" size="lg">
              Categories
            </Heading>
            <Image src={category} alt="Beequip" boxSize="36px" />
          </HStack>
        </ModalHeader>
        <ModalBody mt={1}>
          <CategoryInput isOpen={inputOpen} onClose={() => setInputOpen(false)} onEnter={addCategory} />
          {body}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CategoryModal;
