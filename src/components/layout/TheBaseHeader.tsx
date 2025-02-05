import ConfirmDialog from "@components/base/ConfirmDialog";
import { AntDesign } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { removeStoreDataAsync } from "@helpers/storage";
import { StoreEnum } from "@helpers/storage/storeEnum";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { missionDailyService } from "@src/services";
import { IMissionDaily } from "@src/types/missionDaily.types";
import { IRootState } from "@store/index";
import { setNumberMissionDaily } from "@store/redux/appSlice";
import { LightTheme } from "@styles/theme";
import Routes, { RootStackParams } from "@utils/Routes";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Badge, IconButton } from "react-native-paper";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

interface IProps {
  title: string;
  isShowBackBtn?: boolean;
}

export default function TheBaseHeader({
  title,
  isShowBackBtn = false,
}: IProps) {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const user = useSelector((state: IRootState) => state.AppReducer.user);
  const numberMissionDaily = useSelector(
    (state: IRootState) => state.AppReducer.numberMissionDaily
  );
  const [isShowDialog, setIsShowDialog] = useState(false);
  const dispatch = useDispatch();

  // const handleLogOut = async () => {
  //   setIsShowDialog(false);
  //   await removeStoreDataAsync(StoreEnum.AccessToken);
  //   await removeStoreDataAsync(StoreEnum.User);
  //   await removeStoreDataAsync(StoreEnum.isStarted);
  //   navigation.reset({
  //     index: 0,
  //     routes: [{ name: Routes.Login }],
  //   });
  // };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.appbar}>
      <View style={styles.decorator}></View>
      {isShowBackBtn ? (
        <Ionicons
          name="arrow-back"
          size={24}
          color="white"
          onPress={handleBack}
        />
      ) : (
        <View></View>
      )}

      <Text style={styles.appbarTitle}>{title}</Text>

      <View></View>
      {/* <View style={styles.appbarRight}>
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
      </View> */}
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
    height: 80,
    width: "auto",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  appbarTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});
