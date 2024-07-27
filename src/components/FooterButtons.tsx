import { Button, Center, HStack, useToast } from "@chakra-ui/react";
import LZString from "lz-string";
import { useState } from "react";
import { BeequipData } from "./BeequipTile";
import FooterCopy from "./FooterCopy";
import FooterPrompt from "./FooterPrompt";

const FooterButtons = () => {
  const toast = useToast();

  const getText = (id: string) => {
    // Offering
    let text = "";

    const categories = JSON.parse(localStorage.getItem(`${id}-categories`) ?? "{}");
    categories.forEach((category: string) => {
      text += `\n- *${category}*`;
    });

    const cosmetics = JSON.parse(localStorage.getItem(`${id}-cosmetics`) ?? "{}");
    Object.keys(cosmetics).forEach((key) => {
      text += `\n- ${key} x${cosmetics[key]}`;
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
    const data = {
      ofCosmetics: JSON.parse(localStorage.getItem("offering-cosmetics") ?? "{}"),
      lfCosmetics: JSON.parse(localStorage.getItem("looking-for-cosmetics") ?? "{}"),
      ofBeequips: JSON.parse(localStorage.getItem("offering-beequips") ?? "[]"),
      lfBeequips: JSON.parse(localStorage.getItem("looking-for-beequips") ?? "[]"),
      ofCategories: JSON.parse(localStorage.getItem("offering-categories") ?? "[]"),
      lfCategories: JSON.parse(localStorage.getItem("looking-for-categories") ?? "[]"),
    };
    const jsonString = JSON.stringify(data);
    return LZString.compressToBase64(jsonString);
  };
  const [exportOpen, setExportOpen] = useState(false);
  const [exportData, setExportData] = useState("");

  const importData = (data: string) => {
    try {
      try {
        const json = LZString.decompressFromBase64(data);
        const parsed = JSON.parse(json);
        localStorage.setItem("offering-cosmetics", JSON.stringify(parsed.ofCosmetics));
        localStorage.setItem("looking-for-cosmetics", JSON.stringify(parsed.lfCosmetics));
        localStorage.setItem("offering-beequips", JSON.stringify(parsed.ofBeequips));
        localStorage.setItem("looking-for-beequips", JSON.stringify(parsed.lfBeequips));
        localStorage.setItem("offering-categories", JSON.stringify(parsed.ofCategories));
        localStorage.setItem("looking-for-categories", JSON.stringify(parsed.lfCategories));
      } catch (e) {
        console.error(e);
        localStorage.clear();
      }
      window.dispatchEvent(new CustomEvent("update"));

      toast({
        title: "Trade data imported",
        status: "success",
        variant: "subtle",
        duration: 2000,
        isClosable: true,
      });
    } catch (e) {
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
    <Center>
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
      <HStack flexWrap="wrap" justifyContent="center">
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
    </Center>
  );
};

export default FooterButtons;
