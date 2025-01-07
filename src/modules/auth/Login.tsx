import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import { useDispatch } from "react-redux";
import { setUser } from "@store/redux/appSlice";
import Icon from "react-native-vector-icons/Ionicons";
import { ILogin } from "@src/types/auth.types";
import Toast from "react-native-toast-message";

export default function Login() {
  const dispatch = useDispatch();
  const [form, setForm] = useState<ILogin>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    Toast.show({
      type: 'success',
      text1: 'Hello',
      text2: 'This is some something 👋'
    });
  };

  const goHomePage = useCallback(() => {
    if(!(form.email && form.password)) {
      Toast.show({
        text1: "Please enter your email address and password"
      })
    }
  }, [form]);

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Hello',
      text2: 'This is some something 👋'
    });
  }

  return (
    <View style={styles.root}>
      <Image source={require('../../assets/images/english_icon.png')} style={styles.logo} />
      <Text style={styles.welcome}>Welcome to ENGLISH ACADEMY</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={form.email}
        onChangeText={(value: string) => {
          setForm({...form, email: value });
        }}
        autoCapitalize="none"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          value={form.password}
          onChangeText={(value: string) => {
            setForm({...form, password: value });
          }}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword((prev) => !prev)}
          style={styles.togglePassword}
        >
          <Icon
            name={showPassword ? "eye-off" : "eye"}
            size={20}
            color="#000"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.buttonStyle} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.separator}>
        <View style={styles.line} />
        <Text style={styles.separatorText}>or</Text>
        <View style={styles.line} />
      </View>
      <Button
      title='Show toast'
      onPress={showToast}
    />
      <TouchableOpacity style={styles.registerButton}>
        <Text style={styles.registerText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  welcome: {
    fontFamily: "Bold",
    textAlign: "center",
    fontSize: 25,
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
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
  buttonStyle: {
    marginTop: 32,
    width: "100%",
    height: 46,
    backgroundColor: "#007BFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
    marginBottom: 20,
  },
  separator: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
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
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  registerButton: {
    marginTop: 15,
  },
  registerText: {
    color: "#007BFF",
    textAlign: "center",
  },
});
