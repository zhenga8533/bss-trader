import { HStack, Switch, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface ToggleProps {
  id: string;
  title: string;
  onSet: (value: boolean) => void;
}

const Toggle = ({ id, title, onSet }: ToggleProps) => {
  const [toggle, setToggle] = useState(localStorage.getItem(id) !== "false");
  useEffect(() => {
    localStorage.setItem(id, toggle.toString());
  }, [toggle]);

  return (
    <HStack>
      <Text fontSize="xl">{title}</Text>
      <Switch
        size="lg"
        defaultChecked={toggle}
        onChange={() => {
          onSet(!toggle);
          setToggle(!toggle);
        }}
      />
    </HStack>
  );
};

export default Toggle;
