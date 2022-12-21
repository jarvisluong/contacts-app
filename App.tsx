import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./src/router/RootStack";
import { ContactProvider } from "./src/state/useContactState";

export default function App() {
  return (
    <NavigationContainer>
      <ContactProvider>
        <RootStack />
      </ContactProvider>
    </NavigationContainer>
  );
}
