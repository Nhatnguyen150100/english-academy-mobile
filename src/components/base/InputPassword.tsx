import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface IProps {
  value: string;
  placeholder?: string;
  onChangeText: (value: string) => void;
}

export default function InputPassword({
  value,
  placeholder,
  onChangeText,
}: IProps) {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  return (
    <View style={styles.passwordContainer}>
      <TextInput
        style={styles.passwordInput}
        placeholder={`${placeholder ?? "Password"}`}
        value={value}
        onChangeText={(_value: string) => {
          onChangeText(_value);
        }}
        secureTextEntry={!isShowPassword}
      />
      <TouchableOpacity
        onPress={() => setIsShowPassword((prev) => !prev)}
        style={styles.togglePassword}
      >
        <Icon
          name={isShowPassword ? "eye-off" : "eye"}
          size={20}
          color="#000"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  passwordInput: {
    height: 50,
    flex: 1,
    paddingHorizontal: 10,
  },
  togglePassword: {
    padding: 10,
  },
});
