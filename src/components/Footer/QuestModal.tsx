import {
  Box,
  Button,
  Grid,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
} from "@chakra-ui/react";
import { useState } from "react";
import npcs from "../../data/npcs.json";
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
  id: string;
  quests: { [npc: string]: Quests };
  isOpen: boolean;
  onClose: () => void;
}

const QuestModal = ({ id, quests, isOpen, onClose }: QuestModalProps) => {
  const givers = Object.keys(quests);
  const [giver, setGiver] = useState<string>(givers[0]);

  const [progress, setProgress] = useState<{ [key: string]: boolean[][] }>(() => {
    const saveData = localStorage.getItem(id + "-progress");
    if (saveData) return JSON.parse(saveData);

    const progress: { [key: string]: boolean[][] } = {};
    givers.forEach((key) => {
      const giver = quests[key];
      progress[key] = Object.keys(giver).map((quest) => Array(giver[quest].length).fill(false));
    });

    return progress;
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent bgColor="rgb(128, 32, 128)" borderRadius={5} color="black" maxW="60vw" minW="360px">
        <ModalHeader className="heading" fontSize="xx-large" fontWeight="bold">
          {giver} Quest Stickers
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody mt={1}>
          <Box alignItems="left" backgroundColor="rgba(0, 0, 0, 0.1)" borderRadius={5} p={3} mb={4}>
            <Grid templateColumns="repeat(auto-fill, minmax(90px, 1fr))" columnGap={3} rowGap={1}>
              {givers.map((giver) => {
                const complete = progress[giver].every((quest) => quest.every((sticker) => sticker));
                return (
                  <Button
                    key={giver}
                    className="button"
                    bgColor={complete ? "green.500" : ""}
                    onClick={() => {
                      setGiver(giver);
                    }}
                  >
                    <Image src={(npcs as NPCS)[giver]?.image_url} alt={giver} maxW="48px" />
                  </Button>
                );
              })}
            </Grid>
          </Box>
          <QuestGiver
            key={giver}
            quests={quests[giver]}
            progress={progress[giver]}
            setProgress={(row, col) => {
              setProgress((prevProgress) => {
                const newProgress = { ...prevProgress };
                newProgress[giver][row][col] = !newProgress[giver][row][col];
                localStorage.setItem(id + "-progress", JSON.stringify(newProgress));
                console.log(newProgress);
                return newProgress;
              });
            }}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default QuestModal;
