import axiosRequest from "@src/network/axiosRequest";
import { IMyRank, IRank } from "@src/types/rank.types";
import { IBaseResponse } from "@src/types/response.types";
import onRemoveParams from "@utils/functions/on-remove-params";

class RankService {
  private _prefixURL = "/v1/rank";

  public async getAllRank(
    parameters?: Record<string, any>
  ): Promise<IBaseResponse<IRank[]>> {
    try {
      const rs = await axiosRequest.get(this._prefixURL, {
        params: onRemoveParams(parameters || {}),
      });
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async getMyRank(): Promise<IBaseResponse<IMyRank>> {
    try {
      const rs = await axiosRequest.get(`${this._prefixURL}/my-rank`);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default RankService;
