import { Button, HStack, Input, Modal, ModalBody, ModalContent, ModalHeader } from "@chakra-ui/react";
import { useRef } from "react";

interface CategoryInputProps {
  isOpen: boolean;
  onClose: () => void;
  onEnter: (category: string) => void;
}

const CategoryInput = ({ isOpen, onClose, onEnter }: CategoryInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent my={20}>
        <ModalHeader>Category Input</ModalHeader>
        <ModalBody>
          <Input
            ref={inputRef}
            placeholder="Enter a category"
            mb={3}
            onKeyDown={(e) => {
              if (e.key === "Enter" && inputRef.current) {
                onEnter(inputRef.current.value);
                onClose();
              }
            }}
          />
          <HStack>
            <Button
              colorScheme="blue"
              variant="solid"
              onClick={() => {
                if (inputRef.current) {
                  onEnter(inputRef.current.value);
                  onClose();
                }
              }}
            >
              Add
            </Button>
            <Button colorScheme="red" variant="solid" onClick={onClose}>
              Cancel
            </Button>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CategoryInput;
