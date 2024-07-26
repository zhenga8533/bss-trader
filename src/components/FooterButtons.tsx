import { Button, Center, HStack, useToast } from "@chakra-ui/react";
import LZString from "lz-string";
import { useEffect, useState } from "react";
import { BeequipData } from "./BeequipTile";
import FooterCopy from "./FooterCopy";
import FooterPrompt from "./FooterPrompt";

const FooterButtons = () => {
  const toast = useToast();
  const update = new CustomEvent("update");

  // Import data from URL
  useEffect(() => {
    const url = new URL(window.location.href);
    const data = url.searchParams.get("data");
    if (data === null) return;

    try {
      const jsonString = LZString.decompressFromBase64(data);
      const parsedData = JSON.parse(jsonString);

      localStorage.setItem("offering-cosmetics", JSON.stringify(parsedData.offering));
      localStorage.setItem("looking-for-cosmetics", JSON.stringify(parsedData.lookingFor));
      window.dispatchEvent(update);
      url.searchParams.delete("data");
      window.history.replaceState({}, document.title, url.toString());
    } catch (e) {
      console.error(e);
    }
  }, []);

  const getText = () => {
    // Offering
    let offering = "Offering:";

    const offeringCosmetics = JSON.parse(localStorage.getItem("offering-cosmetics") ?? "{}");
    Object.keys(offeringCosmetics).forEach((key) => {
      offering += `\n- ${key} x${offeringCosmetics[key]}`;
    });

    const offeringBeequips = JSON.parse(localStorage.getItem("offering-beequips") ?? "{}");
    offeringBeequips.forEach((key: BeequipData) => {
      offering += `\n- ${key.name} ${key.potential}★ [${key.waxes.length}/5 🝊]`;
      key.activeStats.forEach((stat) => {
        offering += `\n  ⁍ ${stat}`;
      });
    });

    // Looking for
    const lfCosmetics = JSON.parse(localStorage.getItem("looking-for-cosmetics") ?? "{}");
    let lf = "Looking for:";

    Object.keys(lfCosmetics).forEach((key) => {
      lf += `\n- ${key} x${lfCosmetics[key]}`;
    });

    return `${offering}\n\n${lf}`;
  };
  const [textOpen, setTextOpen] = useState(false);
  const [textData, setTextData] = useState("");

  const getExport = () => {
    const data = {
      offering: JSON.parse(localStorage.getItem("offering-cosmetics") ?? "{}"),
      lookingFor: JSON.parse(localStorage.getItem("looking-for-cosmetics") ?? "{}"),
    };
    const jsonString = JSON.stringify(data);
    return LZString.compressToBase64(jsonString);
  };
  const [exportOpen, setExportOpen] = useState(false);
  const [exportData, setExportData] = useState("");

  const importData = (data: string) => {
    try {
      const jsonString = LZString.decompressFromBase64(data);
      const parsedData = JSON.parse(jsonString);
      localStorage.setItem("offering-cosmetics", JSON.stringify(parsedData.offering));
      localStorage.setItem("looking-for-cosmetics", JSON.stringify(parsedData.lookingFor));
      window.dispatchEvent(update);

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
      <HStack>
        <Button
          colorScheme="green"
          variant="solid"
          onClick={() => {
            setTextData(getText());
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
