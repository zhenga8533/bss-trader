import { Button, Grid, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader } from "@chakra-ui/react";
import { useState } from "react";
import npcs from "../data/npcs.json";
import QuestGiver from "./QuestGiver";

interface NPCS {
  [npc: string]: {
    image_url: string;
  };
}

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
        <ModalHeader className="heading" fontWeight="bold">
          {giver} Quest Stickers
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody mt={1}>
          <Grid templateColumns="repeat(auto-fill, minmax(90px, 1fr))" columnGap={3} rowGap={1} mb={4}>
            {givers.map((giver) => (
              <Button
                className="button"
                key={giver}
                onClick={() => {
                  setGiver(giver);
                }}
              >
                <Image src={(npcs as NPCS)[giver]?.image_url} alt={giver} maxW="48px" />
              </Button>
            ))}
          </Grid>
          <QuestGiver key={giver} quests={quests[giver]} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default QuestModal;
