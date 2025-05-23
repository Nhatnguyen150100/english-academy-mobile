import { useEffect } from "react";
import { Platform } from "react-native";
import * as Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useDispatch } from "react-redux";
import { setExpoToken } from "@store/redux/appSlice";
import Toast from "react-native-toast-message";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Notification: React.FC<any> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener((notification) => {
      if (notification.request.content.title && notification.request.content.body) {
        alert(`Title: ${notification.request.content.title}, Body: ${notification.request.content.body}`);
      }
    });

    registerForPushNotificationsAsync().then((token) =>
      dispatch(setExpoToken(token))
    );

    return () => {
      Notifications.removeNotificationSubscription(subscription);
    };
  }, []);

  return <></>;
};
export default Notification;

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: Constants.default.easConfig?.projectId, // You can get your projectId from app.config.ts file. It is located in the extra.eas.projectId field. If you don't have it, you can get it from the link in the comment above.
      })
    ).data;
    console.log(token);
  } else {
    Toast.show({
      text1: "Must use physical device for Push Notifications",
      type: "error",
    })
  }

  return token;
}
