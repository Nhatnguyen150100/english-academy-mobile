import ConfirmDialog from "@components/base/ConfirmDialog";
import { AntDesign } from "@expo/vector-icons";
import { removeStoreDataAsync } from "@helpers/storage";
import { StoreEnum } from "@helpers/storage/storeEnum";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { IRootState } from "@store/index";
import { LightTheme } from "@styles/theme";
import Routes, { RootStackParams } from "@utils/Routes";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

type Props = {};

export default function TheHeader({}: Props) {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const user = useSelector((state: IRootState) => state.AppReducer.user);
  const [isShowDialog, setIsShowDialog] = useState(false);

  const handleLogOut = async () => {
    setIsShowDialog(false);
    await removeStoreDataAsync(StoreEnum.AccessToken);
    await removeStoreDataAsync(StoreEnum.User);
    await removeStoreDataAsync(StoreEnum.isStarted);
    navigation.reset({
      index: 0,
      routes: [{ name: Routes.Login }],
    });
  };

  return (
    <View style={styles.appbar}>
      <View style={styles.decorator}></View>
      <View style={styles.appbarLeft}>
        <View style={styles.row}>
          <AntDesign name="user" size={24} color="white" />
          <View style={styles.col}>
            <Text style={styles.appbarTitle}>{user?.name ?? user?.email}</Text>
            <Text style={styles.subTitle}>{user?._id}</Text>
          </View>
        </View>
      </View>
      <View style={styles.appbarRight}>
        <AntDesign
          name="logout"
          size={24}
          color="white"
          onPress={() => {
            setIsShowDialog(true);
          }}
        />
        <ConfirmDialog
          showDialog={isShowDialog}
          content={"Do you want to log out?"}
          handleAccept={handleLogOut}
          handleReject={() => {
            setIsShowDialog(false);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },
  decorator: {
    height: 280,
    width: 280,
    position: "absolute",
    borderRadius: "50%",
    backgroundColor: "white",
    zIndex: 0,
    right: -150,
    top: -160,
    transform: [{ rotate: "45deg" }],
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    opacity: 0.2,
  },
  appbar: {
    backgroundColor: LightTheme.primary,
    paddingVertical: 24,
    paddingHorizontal: 20,
    width: "auto",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  appbarLeft: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  appbarTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
  },
  subTitle: {
    color: "white",
    fontSize: 12,
    marginLeft: 8,
  },
  appbarRight: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  col: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});
