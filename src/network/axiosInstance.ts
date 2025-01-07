import { ToastColorEnum } from "@components/ToastMessage/ToastColorEnum";
import { showToast } from "@helpers/toast/showToast";
import { LoggedOut } from "@modules/app/redux/appSlice";
import Store from "@store/index";
import axios, { AxiosResponse } from "axios";

const accessToken = Store.getState().AppReducer.authToken;

const options = {
  baseURL: "baseURL",
  withCredentials: false,
};

const axiosInstance = axios.create(options);

axiosInstance.defaults.headers.put["Content-Type"] = "application/json";
axiosInstance.defaults.headers.common["Authorization"] = accessToken
  ? "Bearer " + accessToken
  : "";

const onFulFillResponse = (
  value: AxiosResponse<any, any>
): AxiosResponse<any, any> | Promise<AxiosResponse<any, any>> => {
  return value;
};

const onRejectResponse = (error: any) => {
  const { status } = error.response;

  if (status === 401 || status === 403) {
    axiosInstance.defaults.headers.common["Authorization"] = "";
    showToast("Unauthorized", ToastColorEnum.Error);

    Store.dispatch(LoggedOut());
  }
  if (!error.response || error.response.status >= 500) {
    return Promise.reject(error);
  }

  showToast("An error occurred ", ToastColorEnum.Error);

  return Promise.reject(error);
};

axiosInstance.interceptors.response.use(onFulFillResponse, onRejectResponse);
axiosInstance.interceptors.request.use((config) => {
  console.log(config.url, " - request -", config.data);
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

export default axiosInstance;
