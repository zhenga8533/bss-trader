import { Button, HStack, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useState } from "react";
import { FaSave, FaUpload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { clearData, loadData, saveData } from "../../services/data";

const fetchSave = (slot: number) => {
  return localStorage.getItem(`save-${slot}`);
};

const SaveSlots = () => {
  const [seed, setSeed] = useState(1);
  const reset = () => {
    setSeed(Math.random());
  };

  return (
    <HStack key={seed} mb={3}>
      {Array.from({ length: 5 }, (_, i) => (
        <Menu key={i}>
          <MenuButton as={Button} colorScheme="cyan" variant={fetchSave(i) ? "solid" : "outline"}>
            {i + 1}
          </MenuButton>
          <MenuList>
            <MenuItem
              color="blue"
              icon={<FaUpload />}
              onClick={() => {
                loadData(`save-${i}`);
                reset();
              }}
            >
              {fetchSave(i) ? "Load" : "Empty"}
            </MenuItem>
            <MenuItem
              color="green"
              icon={<FaSave />}
              onClick={() => {
                saveData(`save-${i}`);
                reset();
              }}
            >
              Save
            </MenuItem>
            <MenuItem
              color="red"
              icon={<MdDelete />}
              onClick={() => {
                clearData(`save-${i}`);
                reset();
              }}
            >
              Clear
            </MenuItem>
          </MenuList>
        </Menu>
      ))}
    </HStack>
  );
};

export default SaveSlots;
