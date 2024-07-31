import { Box, Grid, Text, VStack } from "@chakra-ui/react";
import CosmeticTile from "./CosmeticTile";
import { Quests } from "./QuestModal";

interface QuestGiverProps {
  quests: Quests;
}

const QuestGiver = ({ quests }: QuestGiverProps) => {
  return (
    <VStack alignItems="left" backgroundColor="rgba(0, 0, 0, 0.1)" borderRadius={5} p={3}>
      {Object.entries(quests).map(([name, quest]) => {
        return (
          <VStack alignItems="left">
            <Text className="heading" fontWeight="bold">
              {name}
            </Text>
            <VStack alignItems="left">
              {quest.map((reqs) => (
                <Grid templateColumns="repeat(auto-fill, minmax(90px, 1fr))" columnGap={3} rowGap={1}>
                  {Object.entries(reqs).map(([sticker, quantity]) => (
                    <Box key={sticker} maxW="100px" position={"relative"}>
                      <CosmeticTile
                        name={sticker}
                        data={{ color: 0, quantity: quantity || 0 }}
                        onClick={() => {}}
                        onContextMenu={() => {}}
                      />
                      <Box
                        backgroundColor="rgba(0, 0, 0, 0.5)"
                        borderRadius={5}
                        color="white"
                        position="absolute"
                        p={0.5}
                        right={-1}
                        bottom={-2}
                      >
                        x{quantity}
                      </Box>
                    </Box>
                  ))}
                </Grid>
              ))}
            </VStack>
          </VStack>
        );
      })}
    </VStack>
  );
};

export default QuestGiver;
