import React from "react";
import { useLocation } from "react-router-dom";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { AppLayout } from "./components";
import { Navigation } from "./navigation";
import { useTheme } from "./hooks";
// LandingPageNavigation,

function App() {
  const { colorScheme, toggleColorScheme } = useTheme();
  const { pathname } = useLocation();


  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          fontFamily: "Inter",
          colorScheme,
          breakpoints: {
            xs: '30em',
            sm: '48em',
            md: '64em',
            lg: '74em',
            xl: '90em',
          },
        }}
        withGlobalStyles
        withNormalizeCSS
        
        
      >
        <AppLayout>
          <Navigation />
        </AppLayout>
      </MantineProvider>
    </ColorSchemeProvider> 
  );
}

export default App;
