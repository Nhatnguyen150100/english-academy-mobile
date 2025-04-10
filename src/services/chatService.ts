import axiosRequest from "@src/network/axiosRequest";
import { IBaseResponse } from "../types/response.types";

class ChatService {
  private _prefixURL = "/v1/chat";

  public async chat(message: string): Promise<IBaseResponse<string>> {
    try {
      const rs = await axiosRequest.post(this._prefixURL, {
        message,
      });
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default ChatService;
