import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as React from "react";
import { View, Text } from "react-native";
import { RootStackNavigation, ROUTES } from "../router/routes";

type Props = NativeStackScreenProps<
  RootStackNavigation,
  typeof ROUTES.contactDetail
>;

export default function SingleContact({ route }: Props) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>{route.params.id}</Text>
    </View>
  );
}
