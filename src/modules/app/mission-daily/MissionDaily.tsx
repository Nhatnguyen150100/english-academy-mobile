import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Text, useTheme } from "react-native-paper";
import TheLayout from "@components/layout/TheLayOut";
import TheBaseHeader from "@components/layout/TheBaseHeader";
import { missionDailyService } from "@src/services";
import { IMissionDaily } from "@src/types/missionDaily.types";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import getNumberMission from "@utils/functions/get-number-misson";
import { useDispatch } from "react-redux";
import { setNumberMissionDaily } from "@store/redux/appSlice";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Routes, { RootStackParams } from "@utils/Routes";
import Toast from "react-native-toast-message";
import Fireworks from "@components/base/Fireworks";
import { useSelector } from "react-redux";
import { IRootState } from "@store/index";

type TaskRowProps = {
  title: string;
  icon: string;
  color: string;
  completed: boolean;
  onPress: () => void;
};

type RewardItemProps = {
  icon: string;
  value: number;
  label: string;
  color: string;
};

const MissionDaily: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const theme = useTheme();
  const [mission, setMission] = useState<IMissionDaily | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [pulseAnim] = useState<Animated.Value>(new Animated.Value(1));
  const [claimSuccess, setClaimSuccess] = useState<boolean>(false);
  const numberMissionDaily = useSelector(
    (state: IRootState) => state.AppReducer.numberMissionDaily
  );

  const dispatch = useDispatch();

  const fetchMissionDaily = useCallback(async () => {
    try {
      setLoading(true);
      const response = await missionDailyService.getMissionDaily();
      setMission(response.data);
      const numberMissionDailyFetch = getNumberMission(response.data);
      dispatch(setNumberMissionDaily(numberMissionDailyFetch));
    } catch (error) {
      console.error("Fetch mission error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const claimReward = async () => {
    if (!mission?._id) {
      Toast.show({
        type: "error",
        text1: "No mission to claim",
      });
      return;
    }
    try {
      setLoading(true);
      const rs = await missionDailyService.claimRewardMissionDaily(
        mission!._id
      );
      fetchMissionDaily();
      Toast.show({
        type: "success",
        text1: rs.message,
      });
      setClaimSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckInDaily = async () => {
    try {
      setLoading(true);
      await missionDailyService.createMissionDaily();
      fetchMissionDaily();
    } catch (error) {
      console.error("Fetch mission error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMissionDaily();
  }, []);

  const bothCompleted: boolean = Boolean(
    mission?.loggedIn && mission?.completedExam
  );

  useEffect(() => {
    if (bothCompleted && numberMissionDaily) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [bothCompleted, pulseAnim]);

  if (loading) {
    return (
      <TheLayout
        header={<TheBaseHeader title="Daily Missions" isShowBackBtn />}
      >
        <View style={styles.container}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      </TheLayout>
    );
  }

  return (
    <TheLayout header={<TheBaseHeader title="Daily Missions" isShowBackBtn />}>
      <View style={styles.container}>
        <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <TaskRow
            title="Daily Check-in"
            icon={mission?.loggedIn ? "check-circle" : "calendar-check"}
            color={mission?.loggedIn ? "#4CAF50" : theme.colors.primary}
            completed={mission?.loggedIn || false}
            onPress={handleCheckInDaily}
          />

          <View
            style={[styles.divider, { backgroundColor: theme.colors.backdrop }]}
          />

          <TaskRow
            title="Daily Test"
            icon={mission?.completedExam ? "check-circle" : "clipboard-text"}
            color={mission?.completedExam ? "#4CAF50" : theme.colors.primary}
            completed={mission?.completedExam || false}
            onPress={() => {
              navigation.navigate(Routes.Courses);
            }}
          />

          <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
            <LinearGradient
              colors={
                numberMissionDaily === 0 ? ["#82f394", "#28A745", "#218838"] : bothCompleted ? ["#FF9800", "#F44336"] : ["#E0E0E0", "#BDBDBD"]
              }
              style={styles.combinedButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <TouchableOpacity
                style={styles.combinedButtonContent}
                disabled={!bothCompleted || numberMissionDaily === 0}
                onPress={claimReward}
              >
                <Icon name="trophy" size={24} color="white" />
                <Text style={styles.combinedButtonText}>
                  {numberMissionDaily === 0
                    ? "Claim Daily success!"
                    : bothCompleted
                    ? "Claim Daily Reward!"
                    : "Complete Both Tasks"}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </Animated.View>
        </View>

        <RewardsSection
          checkInReward={mission?.loggedIn ? 5 : 0}
          testReward={mission?.completedExam ? 5 : 0}
          theme={theme}
        />
      </View>
      <Fireworks play={claimSuccess} />
    </TheLayout>
  );
};

const TaskRow: React.FC<TaskRowProps> = ({
  title,
  icon,
  color,
  completed,
  onPress,
}) => (
  <TouchableOpacity
    style={styles.taskRow}
    onPress={onPress}
    disabled={completed}
  >
    <Icon name={icon} size={32} color={color} />
    <Text style={[styles.taskTitle, { color }]}>{title}</Text>
    {!completed && (
      <Icon
        name="chevron-right-circle"
        size={24}
        color={color}
        style={styles.arrowIcon}
      />
    )}
  </TouchableOpacity>
);

const RewardsSection: React.FC<{
  checkInReward: number;
  testReward: number;
  theme: any;
}> = ({ checkInReward, testReward, theme }) => (
  <View>
    <Text variant="titleMedium" style={styles.sectionTitle}>
      Today's Rewards
    </Text>
    <View
      style={[
        styles.rewardsContainer,
        { backgroundColor: theme.colors.surface },
      ]}
    >
      <RewardItem
        icon="coin"
        value={checkInReward}
        label="Check-in Reward"
        color="#FFD700"
      />
      <RewardItem
        icon="star"
        value={testReward}
        label="Test Reward"
        color="#FF4081"
      />
    </View>
  </View>
);

const RewardItem: React.FC<RewardItemProps> = ({
  icon,
  value,
  label,
  color,
}) => (
  <View style={styles.rewardItem}>
    <Icon name={icon} size={32} color={color} />
    <Text style={[styles.rewardValue, { color }]}>+{value}</Text>
    <Text style={styles.rewardLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    width: "100%",
    paddingHorizontal: 16,
  },
  card: {
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  taskRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 16,
    flex: 1,
  },
  arrowIcon: {
    marginLeft: "auto",
  },
  divider: {
    height: 1,
    marginVertical: 8,
    opacity: 0.3,
  },
  combinedButton: {
    borderRadius: 12,
    marginTop: 16,
    overflow: "hidden",
  },
  combinedButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
  },
  combinedButtonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 16,
  },
  rewardsContainer: {
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-around",
    elevation: 2,
  },
  sectionTitle: {
    fontWeight: "600",
    marginBottom: 16,
  },
  rewardItem: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  rewardValue: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 4,
  },
  rewardLabel: {
    fontSize: 12,
    color: "#616161",
    marginTop: 4,
  },
});

export default MissionDaily;
