import { loggedOut } from "@store/redux/appSlice";
import Store from "@store/index";
import axios, { AxiosResponse } from "axios";
import Toast from "react-native-toast-message";
import { getStoreStringAsync } from "@helpers/storage";
import { StoreEnum } from "@helpers/storage/storeEnum";

const apiUrl = process.env.EXPO_PUBLIC_BASE_URL;

const options = {
  baseURL: apiUrl,
  withCredentials: false,
};

const axiosRequest = axios.create(options);

axiosRequest.defaults.headers.put["Content-Type"] = "application/json";

const getAccessToken = async () => {
  return await getStoreStringAsync(StoreEnum.AccessToken);
};

const onFulFillResponse = (
  value: AxiosResponse<any, any>
): AxiosResponse<any, any> | Promise<AxiosResponse<any, any>> => {
  return value;
};

const onRejectResponse = (error: any) => {
  const { status, data } = error.response;

  if (status === 401 || status === 403) {
    axiosRequest.defaults.headers.common["Authorization"] = "";
    Toast.show({
      text1: "Unauthorized",
      type: "error",
    });

    Store.dispatch(loggedOut());
  }
  
  if (!error.response || error.response.status >= 500) {
    return Promise.reject(error);
  }

  if (status === 400) {
    Toast.show({
      text1: data.message,
      type: "error",
    });
  }

  return Promise.reject(error);
};

axiosRequest.interceptors.request.use(async (config) => {
  const fullUrl = `${config.baseURL}${config.url}`;
  console.log(fullUrl, `Method: ${config.method}`, `Payload: ${config.data}`);
  
  const accessToken = await getAccessToken();
  
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return config;
});

axiosRequest.interceptors.response.use(onFulFillResponse, onRejectResponse);

export default axiosRequest;