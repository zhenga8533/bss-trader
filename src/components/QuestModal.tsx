import { Box, Button, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader } from "@chakra-ui/react";
import { useState } from "react";
import QuestGiver from "./QuestGiver";

export interface Quests {
  [quest: string]: {
    [sticker: string]: number | undefined;
  }[];
}

interface QuestModalProps {
  quests: { [npc: string]: Quests };
  isOpen: boolean;
  onClose: () => void;
}

const QuestModal = ({ quests, isOpen, onClose }: QuestModalProps) => {
  const givers = Object.keys(quests);
  const [giver, setGiver] = useState<string>(givers[0]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent bgColor="rgb(128, 32, 128)" borderRadius={5} color="black" maxW="60vw" minW="360px">
        <ModalHeader className="heading">{giver} Quest Stickers</ModalHeader>
        <ModalCloseButton />
        <ModalBody mt={1}>
          <Box className="custom-scroll" overflowX="auto" overflowY="hidden">
            <HStack spacing={4} minWidth="max-content" mb={3}>
              {givers.map((giver) => (
                <Button
                  key={giver}
                  minWidth="100px"
                  onClick={() => {
                    setGiver(giver);
                  }}
                >
                  {giver}
                </Button>
              ))}
            </HStack>
          </Box>
          <QuestGiver key={giver} quests={quests[giver]} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default QuestModal;
