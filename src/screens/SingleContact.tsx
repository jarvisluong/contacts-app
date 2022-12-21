import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as React from "react";
import { View, Text, Button } from "react-native";
import { RootStackNavigation, ROUTES } from "../router/routes";
import {
  useFavoriteContact,
  useSetFavoriteAction,
  useSingleContact,
} from "../state/useContactState";

type Props = NativeStackScreenProps<
  RootStackNavigation,
  typeof ROUTES.contactDetail
>;

export default function SingleContact({ route }: Props) {
  const contact = useSingleContact(route.params.id);
  const setFavorite = useSetFavoriteAction();
  const { id: favoriteContactId } = useFavoriteContact() ?? {};

  const isFavorited = favoriteContactId === route.params.id;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {isFavorited && <Text style={{ color: "green" }}>Favorite contact</Text>}
      <Text>
        Phone number:{" "}
        {contact.phoneNumbers
          .map((phoneNumber) => phoneNumber.number)
          .join(", ")}
      </Text>
      {!!contact.emails && (
        <Text>
          Email: {contact.emails.map((email) => email.email).join(",")}
        </Text>
      )}
      {!!contact.birthday && (
        <Text>
          Birthday: {contact.birthday.day}-{contact.birthday.month + 1}-
          {contact.birthday.year}
        </Text>
      )}
      {!!contact.addresses && (
        <Text>
          Addresses:{" "}
          {contact.addresses.map((address) => address.street).join(", ")}
        </Text>
      )}
      <Button
        title={isFavorited ? "Remove Favorite" : "Favorite"}
        onPress={() => {
          if (isFavorited) {
            setFavorite(undefined);
          } else {
            setFavorite(route.params.id);
          }
        }}
      />
    </View>
  );
}
