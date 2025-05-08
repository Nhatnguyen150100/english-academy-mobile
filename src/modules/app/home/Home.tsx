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
import { removeStoreDataAsync } from "@helpers/storage";
import { StoreEnum } from "@helpers/storage/storeEnum";
import { setUser } from "@store/redux/appSlice";
import { FAB } from "react-native-paper";
import { colors } from "@styles/theme";
import { requestTrackingPermissionsAsync } from "expo-tracking-transparency";

import mobileAds, {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

function Home() {
  const [isAdLoaded, setIsAdLoaded] = React.useState<boolean>(false);
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
      await removeStoreDataAsync(StoreEnum.AccessToken);
      navigation.reset({
        index: 0,
        routes: [{ name: Routes.Login }],
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRequestAllowAd = async () => {
    // // Google AdMob will show any messages here that you just set up on the AdMob Privacy & Messaging page
    // const { status: trackingStatus } = await requestTrackingPermissionsAsync();
    // if (trackingStatus !== "granted") {
    //   // Do something here such as turn off Sentry tracking, store in context/redux to allow for personalized ads, etc.
    // }
    // // Initialize the ads
    // await mobileAds().initialize();
  };

  React.useEffect(() => {
    const init = async () => {
      await handleGetInfo();
      // await handleRequestAllowAd();
    };

    init();
  }, [dispatch]);

  React.useEffect(() => {}, []);

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
        <FAB
          icon="chat"
          color={colors.white}
          size="medium"
          style={{
            position: "absolute",
            right: 0,
            bottom: 20,
            backgroundColor: colors.primary,
            zIndex: 2,
          }}
          onPress={() => {
            navigation.navigate(Routes.ChatBot);
          }}
        />
      </View>

      {/* <View style={{ height: isAdLoaded ? "auto" : 0 }}>
        <BannerAd
          // It is extremely important to use test IDs as you can be banned/restricted by Google AdMob for inappropriately using real ad banners during testing
          unitId={
            __DEV__ ? TestIds.BANNER : "ca-app-pub-5232717859877283/3269206298"
          }
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
            // You can change this setting depending on whether you want to use the permissions tracking we set up in the initializing
          }}
          onAdLoaded={() => {
            setIsAdLoaded(true);
          }}
        />
      </View> */}
    </TheLayout>
  );
}

export default Home;
