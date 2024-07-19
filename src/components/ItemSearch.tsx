import { Grid, GridItem, Heading, HStack, Image, VStack } from "@chakra-ui/react";
import ItemTile, { Item } from "./ItemTile";

interface ItemSearchProps {
  icon: string;
  items: Item[];
  title: string;
}

const ItemSearch = ({ icon, items, title }: ItemSearchProps) => {
  return (
    <VStack alignItems="left" backgroundColor="rgba(0, 0, 0, 0.1)" borderRadius={5} p={3}>
      <HStack>
        <Heading color="white" size="lg" textShadow={"1px 1px 2px black"}>
          {title}
        </Heading>
        <Image src={icon} alt="Sticker" />
      </HStack>
      <Grid templateColumns="repeat(10, 1fr)" borderRadius={5} gap={4}>
        {items.map((item) => (
          <GridItem key={item.name}>
            <ItemTile item={item} />
          </GridItem>
        ))}
      </Grid>
    </VStack>
  );
};

export default ItemSearch;
