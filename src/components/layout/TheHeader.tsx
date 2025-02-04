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
import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Badge } from "react-native-paper";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

type Props = {};

export default function TheHeader({}: Props) {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const user = useSelector((state: IRootState) => state.AppReducer.user);
  const numberMissionDaily = useSelector(
    (state: IRootState) => state.AppReducer.numberMissionDaily
  );
  const [isShowDialog, setIsShowDialog] = useState(false);
  const dispatch = useDispatch();

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

  const getNumberMission = (missionDaily: IMissionDaily | null) => {
    if (!missionDaily) return 3;
    if (!(missionDaily.completedExam || missionDaily.loggedIn)) return 3;
    if (!missionDaily.completedExam || !missionDaily.loggedIn) return 2;
    if (missionDaily.completedExam && missionDaily.loggedIn) return 1;
    return 0;
  };

  const getMissionDaily = async () => {
    try {
      const rs = await missionDailyService.getMissionDaily();
      const numberMissionDailyFetch = getNumberMission(rs.data);
      dispatch(setNumberMissionDaily(numberMissionDailyFetch));
    } catch (error) {
      console.log("🚀 ~ getMissionDaily ~ error:", error);
    }
  };

  useEffect(() => {
    getMissionDaily();
  }, []);

  return (
    <View style={styles.appbar}>
      <View style={styles.decorator}></View>
      <View style={styles.appbarLeft}>
        <View style={styles.row}>
          <View style={styles.avatar}>
            <AntDesign name="user" size={24} color="white" />
          </View>
          <View style={styles.col}>
            <Text style={styles.appbarTitle}>{user?.name ?? user?.email}</Text>
            <Text style={styles.subTitle}>{user?._id}</Text>
          </View>
        </View>
      </View>
      <View style={styles.appbarRight}>
        <Ionicons name="today-outline" size={24} color="white" />
        {numberMissionDaily && <Badge style={styles.badge}>{numberMissionDaily}</Badge>}
        {/* <AntDesign
          name="logout"
          size={24}
          color="white"
          onPress={() => {
            setIsShowDialog(true);
          }}
        /> */}
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
  avatar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderColor: "white",
    borderWidth: 1,
    width: 40,
    height: 40,
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
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  badge: {
    position: "absolute",
    right: -8,
    top: -8,
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
