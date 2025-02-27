import React from "react";
import { View } from "react-native";
import TheLayout from "@components/layout/TheLayOut";
import Slider from "@components/base/Slider";
import TopRank from "./components/TopRank";
import MyAchievements from "./components/MyAchievements";
import LoadingScreen from "@components/base/LoadingScreen";
import { useDispatch } from "react-redux";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import Routes, { RootStackParams } from "@utils/Routes";
import { authService } from "@src/services";
import { getStoreStringAsync, removeStoreDataAsync } from "@helpers/storage";
import { StoreEnum } from "@helpers/storage/storeEnum";
import { setUser } from "@store/redux/appSlice";

function Home() {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  const handleGetInfo = async () => {
    try {
      const rs = await authService.getInfo();
      if (!rs.data) {
        await removeStoreDataAsync(StoreEnum.AccessToken);
      } else {
        dispatch(setUser(rs.data));
      }
    } catch {
      navigation.reset({
        index: 0,
        routes: [{ name: Routes.Login }],
      });
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const checkSignInStatus = async () => {
      const token = await getStoreStringAsync(StoreEnum.AccessToken);
      if (token) {
        await handleGetInfo();
      } else {
        setLoading(false);
      }
    };

    checkSignInStatus();
  }, [dispatch]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <TheLayout>
      <Slider />
      <View
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          width: "100%",
          paddingTop: 30,
        }}
      >
        <TopRank />
        <MyAchievements />
      </View>
    </TheLayout>
  );
}

export default Home;
