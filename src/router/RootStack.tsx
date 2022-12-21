import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ContactList from "../screens/ContactList";
import { ROUTES } from "./routes";

const Stack = createNativeStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.contacts}
        options={{ title: "Contacts" }}
        component={ContactList}
      />
    </Stack.Navigator>
  );
}
