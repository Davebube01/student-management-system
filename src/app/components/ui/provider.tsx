"use client"; // Mark this as a client component

import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import theme from "@/lib/theme"; // Import your custom Chakra UI theme

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </NextThemesProvider>
  );
}