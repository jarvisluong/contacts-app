import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ContactList from "../screens/ContactList";
import SingleContact from "../screens/SingleContact";
import { RootStackNavigation, ROUTES } from "./routes";

const Stack = createNativeStackNavigator<RootStackNavigation>();

export default function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.contacts}
        options={{ title: "Contacts" }}
        component={ContactList}
      />
      <Stack.Screen<typeof ROUTES.contactDetail>
        name={ROUTES.contactDetail}
        options={({ route }) => ({ title: route.params.title })}
        initialParams={{ id: "", title: "" }}
        component={SingleContact}
      />
    </Stack.Navigator>
  );
}
