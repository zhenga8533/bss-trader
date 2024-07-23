import {
  Button,
  HStack,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  VStack,
} from "@chakra-ui/react";
import { formatStat } from "./BeequipTile";

interface StatsPopoverProps {
  stats: string[];
}

const StatsPopover = ({ stats }: StatsPopoverProps) => {
  return (
    <Popover placement="right">
      <PopoverTrigger>
        <Button colorScheme="blue" variant="solid">
          Stats
        </Button>
      </PopoverTrigger>
      <PopoverContent bg="gray" width="25vw">
        <PopoverCloseButton />
        <PopoverHeader className="heading">Stats</PopoverHeader>
        <PopoverBody>
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
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default StatsPopover;
