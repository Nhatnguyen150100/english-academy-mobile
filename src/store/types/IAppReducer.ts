import { IUser } from '@src/types/user.types';
import { ColorSchemeName } from 'react-native'; 

export interface IAppReducer {
  userColorScheme?: ColorSchemeName,
  user?: IUser,
  expoToken?: string,
  numberMissionDaily?: number,
}

