import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, StyleSheet, Button } from "react-native";

function Courses() {
  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.root}>
        <View style={styles.container}>
          <Text style={styles.fontBlack}>Courses</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },

  root: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },

  container: {
    justifyContent: "center",
    alignItems: "center",
  },

  fontBlack: {
    fontFamily: "Black",
    marginTop: 20,
    fontSize: 20,
  },
});

export default Courses;
