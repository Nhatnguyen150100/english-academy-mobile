import Achievements from "@components/Achievements";
import LoadingScreen from "@components/base/LoadingScreen";
import Visibility from "@components/base/visibility";
import { rankService } from "@src/services";
import { IMyRank } from "@src/types/rank.types";
import React, { useState } from "react";
import Toast from "react-native-toast-message";

export default function MyAchievements() {
  const [myRank, setMyRank] = useState<IMyRank>();

  const handleGetMyRank = async () => {
    try {
      const rs = await rankService.getMyRank();
      if (rs.data) {
        setMyRank(rs.data);
      }
    } catch (error) {
      Toast.show({
        text1: "Error fetching data",
        type: "error",
      });
    }
  };

  React.useEffect(() => {
    handleGetMyRank();
  }, []);

  return (
    <Visibility visibility={myRank} suspenseComponent={<LoadingScreen />}>
      <Achievements title="My Achievements" data={myRank!} />
    </Visibility>
  );
}
