import {
  Heading,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  VStack,
} from "@chakra-ui/react";
import category from "../assets/category.webp";
import categories from "../data/categories.json";
import CategoryTile from "./CategoryTile";

interface CategoryModalProps {
  isOpen: boolean;
  stack: { [name: string]: number };
  addCategory: (name: string) => void;
  onClose: () => void;
}

const CategoryModal = ({ isOpen, onClose, addCategory }: CategoryModalProps) => {
  const body = (
    <VStack alignItems="left" backgroundColor="rgba(0, 0, 0, 0.1)" borderRadius={5} p={3}>
      <HStack flexWrap="wrap" spacing={3} justifyContent="center">
        {categories.map((category) => (
          <CategoryTile key={category} category={category} onClick={() => addCategory(category)} />
        ))}
      </HStack>
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
        <ModalBody mt={1}>{body}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CategoryModal;
