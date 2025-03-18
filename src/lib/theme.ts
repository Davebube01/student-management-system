// lib/theme.ts
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      500: "#3182CE", // Example brand color
    },
  },
  fonts: {
    body: "Inter, sans-serif",
    heading: "Inter, sans-serif",
  },
  config: {
    initialColorMode: "system", // Use system color mode by default
    useSystemColorMode: true,
  },
});

export default theme;