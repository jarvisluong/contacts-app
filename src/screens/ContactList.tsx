import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as React from "react";
import { Button, View, Text } from "react-native";
import { RootStackNavigation } from "../router/routes";

type Props = NativeStackScreenProps<RootStackNavigation>;

export default function ContactList({ navigation }: Props) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button title="Go to Details" onPress={() => {}} />
    </View>
  );
}
