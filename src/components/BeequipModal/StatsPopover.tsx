import { Button, Heading, HStack, Text, Tooltip, VStack } from "@chakra-ui/react";
import { getStatColor } from "../../services/format";

export const formatStat = (stat: string, index: number) => (
  <Text key={index} color={getStatColor(stat)}>
    {stat}
  </Text>
);

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
                <HStack key={index}>
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
