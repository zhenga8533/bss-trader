import { Button, Center, HStack, useToast } from "@chakra-ui/react";
import { useState } from "react";
import FooterCopy from "./FooterCopy";
import FooterPrompt from "./FooterPrompt";

const FooterButtons = () => {
  const toast = useToast();

  const getText = () => {
    // Offering
    const offeringCosmetics = JSON.parse(localStorage.getItem("offering-cosmetics") ?? "{}");

    let offering = "Offering:";
    Object.keys(offeringCosmetics).forEach((key) => {
      offering += `\n- ${key} x${offeringCosmetics[key]}`;
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

    return JSON.stringify(data, null, 2);
  };
  const [exportOpen, setExportOpen] = useState(false);
  const [exportData, setExportData] = useState("");

  const importData = (data: string) => {
    try {
      console.log(data);
      const parsedData = JSON.parse(data);
      localStorage.setItem("offering-cosmetics", JSON.stringify(parsedData.offering));
      localStorage.setItem("looking-for-cosmetics", JSON.stringify(parsedData.lookingFor));

      const event = new CustomEvent("update");
      window.dispatchEvent(event);

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
      <FooterCopy data={textData} isOpen={textOpen} onClose={() => setTextOpen(false)} />
      <FooterCopy data={exportData} isOpen={exportOpen} onClose={() => setExportOpen(false)} />
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
