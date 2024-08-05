import { Divider, Grid, Text, VStack } from "@chakra-ui/react";
import { Fragment } from "react/jsx-runtime";
import CosmeticTile from "../CosmeticModal/CosmeticTile";
import { Quests } from "./QuestModal";

interface QuestGiverProps {
  quests: Quests;
  progress: boolean[][];
  setProgress: (row: number, col: number) => void;
}

const QuestGiver = ({ quests, progress, setProgress }: QuestGiverProps) => {
  return (
    <VStack alignItems="left" backgroundColor="rgba(0, 0, 0, 0.1)" borderRadius={5} p={3} spacing={10}>
      {Object.entries(quests).map(([name, quest], row) => {
        return (
          <VStack alignItems="left" key={name}>
            <Text className="heading" fontWeight="bold">
              {name}
            </Text>
            <VStack alignItems="left">
              {quest.map((reqs, col) => (
                <Fragment key={col}>
                  <Divider />
                  <Grid templateColumns="repeat(auto-fill, minmax(90px, 1fr))" columnGap={3} rowGap={1}>
                    {Object.entries(reqs).map(([sticker, quantity]) => (
                      <CosmeticTile
                        key={sticker}
                        name={sticker}
                        data={{ color: progress[row][col] ? 7 : 0, quantity: quantity || 0 }}
                        showQuantity={true}
                        onClick={() => setProgress(row, col)}
                        onContextMenu={() => {}}
                      />
                    ))}
                  </Grid>
                </Fragment>
              ))}
            </VStack>
          </VStack>
        );
      })}
    </VStack>
  );
};

export default QuestGiver;
