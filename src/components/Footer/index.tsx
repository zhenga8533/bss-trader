import { Button, HStack, useToast } from "@chakra-ui/react";
import LZString from "lz-string";
import { useState } from "react";
import summer2024 from "../../data/quests/summer2024.json";
import {
  exportBeequips,
  exportCategories,
  exportCosmetics,
  importBeequips,
  importCategories,
  importCosmetics,
} from "../../services/data";
import { BeequipData } from "../BeequipModal/BeequipTile";
import FooterCopy from "./FooterCopy";
import FooterPrompt from "./FooterPrompt";
import QuestModal from "./QuestModal";

const FooterButtons = () => {
  const toast = useToast();
  const [questsOpen, setQuestsOpen] = useState(false);

  const getTag = (id: string) => {
    // Offering
    let text = "";

    const categories = JSON.parse(localStorage.getItem(`${id}-categories`) ?? "{}");
    categories.forEach((category: string) => {
      text += ` ${category},`;
    });

    const cosmetics = JSON.parse(localStorage.getItem(`${id}-cosmetics`) ?? "{}");
    Object.keys(cosmetics).forEach((key) => {
      text += ` ${key},`;
    });

    const beequips = JSON.parse(localStorage.getItem(`${id}-beequips`) ?? "{}");
    beequips.forEach((key: BeequipData) => {
      text += ` ${key.name},`;
    });

    return text.slice(0, -1);
  };

  const getText = (id: string) => {
    // Offering
    let text = "";

    const categories = JSON.parse(localStorage.getItem(`${id}-categories`) ?? "{}");
    categories.forEach((category: string) => {
      text += `\n- *${category}*`;
    });

    const cosmetics = JSON.parse(localStorage.getItem(`${id}-cosmetics`) ?? "{}");
    Object.keys(cosmetics).forEach((key) => {
      text += `\n- ${key} x${cosmetics[key].quantity}`;
    });

    const beequips = JSON.parse(localStorage.getItem(`${id}-beequips`) ?? "{}");
    beequips.forEach((key: BeequipData) => {
      text += `\n- ${key.name} ${key.potential}★ [${key.waxes.length}/5 🝊]`;
      key.activeStats.forEach((stat) => {
        text += `\n  ⁍ ${stat}`;
      });
    });

    return text;
  };
  const [textOpen, setTextOpen] = useState(false);
  const [textData, setTextData] = useState("");

  const getExport = () => {
    const data = [
      exportCosmetics("offering"),
      exportCosmetics("looking-for"),
      exportBeequips("offering"),
      exportBeequips("looking-for"),
      exportCategories("offering"),
      exportCategories("looking-for"),
    ];

    const jsonString = JSON.stringify(data);
    return LZString.compressToBase64(jsonString);
  };
  const [exportOpen, setExportOpen] = useState(false);
  const [exportData, setExportData] = useState("");

  const importData = (data: string) => {
    try {
      const json = LZString.decompressFromBase64(data);
      const parsed = JSON.parse(json);
      localStorage.setItem("offering-cosmetics", JSON.stringify(importCosmetics(parsed[0])));
      localStorage.setItem("looking-for-cosmetics", JSON.stringify(importCosmetics(parsed[1])));
      localStorage.setItem("offering-beequips", JSON.stringify(importBeequips(parsed[2])));
      localStorage.setItem("looking-for-beequips", JSON.stringify(importBeequips(parsed[3])));
      localStorage.setItem("offering-categories", JSON.stringify(importCategories(parsed[4])));
      localStorage.setItem("looking-for-categories", JSON.stringify(importCategories(parsed[5])));
      window.dispatchEvent(new CustomEvent("update"));

      toast({
        title: "Trade data imported",
        status: "success",
        variant: "subtle",
        duration: 2000,
        isClosable: true,
      });
    } catch (e) {
      localStorage.clear();
      toast({
        title: "Invalid trade data",
        status: "error",
        variant: "subtle",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  const [importOpen, setImportOpen] = useState(false);

  return (
    <>
      <FooterCopy data={textData} isOpen={textOpen} showQR={false} onClose={() => setTextOpen(false)} />
      <FooterCopy data={exportData} isOpen={exportOpen} showQR={true} onClose={() => setExportOpen(false)} />
      <FooterPrompt
        isOpen={importOpen}
        onClose={() => setImportOpen(false)}
        onSubmit={(data: string) => {
          importData(data);
          setImportOpen(false);
        }}
      />
      <HStack justifyContent="space-between" w="100%">
        <HStack flexWrap="wrap">
          <QuestModal id="summer2024" quests={summer2024} isOpen={questsOpen} onClose={() => setQuestsOpen(false)} />
          <Button colorScheme="purple" variant="solid" onClick={() => setQuestsOpen(true)}>
            Beesmas 2024
          </Button>
        </HStack>

        <HStack flexWrap="wrap">
          <Button
            colorScheme="yellow"
            variant="solid"
            onClick={() => {
              setTextData(`Offering:${getTag("offering")}\n\nLooking for:${getTag("looking-for")}`);
              setTextOpen(true);
            }}
          >
            Tagify
          </Button>
          <Button
            colorScheme="green"
            variant="solid"
            onClick={() => {
              setTextData(`Offering:${getText("offering")}\n\nLooking for:${getText("looking-for")}`);
              setTextOpen(true);
            }}
          >
            Textify
          </Button>
          <Button
            colorScheme="blue"
            variant="solid"
            onClick={() => {
              setExportData(getExport());
              setExportOpen(true);
            }}
          >
            Export
          </Button>
          <Button colorScheme="red" variant="solid" onClick={() => setImportOpen(true)}>
            Import
          </Button>
        </HStack>
      </HStack>
    </>
  );
};

export default FooterButtons;
