import React from "react";
import { View, Text, Pressable } from "react-native";

type Props = {
  displayLabel: string;
  onPress: () => void;
};

export default function ContactRow({ displayLabel, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        height: 50,
        width: "100%",
        padding: 10,
        justifyContent: "center",
      }}
    >
      <Text>{displayLabel}</Text>
    </Pressable>
  );
}
