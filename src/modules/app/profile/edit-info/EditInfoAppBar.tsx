import React from "react";
import { StyleSheet, Text } from "react-native";
import { Appbar } from "react-native-paper";
import { LightTheme } from "@styles/theme";

const EditInfoAppBar = () => {
  const _goBack = () => console.log("Went back");

  const _handleSearch = () => console.log("Searching");

  const _handleMore = () => console.log("Shown more");

  return (
    <Appbar.Header mode="center-aligned">
      <Appbar.BackAction onPress={_goBack} />
      <Appbar.Content title="Edit information"/>
      <Appbar.Action style={{width: 60}} icon={() => <Text style={styles.title}>Save</Text>} onPress={_handleSearch} />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  // appBar: {
  //   backgroundColor: "#6200ea",
  // },
  // titleContainer: {
  //   flex: 1,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  title: {
    width: 80,
    color: LightTheme.primary,
    fontWeight: 600,
    fontSize: 18,
  },
});

export default EditInfoAppBar;
