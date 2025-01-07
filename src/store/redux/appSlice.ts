import { IAppReducer } from "@store/types/IAppReducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IAppReducer = {};

export const appSlice = createSlice({
  name: "appReducer",
  initialState,
  reducers: {
    setAuthToken: (state, action: PayloadAction<any>) => {
      state = { ...state, authToken: action.payload };
      return state;
    },
    setUser: (state, action: PayloadAction<any>) => {
      state = { ...state, isSignedIn: true, user: action.payload };
      return state;
    },
    loggedOut: (state) => {
      state = { ...state, user: null, isSignedIn: false, authToken: "" };
      return state;
    },
    setColorScheme: (state, action: PayloadAction<any>) => {
      state = { ...state, userColorScheme: action.payload };
      return state;
    },
    setExpoToken: (state, action: PayloadAction<any>) => {
      state = { ...state, expoToken: action.payload };
      return state;
    },
  },
});

export const {
  setAuthToken,
  setUser,
  loggedOut,
  setColorScheme,
  setExpoToken,
} = appSlice.actions;

export default appSlice.reducer;
