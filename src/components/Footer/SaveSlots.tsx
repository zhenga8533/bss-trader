import { Button, HStack, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { FaSave, FaUpload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const fetchSave = (slot: number) => {
  return localStorage.getItem(`save-${slot}`);
};

const SaveSlots = () => {
  return (
    <HStack mb={3}>
      {Array.from({ length: 5 }, (_, i) => (
        <Menu key={i}>
          <MenuButton as={Button}>{i + 1}</MenuButton>
          <MenuList>
            <MenuItem color="blue" icon={<FaUpload />}>
              {fetchSave(i) ? "Load" : "Empty..."}
            </MenuItem>
            <MenuItem color="green" icon={<FaSave />}>
              Save
            </MenuItem>
            <MenuItem color="red" icon={<MdDelete />}>
              Clear
            </MenuItem>
          </MenuList>
        </Menu>
      ))}
    </HStack>
  );
};

export default SaveSlots;
