import React from "react";
import NetworkInfoContainer from "./NetworkInfoContainer";
import AppLoadingProvider from "./AppLoadingProvider";
import "./Localization";
import Notification from "./Notification";
import ThemeProvider from "./ThemeProvider";
import ThemeListener from "./ThemeListener";
import { PaperProvider } from 'react-native-paper';
type Props = {
  children: React.ReactNode;
};

/**
 * Providers for `global` transactions.
 * The `CustomProvider` is used to `monitor` and take action at every moment of the application.
 */
function CustomProvider({ children }: Props) {
  return (
    <AppLoadingProvider>
      <NetworkInfoContainer>
        <ThemeProvider>
          <PaperProvider>
            <Notification />

            {children}
          </PaperProvider>

          <ThemeListener />
        </ThemeProvider>
      </NetworkInfoContainer>
    </AppLoadingProvider>
  );
}

export default CustomProvider;
