import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Button, Card, ActivityIndicator } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { colors, LightTheme } from "@styles/theme";
import TheLayout from "@components/layout/TheLayOut";
import TheBaseHeader from "@components/layout/TheBaseHeader";
import Icon from "react-native-vector-icons/Ionicons";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { authService } from "@src/services";
import WebView from "react-native-webview";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { setUser } from "@store/redux/appSlice";
import { ScrollView } from "react-native-gesture-handler";

const DEFINE_PLANS = [
  {
    type: "MONTHLY",
    price: "99000",
    duration: "30 days",
    features: [
      "Unlimited practice tests",
      "Detailed explanations",
      "Progress tracking",
      "Priority support",
    ],
    icon: "calendar-month",
    color: colors.primary,
  },
  {
    type: "YEARLY",
    price: "990000",
    duration: "365 days",
    features: [
      "All monthly features",
      "2 free months",
      "Exclusive content",
      "Advanced analytics",
    ],
    icon: "calendar-star",
    color: colors.warning,
  },
];

export default function UpdatePlan() {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [selectedPlan, setSelectedPlan] = useState<string>("MONTHLY");
  const [isProcessing, setIsProcessing] = useState(false);
  const [webViewUrl, setWebViewUrl] = useState<string | null>(null);
  const dispatch = useDispatch();

  const handleSubscribe = async () => {
    setIsProcessing(true);
    try {
      const rs = await authService.requestToPremiumAccount({
        plan: selectedPlan,
      });
      setWebViewUrl(rs.data);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGetUserInfo = async () => {
    try {
      const rs = await authService.getInfo();
      dispatch(setUser(rs.data));
    } catch (error) {
      Toast.show({
        text1: "Get user info failed",
        type: "error",
      });
    }
  };

  const handleNavigationChange = (navState: any) => {
    const { url } = navState;

    if (url.includes("vnp_ResponseCode=00")) {
      Toast.show({
        text1: "Payment success",
        type: "success",
      });
      navigation.goBack();
      handleGetUserInfo();
    } else if (url.includes("vnp_ResponseCode=")) {
      Toast.show({
        text1: "Payment is cannel or failed",
        type: "error",
      });
      navigation.goBack();
    }
  };

  if (webViewUrl) {
    return (
      <WebView
      nestedScrollEnabled
        source={{ uri: webViewUrl }}
        onNavigationStateChange={handleNavigationChange}
        startInLoadingState
        scrollEnabled
        style={{ flex: 1 }}
        renderLoading={() => <ActivityIndicator size="small" />}
      />
    );
  }

  return (
    <TheLayout header={<TheBaseHeader title="Upgrade Plan" isShowBackBtn />}>
      <View style={styles.container}>
        <Animated.Text entering={FadeInUp.duration(500)} style={styles.title}>
          Choose Your Plan
        </Animated.Text>

        <View style={styles.plansContainer}>
          {DEFINE_PLANS?.map((plan, index) => (
            <Animated.View
              key={plan.type}
              entering={FadeInDown.duration(500).delay(index * 100)}
            >
              <TouchableOpacity
                onPress={() => setSelectedPlan(plan.type)}
                activeOpacity={0.9}
              >
                <Card style={[styles.planCard, { borderColor: plan.color }]}>
                  <Card.Content>
                    <View style={styles.cardHeader}>
                      <MaterialCommunityIcons
                        name={plan.icon as any}
                        size={32}
                        color={plan.color}
                      />
                      <View style={styles.priceContainer}>
                        <Text style={[styles.price, { color: plan.color }]}>
                          {Number(plan.price).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </Text>
                        <Text style={styles.duration}>/{plan.duration}</Text>
                      </View>
                      {selectedPlan === plan.type && (
                        <AntDesign
                          name="checkcircle"
                          size={24}
                          color={colors.success}
                          style={styles.checkIcon}
                        />
                      )}
                    </View>

                    <View style={styles.featuresList}>
                      {plan.features?.map((feature, featureIndex) => (
                        <View key={feature} style={styles.featureItem}>
                          <AntDesign
                            name="checkcircleo"
                            size={16}
                            color={plan.color}
                          />
                          <Text style={styles.featureText}>{feature}</Text>
                        </View>
                      ))}
                    </View>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        <Animated.View
          entering={FadeInUp.duration(500).delay(300)}
          style={styles.footer}
        >
          <Button
            mode="contained"
            loading={isProcessing}
            onPress={handleSubscribe}
            style={styles.subscribeButton}
            labelStyle={styles.buttonLabel}
            icon={({ size, color }) => (
              <Icon name="rocket-outline" size={size} color={color} />
            )}
          >
            {isProcessing ? "Processing..." : "Subscribe Now"}
          </Button>

          <View style={styles.noteContainer}>
            <Icon name="shield-checkmark" size={16} color={colors.success} />
            <Text style={styles.noteText}>
              Secure payment processing. Cancel anytime.
            </Text>
          </View>
        </Animated.View>
      </View>
    </TheLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: colors.primary,
  },
  plansContainer: {
    flex: 1,
    gap: 20,
  },
  planCard: {
    borderRadius: 20,
    borderWidth: 2,
    backgroundColor: "#fff",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    gap: 15,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 5,
  },
  duration: {
    fontSize: 16,
    color: "#666",
  },
  checkIcon: {
    marginLeft: "auto",
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  featureText: {
    fontSize: 14,
    color: "#444",
    flexShrink: 1,
  },
  footer: {
    paddingVertical: 20,
    gap: 15,
  },
  subscribeButton: {
    borderRadius: 12,
    paddingVertical: 8,
    backgroundColor: colors.primary,
  },
  buttonLabel: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  noteContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  noteText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
});
