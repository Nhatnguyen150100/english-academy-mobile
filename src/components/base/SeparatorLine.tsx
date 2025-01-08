import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SeparatorLine() {
  return (
    <View style={styles.separator}>
      <View style={styles.line} />
      <Text style={styles.separatorText}>or</Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  separator: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    width: "100%",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  separatorText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: "#888",
  },
});
