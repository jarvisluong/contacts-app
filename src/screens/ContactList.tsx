import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Contacts from "expo-contacts";
import * as React from "react";
import { View, Text, FlatList } from "react-native";
import ContactRow from "../components/ContactRow";
import RowSeperator from "../components/RowSeperator";
import { RootStackNavigation, ROUTES } from "../router/routes";
import {
  useAddContactsAction,
  useFavoriteContact,
  useSortedContactsWithoutFavorite,
} from "../state/useContactState";

type Props = NativeStackScreenProps<
  RootStackNavigation,
  typeof ROUTES.contacts
>;

export default function ContactList({ navigation }: Props) {
  const [contactPermissionResponse, setContactPermissionResponse] =
    React.useState<Contacts.PermissionStatus>();

  const addContacts = useAddContactsAction();
  const contacts = useSortedContactsWithoutFavorite();
  const favoriteContact = useFavoriteContact();

  React.useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      setContactPermissionResponse(status);
    })();
  }, []);

  React.useEffect(() => {
    if (contactPermissionResponse === Contacts.PermissionStatus.GRANTED) {
      (async () => {
        const { data } = await Contacts.getContactsAsync({
          fields: [
            Contacts.Fields.Emails,
            Contacts.Fields.PhoneNumbers,
            Contacts.Fields.FirstName,
            Contacts.Fields.LastName,
            Contacts.Fields.Addresses,
            Contacts.Fields.Birthday,
          ],
          pageSize: 500,
        });
        addContacts(data);
      })();
    }
  }, [contactPermissionResponse, addContacts]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {contactPermissionResponse === Contacts.PermissionStatus.DENIED && (
        <Text>The app does not have access to the phone contacts</Text>
      )}
      {contactPermissionResponse === Contacts.PermissionStatus.UNDETERMINED && (
        <Text>Awaiting the permission to access phone contacts</Text>
      )}
      {contactPermissionResponse === Contacts.PermissionStatus.GRANTED && (
        <FlatList
          style={{ flex: 1, width: "100%" }}
          data={contacts}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={RowSeperator}
          getItemLayout={(data, index) => ({
            length: 50,
            offset: 50 * index,
            index,
          })}
          ListHeaderComponent={() => {
            if (!favoriteContact) return null;
            return (
              <>
                <ContactRow
                  displayLabel={`Favorite: ${favoriteContact.firstName ?? ""} ${
                    favoriteContact.lastName ?? ""
                  }`}
                  onPress={() => {
                    navigation.push(ROUTES.contactDetail, {
                      id: favoriteContact.id,
                      title: `${favoriteContact.firstName ?? ""} ${
                        favoriteContact.lastName ?? ""
                      }`,
                    });
                  }}
                />
                <RowSeperator />
              </>
            );
          }}
          renderItem={({ item }) => {
            const displayLabel = `${item.firstName ?? ""} ${
              item.lastName ?? ""
            }`;
            return (
              <ContactRow
                onPress={() => {
                  navigation.push(ROUTES.contactDetail, {
                    id: item.id,
                    title: displayLabel,
                  });
                }}
                displayLabel={displayLabel}
              />
            );
          }}
        />
      )}
    </View>
  );
}
