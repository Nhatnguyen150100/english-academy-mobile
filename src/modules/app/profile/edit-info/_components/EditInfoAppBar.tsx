import React from "react";
import { StyleSheet, Text } from "react-native";
import { Appbar } from "react-native-paper";
import { LightTheme } from "@styles/theme";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "@utils/Routes";

interface IProps {
  onSave: () => void;
}

const EditInfoAppBar = ({ onSave }: IProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const _goBack = () => {
    navigation.goBack();
  };

  return (
    <Appbar.Header mode="center-aligned">
      <Appbar.BackAction onPress={_goBack} />
      <Appbar.Content title="Edit information" titleStyle={styles.title} />
      <Appbar.Action
        onPress={onSave}
        style={{ width: 60 }}
        icon={() => <Text style={styles.actionText}>Save</Text>}
      />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  actionText: {
    fontSize: 16,
    color: LightTheme.primary,
    width: 80,
  },
});

export default EditInfoAppBar;
