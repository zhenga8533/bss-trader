import { HStack, Switch, Text, useColorMode } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const ThemeSwitch = () => {
  const { setColorMode } = useColorMode();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    setColorMode(theme);
    localStorage.setItem("theme", theme);
  }, [theme, setColorMode]);

  return (
    <HStack>
      <Text fontSize="xl">{theme === "light" ? "Light" : "Dark"}</Text>
      <Switch
        size="lg"
        defaultChecked={theme === "dark"}
        checked={theme === "dark"}
        onChange={() => {
          setTheme(theme === "light" ? "dark" : "light");
        }}
      />
    </HStack>
  );
};

export default ThemeSwitch;
