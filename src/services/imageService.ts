
import axiosRequest from "@src/network/axiosRequest";
import { IBaseResponse } from "../types/response.types";

class ImagesService {
  private _prefixURL = "/v1/images";

  public async deleteImages(data: string[]): Promise<IBaseResponse<any>> {
    try {
      const rs = await axiosRequest.post(`${this._prefixURL}/delete-images`, {
        urls: data,
      });
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async uploadImage(data: any): Promise<IBaseResponse<string>> {
    try {
      const rs = await axiosRequest.post(
        `${this._prefixURL}/upload-image`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default ImagesService;
