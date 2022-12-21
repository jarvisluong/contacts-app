import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ContactList from "../screens/ContactList";

const Stack = createNativeStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ContactList.screenName} component={ContactList} />
    </Stack.Navigator>
  );
}
