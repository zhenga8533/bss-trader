import { Button, Heading, HStack, Text, Tooltip, VStack } from "@chakra-ui/react";
import { formatStat } from "./BeequipTile";

interface StatsPopoverProps {
  stats: string[];
}

const StatsPopover = ({ stats }: StatsPopoverProps) => {
  return (
    <Tooltip
      className="box"
      hasArrow
      placement="right"
      label={
        <>
          <Heading size="sm" mb={1}>
            Stats
          </Heading>
          <VStack alignItems="left">
            {stats.map((stat, index) => {
              return (
                <HStack>
                  <Text color="white">● </Text>
                  {formatStat(stat, index)}
                </HStack>
              );
            })}
          </VStack>
        </>
      }
    >
      <Button colorScheme="gray" variant="solid">
        Stats
      </Button>
    </Tooltip>
  );
};

export default StatsPopover;
