import { StackScreenProps } from '@react-navigation/stack';

import WeatherInfo from '@/model/WeatherInfo';

type RootStackParamList = {
  Main: undefined;
  Details: { weatherInfo: WeatherInfo };
};

export type MainPageProps = StackScreenProps<RootStackParamList, 'Main'>;
export type DetailsPageProps = StackScreenProps<RootStackParamList, 'Details'>;

export default RootStackParamList;
