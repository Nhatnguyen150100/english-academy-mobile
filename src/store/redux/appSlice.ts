import { IAppReducer } from "@store/types/IAppReducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IAppReducer = {
};

export const appSlice = createSlice({
  name: "appReducer",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state = { ...state, user: action.payload };
      return state;
    },
    setNumberMissionDaily: (state, action: PayloadAction<number>) => {
      state = { ...state, numberMissionDaily: action.payload };
      return state;
    },
    loggedOut: (state) => {
      state = { ...state, user: undefined };
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
  setUser,
  loggedOut,
  setColorScheme,
  setExpoToken,
  setNumberMissionDaily
} = appSlice.actions;

export default appSlice.reducer;
