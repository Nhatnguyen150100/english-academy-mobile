
import axiosRequest from '@src/network/axiosRequest';
import { ILogin, IResponseLogin, IResponseRegister } from '@src/types/auth.types';
import { IBaseResponse } from '@src/types/response.types';
import { IUser } from '@src/types/user.types';

class AuthService {
  private _prefixURL = '/v1/auth';

  public async login(data: ILogin): Promise<IBaseResponse<IResponseLogin>> {
    try {
      const rs = await axiosRequest.post(`${this._prefixURL}/login`, data);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  public async getInfo(): Promise<IBaseResponse<IUser>> {
    try {
      const rs = await axiosRequest.get(`${this._prefixURL}/me`);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async updateUserInfo(data: Record<string, any>): Promise<IBaseResponse<IUser>> {
    try {
      const rs = await axiosRequest.put(`${this._prefixURL}/update`, data);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async register(data: ILogin): Promise<IBaseResponse<IResponseRegister>> {
    try {
      const rs = await axiosRequest.post(`${this._prefixURL}/register`, data);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async getUserInfo(userId: string): Promise<IBaseResponse<IUser>> {
    try {
      const rs = await axiosRequest.get(`${this._prefixURL}/user-info/${userId}`);
      return Promise.resolve(rs.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default AuthService;
