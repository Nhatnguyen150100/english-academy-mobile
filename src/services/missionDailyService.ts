
import axiosRequest from '@src/network/axiosRequest';
import { IMissionDaily } from '@src/types/missionDaily.types';
import { IBaseResponse } from '@src/types/response.types';

class MissionDailyService {
  private _prefixURL = '/v1/mission-daily';

  public async getMissionDaily(): Promise<IBaseResponse<IMissionDaily | null>> {
    try {
      const rs = await axiosRequest.get(this._prefixURL);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async createMissionDaily(): Promise<IBaseResponse<undefined>> {
    try {
      const rs = await axiosRequest.post(this._prefixURL);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default MissionDailyService;
