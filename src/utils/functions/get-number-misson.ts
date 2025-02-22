import { IMissionDaily } from "@src/types/missionDaily.types";

const getNumberMission = (missionDaily: IMissionDaily | null) => {
  if (!missionDaily) return 3;
  if(missionDaily.isConfirmed) return 0;
  if (!(missionDaily.completedExam || missionDaily.loggedIn)) return 3;
  if (!missionDaily.completedExam || !missionDaily.loggedIn) return 2;
  if (missionDaily.completedExam && missionDaily.loggedIn) return 1;
  return 0;
};

export default getNumberMission;
