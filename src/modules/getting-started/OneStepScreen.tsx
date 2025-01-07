import { StackNavigationProp } from "@react-navigation/stack";
import Routes from "@utils/Routes";
import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";

type IProps = {
  navigation: StackNavigationProp<any, any>;
};
export default function OneStepScreen({ navigation }: IProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Step 1: Understanding the Basics</Text>
      <Button title="Next" onPress={() => navigation.navigate(Routes.TwoStepScreen)} />
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
