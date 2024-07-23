import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  components: {
    Button: {
      baseStyle: {
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        borderRadius: "5px",
        padding: "3px",
        position: "relative",
        outline: "none",
        transition: "transform 0.2s ease-in-out",
        _hover: {
          transform: "scale(1.1)",
        },
        _active: {
          transform: "scale(0.9)",
        },
        _focus: {
          outline: "none",
        },
      },
      defaultProps: {
        variant: "outline",
      },
      Modal: {
        sizes: {
          custom: {
            content: {
              w: "60vw",
              h: "auto",
            },
          },
        },
      },
    },
  },
});

export default theme;
