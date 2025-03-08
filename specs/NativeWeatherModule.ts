import {TurboModule, TurboModuleRegistry} from 'react-native';

export type DeviceInfo = {
  name: string;
  temp?: number;
  humidity?: number;
  pressure?: number;
  wind_speed?: number;
  clouds?: number;
  weather_icon: string;
  weather_main: string;
};

export interface Spec extends TurboModule {
  readonly getDeviceInfo: () => DeviceInfo;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'NativeWeatherModule',
);
