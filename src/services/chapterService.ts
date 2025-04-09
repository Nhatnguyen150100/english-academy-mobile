import axiosRequest from "@src/network/axiosRequest";
import { IChapter } from "../types/chapter.types";
import { IBaseResponse } from "../types/response.types";

class ChapterService {
  private _prefixURL = "/v1/chapter";

  public async getChapterDetail(
    chapterId: string
  ): Promise<IBaseResponse<IChapter>> {
    try {
      const rs = await axiosRequest.get(`${this._prefixURL}/detail/${chapterId}`);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default ChapterService;
