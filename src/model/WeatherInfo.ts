// NOTE https://openweathermap.org/api provide more data
// and WeatherInfo display only essential fields
type WeatherInfo = {
  id: number;
  name: string;
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  clouds: { all: number };
  wind: { speed?: number; deg?: number };
  weather: {
    id: number;
    main: string;
    description?: string;
    icon: string
  }[];
};

export default WeatherInfo;
