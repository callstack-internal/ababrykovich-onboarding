import WeatherInfo from '@/model/WeatherInfo';
import NativeWeatherModule from '@specs/NativeWeatherModule';

interface DeviceWeatherInfoProvider {
  getWeatherInfo(): WeatherInfo;
}

class DefaultDeviceWeatherInfoProvider implements DeviceWeatherInfoProvider {
  getWeatherInfo() {
    const deviceInfo = NativeWeatherModule.getDeviceInfo();
    const weatherInfo = {
      id: -1, // deviceId
      name: deviceInfo.name,
      main: {
        temp: deviceInfo.temp,
        pressure: deviceInfo.pressure,
        humidity: deviceInfo.humidity,
      },
      weather: [{
        main: deviceInfo.weather_main,
        icon: deviceInfo.weather_icon,
      }],
      wind: {
        speed: deviceInfo.wind_speed,
      },
      clouds: {
        all: deviceInfo.clouds,
      },
    } as WeatherInfo;

    return weatherInfo;
  }
}

export default DefaultDeviceWeatherInfoProvider;
