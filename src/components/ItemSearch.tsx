import { Box, Grid, GridItem, Heading, HStack, Image, Input, Spinner, VStack } from "@chakra-ui/react";
import React, { Suspense, useEffect, useState } from "react";
import { Item } from "./ItemTile";
import { StackItem } from "./Stack";
const ItemTile = React.lazy(() => import("./ItemTile"));

interface ItemSearchProps {
  icon: string;
  items: Item[];
  title: string;
  addItem: (item: Item) => void;
  stackItems: { [key: string]: StackItem };
}

const ItemSearch = ({ icon, items, title, addItem, stackItems }: ItemSearchProps) => {
  const [filteredItems, setFilteredItems] = useState(items);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setFilteredItems(items);
    setSearchTerm("");
  }, [items]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let term = event.target.value;
    setSearchTerm(term);
    if (!term.trim()) {
      setFilteredItems(items);
    } else {
      term = term.toLowerCase();
      const filtered = items.filter(
        (item) =>
          item.name.toLowerCase().includes(term) ||
          item.description.toLowerCase().includes(term) ||
          item.where_from.toLowerCase().includes(term)
      );
      setFilteredItems(filtered);
    }
  };

  return (
    <VStack alignItems="left" backgroundColor="rgba(0, 0, 0, 0.1)" borderRadius={5} p={3}>
      <HStack>
        <Heading color="white" size="lg" textShadow={"1px 1px 2px black"}>
          {title}
        </Heading>
        <Image src={icon} alt={title} />
      </HStack>
      <Input
        _placeholder={{ color: "gray.400" }}
        placeholder={`Search for ${title.toLowerCase()}s...`}
        value={searchTerm}
        onChange={handleSearchChange}
        size="md"
      />
      <Suspense
        fallback={
          <Box alignItems="center" display="flex" justifyContent="center" height="40vh" width="100%">
            <Spinner size="xl" />
          </Box>
        }
      >
        <Grid templateColumns="repeat(auto-fill, minmax(90px, 1fr))" borderRadius={5} columnGap={3} rowGap={5}>
          {filteredItems.map((item) => (
            <GridItem key={item.name}>
              <ItemTile item={item} stackQuantity={stackItems[item.name]?.quantity ?? 0} onClick={addItem} />
            </GridItem>
          ))}
        </Grid>
      </Suspense>
    </VStack>
  );
};

export default ItemSearch;
