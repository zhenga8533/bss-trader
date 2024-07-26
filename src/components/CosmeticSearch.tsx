import { Box, Grid, GridItem, Heading, HStack, Image, Input, Spinner, VStack } from "@chakra-ui/react";
import React, { Suspense, useState } from "react";
import cosmetics from "../data/cosmetics.json";
import { isTermIncluded } from "../services/find";
import { capitalize } from "../services/format";
const CosmeticTile = React.lazy(() => import("./CosmeticTile"));

interface CosmeticSearchProps {
  icon: string;
  type: string;
  stack: { [name: string]: number };
  addCosmetic: (name: string) => void;
}

const CosmeticSearch = ({ icon, type, stack, addCosmetic }: CosmeticSearchProps) => {
  // @ts-ignore
  const category = cosmetics[type];
  const keys = Object.keys(category);
  const [filtered, setFiltered] = useState(keys);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let term = event.target.value;
    setSearchTerm(term);
    if (!term.trim()) {
      setFiltered(keys);
    } else {
      term = term.toLowerCase();
      const filter = keys.filter((key) => key.toLowerCase().includes(term) || isTermIncluded(category[key], term));
      setFiltered(filter);
    }
  };

  return (
    <VStack alignItems="left" backgroundColor="rgba(0, 0, 0, 0.1)" borderRadius={5} p={3}>
      <HStack>
        <Heading className="heading" size="lg">
          {capitalize(type)}s
        </Heading>
        <Image src={icon} alt={type} />
      </HStack>
      <Input
        _placeholder={{ color: "gray.400" }}
        placeholder={`Search for ${type}s...`}
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
        <Grid
          templateColumns="repeat(auto-fill, minmax(90px, 1fr))"
          borderRadius={5}
          columnGap={3}
          rowGap={5}
          className="custom-scroll"
          maxH="60vh"
          overflow="auto"
        >
          {filtered.map((name) => (
            <GridItem key={name}>
              <CosmeticTile name={name} quantity={stack[name] ?? 0} onClick={addCosmetic} />
            </GridItem>
          ))}
        </Grid>
      </Suspense>
    </VStack>
  );
};

export default CosmeticSearch;
