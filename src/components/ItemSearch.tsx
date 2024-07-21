import { Grid, GridItem, Heading, HStack, Image, Input, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ItemTile, { Item } from "./ItemTile";

interface ItemSearchProps {
  icon: string;
  items: Item[];
  title: string;
  addItem: (item: Item) => void;
}

const ItemSearch = ({ icon, items, title, addItem }: ItemSearchProps) => {
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
        placeholder={`Search for ${title}...`}
        value={searchTerm}
        onChange={handleSearchChange}
        size="md"
      />
      <Grid templateColumns="repeat(auto-fill, minmax(90px, 1fr))" borderRadius={5} gap={4}>
        {filteredItems.map((item) => (
          <GridItem key={item.name}>
            <ItemTile item={item} onClick={addItem} />
          </GridItem>
        ))}
      </Grid>
    </VStack>
  );
};

export default ItemSearch;
