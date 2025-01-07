import { StackNavigationProp } from "@react-navigation/stack";
import { INavigatorProps } from "@src/types/navigator.types";
import Routes from "@utils/Routes";
import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";

export default function TwoStepScreen({ navigation }: INavigatorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Step 2: Getting Started</Text>
      <Button
        title="Next"
        onPress={() => navigation.navigate(Routes.ThreeStepScreen)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
