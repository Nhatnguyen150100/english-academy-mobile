import React, { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { Text, ProgressBar, useTheme } from "react-native-paper";
import TheLayout from "@components/layout/TheLayOut";
import TheBaseHeader from "@components/layout/TheBaseHeader";
import { missionDailyService } from "@src/services";
import { IMissionDaily, MissionTaskType } from "@src/types/missionDaily.types";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function MissionDaily() {
  const theme = useTheme();
  const [mission, setMission] = useState<IMissionDaily | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchMissionDaily = async () => {
    try {
      setLoading(true);
      const response = await missionDailyService.getMissionDaily();
      setMission(response.data);
    } catch (error) {
      console.error("Fetch mission error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskAction = async (taskType: MissionTaskType) => {
    if (!mission || mission[taskType].completed) return;

    try {
      await missionDailyService.completeTask(taskType);
      fetchMissionDaily(); // Refresh data after action
    } catch (error) {
      console.error("Task action error:", error);
    }
  };

  useEffect(() => {
    fetchMissionDaily();
  }, []);

  if (loading) {
    return (
      <TheLayout header={<TheBaseHeader title="Daily Missions" isShowBackBtn />}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      </TheLayout>
    );
  }

  return (
    <TheLayout header={<TheBaseHeader title="Daily Missions" isShowBackBtn />}>
      <View style={styles.container}>
        {/* Check-in Task */}
        <MissionTaskCard
          theme={theme}
          title="Daily Check-in"
          icon="calendar-check"
          progress={mission?.checkIn.progress || 0}
          currentStreak={mission?.checkIn.currentStreak || 0}
          longestStreak={mission?.checkIn.longestStreak || 0}
          completed={mission?.checkIn.completed || false}
          onPress={() => handleTaskAction('checkIn')}
        />

        {/* Test Task */}
        <MissionTaskCard
          theme={theme}
          title="Daily Test"
          icon="clipboard-text"
          progress={mission?.test.progress || 0}
          currentStreak={mission?.test.currentStreak || 0}
          longestStreak={mission?.test.longestStreak || 0}
          completed={mission?.test.completed || false}
          onPress={() => handleTaskAction('test')}
        />

        {/* Combined Rewards Section */}
        <RewardsSection 
          theme={theme}
          checkInReward={mission?.checkIn.reward || 0}
          testReward={mission?.test.reward || 0}
        />
      </View>
    </TheLayout>
  );
}

// Reusable Mission Task Component
const MissionTaskCard = ({
  theme,
  title,
  icon,
  progress,
  currentStreak,
  longestStreak,
  completed,
  onPress,
}: {
  theme: ReactNativePaper.Theme;
  title: string;
  icon: string;
  progress: number;
  currentStreak: number;
  longestStreak: number;
  completed: boolean;
  onPress: () => void;
}) => (
  <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
    <View style={styles.cardHeader}>
      <Icon name={icon} size={24} color={theme.colors.primary} />
      <Text variant="titleMedium" style={[styles.cardTitle, { color: theme.colors.primary }]}>
        {title}
      </Text>
    </View>

    <ProgressBar
      progress={progress}
      color={theme.colors.primary}
      style={styles.progressContainer}
    />

    {/* <View style={styles.streakContainer}>
      <View style={styles.streakItem}>
        <Text variant="bodyMedium" style={styles.streakLabel}>Current Streak</Text>
        <Text variant="headlineMedium" style={styles.streakValue}>{currentStreak}</Text>
      </View>
      
      <View style={styles.separator} />
      
      <View style={styles.streakItem}>
        <Text variant="bodyMedium" style={styles.streakLabel}>Longest Streak</Text>
        <Text variant="headlineMedium" style={styles.streakValue}>{longestStreak}</Text>
      </View>
    </View> */}

    <TouchableOpacity
      style={[
        styles.actionButton,
        { 
          backgroundColor: completed ? theme.colors.disabled : theme.colors.primary,
          opacity: completed ? 0.6 : 1,
        }
      ]}
      onPress={onPress}
      disabled={completed}
    >
      <Text variant="labelLarge" style={styles.buttonText}>
        {completed ? 'Completed' : 'Start Now'}
      </Text>
      {!completed && <Icon name="chevron-right" size={20} color="white" />}
    </TouchableOpacity>
  </View>
);

// Reusable Rewards Component
const RewardsSection = ({ theme, checkInReward, testReward }: { 
  theme: ReactNativePaper.Theme;
  checkInReward: number;
  testReward: number;
}) => (
  <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
    <Text variant="titleMedium" style={styles.sectionTitle}>Today's Rewards</Text>
    
    <View style={styles.rewardsContainer}>
      <RewardItem icon="coin" value={checkInReward} label="Check-in Reward" />
      <RewardItem icon="star" value={testReward} label="Test Reward" />
    </View>
  </View>
);

const RewardItem = ({ icon, value, label }: { 
  icon: string;
  value: number;
  label: string;
}) => (
  <View style={styles.rewardItem}>
    <Icon name={icon} size={28} color="#FFD700" />
    <Text variant="bodyLarge" style={styles.rewardValue}>+{value}</Text>
    <Text variant="bodySmall" style={styles.rewardLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  cardTitle: {
    marginLeft: 12,
    fontWeight: "600",
  },
  progressContainer: {
    height: 8,
    borderRadius: 4,
    marginVertical: 12,
  },
  streakContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  streakItem: {
    alignItems: "center",
    flex: 1,
  },
  streakLabel: {
    color: "#666",
    marginBottom: 4,
  },
  streakValue: {
    fontWeight: "700",
  },
  separator: {
    width: 1,
    backgroundColor: "#EEE",
    marginHorizontal: 16,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    marginRight: 8,
  },
  sectionTitle: {
    fontWeight: "600",
    marginBottom: 16,
  },
  rewardsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  rewardItem: {
    alignItems: "center",
    padding: 12,
  },
  rewardValue: {
    fontWeight: '700',
    marginTop: 4,
  },
  rewardLabel: {
    color: '#666',
    fontSize: 12,
  },
});

export default MissionDaily;