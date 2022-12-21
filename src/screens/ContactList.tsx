import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Contacts from "expo-contacts";
import * as React from "react";
import { Button, View, Text } from "react-native";
import { RootStackNavigation } from "../router/routes";

type Props = NativeStackScreenProps<RootStackNavigation>;

export default function ContactList({ navigation }: Props) {
  const [contactPermissionResponse, setContactPermissionResponse] =
    React.useState<Contacts.PermissionStatus>();

  React.useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      setContactPermissionResponse(status);
    })();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {contactPermissionResponse === Contacts.PermissionStatus.DENIED && (
        <Text>The app does not have access to the phone contacts</Text>
      )}
      {contactPermissionResponse === Contacts.PermissionStatus.UNDETERMINED && (
        <Text>Awaiting the permission to access phone contacts</Text>
      )}
      {contactPermissionResponse === Contacts.PermissionStatus.GRANTED && (
        <>
          <Text>Home Screen</Text>
          <Button title="Go to Details" onPress={() => {}} />
        </>
      )}
    </View>
  );
}
