import React, { useLayoutEffect, useState } from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";
import { authService } from "@src/services";
import EditInfoAppBar from "../profile/edit-info/_components/EditInfoAppBar";
import { RootStackParams } from "@utils/Routes";

function ChangePasswordScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false
  });

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSave = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      Toast.show({
        type: "error",
        text1: "New passwords do not match",
      });
      return;
    }

    try {
      const rs = await authService.changePassword({
        oldPassword: passwords.oldPassword,
        newPassword: passwords.newPassword,
      });

      Toast.show({
        type: "success",
        text1: rs.message ?? "Password changed successfully",
      });
      navigation.goBack();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: error.response?.data?.message || "Failed to change password",
      });
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <EditInfoAppBar onSave={handleSave} title="Change password" />
      ),
    });
  }, [navigation, passwords]);

  const handleInputChange = (field: keyof typeof passwords, value: string) => {
    setPasswords((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.root}>
        <View style={styles.container}>
          <TextInput
            label="Old Password"
            secureTextEntry={!showPasswords.old}
            value={passwords.oldPassword}
            onChangeText={(text) => handleInputChange("oldPassword", text)}
            style={styles.input}
            autoCapitalize="none"
            right={
              <TextInput.Icon
                icon={showPasswords.old ? "eye-off" : "eye"}
                onPress={() => togglePasswordVisibility("old")}
              />
            }
          />
          <TextInput
            label="New Password"
            secureTextEntry={!showPasswords.new}
            value={passwords.newPassword}
            onChangeText={(text) => handleInputChange("newPassword", text)}
            style={styles.input}
            autoCapitalize="none"
            right={
              <TextInput.Icon
                icon={showPasswords.new ? "eye-off" : "eye"}
                onPress={() => togglePasswordVisibility("new")}
              />
            }
          />
          <TextInput
            label="Confirm New Password"
            secureTextEntry={!showPasswords.confirm}
            value={passwords.confirmPassword}
            onChangeText={(text) => handleInputChange("confirmPassword", text)}
            style={styles.input}
            autoCapitalize="none"
            right={
              <TextInput.Icon
                icon={showPasswords.confirm ? "eye-off" : "eye"}
                onPress={() => togglePasswordVisibility("confirm")}
              />
            }
          />
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
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 16,
  },
  container: {
    width: "100%",
    maxWidth: 600,
  },
  input: {
    width: "100%",
    marginBottom: 16,
    backgroundColor: "transparent",
  },
});

export default ChangePasswordScreen;
