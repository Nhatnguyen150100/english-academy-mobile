import React from "react";
import { StyleSheet, Text, Pressable } from "react-native";
import { Appbar } from "react-native-paper";
import { LightTheme } from "@styles/theme";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "@utils/Routes";

interface IProps {
  title: string;
  onSave: () => void;
}

const EditInfoAppBar = ({ onSave, title }: IProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const _goBack = () => {
    navigation.goBack();
  };

  return (
    <Appbar.Header mode="center-aligned">
      <Appbar.BackAction onPress={_goBack} />
      <Appbar.Content title={title} titleStyle={styles.title} />
      
      <Pressable
        onPress={onSave}
        style={styles.saveButton}
        android_ripple={{ color: 'transparent' }}
      >
        <Text style={styles.actionText}>Save</Text>
      </Pressable>
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
  },
  saveButton: {
    paddingRight: 10,
    justifyContent: 'center',
    height: '100%',
  },
});

export default EditInfoAppBar;