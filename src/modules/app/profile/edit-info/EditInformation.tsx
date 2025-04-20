import React, { useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "@utils/Routes";
import EditInfoAppBar from "./_components/EditInfoAppBar";
import { useSelector } from "react-redux";
import { IRootState } from "@store/index";
import { IUserUpdate } from "@src/types/user.types";
import { TextInput, Button } from "react-native-paper"; // Import TextInput từ react-native-paper
import Toast from "react-native-toast-message";
import { authService } from "@src/services";
import { useDispatch } from "react-redux";
import { setUser } from "@store/redux/appSlice";

function EditInformation() {
  const user = useSelector((state: IRootState) => state.AppReducer.user);
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const [form, setForm] = useState<IUserUpdate>({
    name: user?.name || "",
    phoneNumber: user?.phone_number || "",
    address: user?.address || "",
  });

  const handleSave = async (data: Record<string, any>) => {
    if (!form.name) {
      Toast.show({
        type: "error",
        text1: "Please enter your name",
      });
      return;
    }
    try {
      const rs = await authService.updateUserInfo(data);
      dispatch(setUser(rs.data));
      Toast.show({
        type: "success",
        text1: rs.message,
      });
      navigation.goBack();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: error.message,
      });
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <EditInfoAppBar onSave={() => {handleSave(form)}} title="Edit information" />,
    });
  }, [navigation, form]);

  const handleInputChange = (field: keyof IUserUpdate, value: string) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.root}>
        <View style={styles.container}>
          <TextInput
            label="Name"
            value={form.name}
            onChangeText={(text) => handleInputChange("name", text)}
            style={styles.input}
          />
          <TextInput
            label="Phone Number"
            value={form.phoneNumber}
            onChangeText={(text) => handleInputChange("phoneNumber", text)}
            keyboardType="phone-pad"
            style={styles.input}
          />
          <TextInput
            label="Address"
            value={form.address}
            onChangeText={(text) => handleInputChange("address", text)}
            style={styles.input}
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
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  fontBlack: {
    fontFamily: "Black",
    marginTop: 20,
    fontSize: 20,
  },
  input: {
    width: "100%",
    marginBottom: 16,
    backgroundColor: "transparent",
  },
  saveButton: {
    marginTop: 20,
  },
});

export default EditInformation;
