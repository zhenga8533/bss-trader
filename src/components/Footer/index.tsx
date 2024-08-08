import { Button, HStack, VStack } from "@chakra-ui/react";
import { useState } from "react";
import summer2024 from "../../data/quests/summer2024.json";
import { getExport, getImport } from "../../services/data";
import { BeequipData } from "../BeequipModal/BeequipTile";
import FooterCopy from "./FooterCopy";
import FooterPrompt from "./FooterPrompt";
import QuestModal from "./QuestModal";
import SaveSlots from "./SaveSlots";

const FooterButtons = () => {
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

  const [exportOpen, setExportOpen] = useState(false);
  const [exportData, setExportData] = useState("");
  const [importOpen, setImportOpen] = useState(false);

  return (
    <VStack width="100%">
      <FooterCopy data={textData} isOpen={textOpen} showQR={false} onClose={() => setTextOpen(false)} />
      <FooterCopy data={exportData} isOpen={exportOpen} showQR={true} onClose={() => setExportOpen(false)} />
      <FooterPrompt
        isOpen={importOpen}
        onClose={() => setImportOpen(false)}
        onSubmit={(data: string) => {
          getImport(data);
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
      <SaveSlots />
    </VStack>
  );
};

export default FooterButtons;
