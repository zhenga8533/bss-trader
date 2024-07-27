import { Button, Text } from "@chakra-ui/react";

interface CategoryTileProps {
  category: string;
  onClick: () => void;
}

const CategoryTile = ({ category, onClick }: CategoryTileProps) => {
  return (
    <Button
      key={category}
      backgroundColor="rgba(0, 0, 0, 0.2)"
      borderRadius={5}
      onClick={onClick}
      whiteSpace="normal"
      textAlign="center"
      minW="120px"
      minH="60px"
      py="36px"
    >
      <Text color="white" fontSize="xx-large" fontWeight="800" lineHeight="1.2">
        {category}
      </Text>
    </Button>
  );
};

export default CategoryTile;
