import { StackScreenProps } from '@react-navigation/stack';

import WeatherInfo from '@/model/WeatherInfo';

export const enum PageName {
  Main = 'Main',
  Details = 'Details'
}

export type StackParamList = {
  [PageName.Main]: undefined;
  [PageName.Details]: { weatherInfo: WeatherInfo }
};

export type PageProps<T extends keyof StackParamList> =
  StackScreenProps<StackParamList, T>;

