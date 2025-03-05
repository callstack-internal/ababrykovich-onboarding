import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { OWM_API_KEY } from '@env';

// TODO move to separate class
// TODO minimize type to keep only essential info
type WeatherInfo = {
  coord: { lon: number; lat: number };
  dt: number;
  id: number;
  main: { temp: number; feels_like: number; temp_min: number; temp_max: number; pressure: number; sea_level: number; grnd_level: number; humidity: number };
  name: string;
  sys: { country: string; timezone: number; sunrise: number; sunset: number };
  visibility: number;
  weather: { id: number; main: string; description: string; icon: string }[];
  wind: { speed: number; deg: number };
  clouds: { all: number };
};

// TODO move to separate file
type HeaderProps = {
  title?: string;
};

// TODO move to separate file
type WeatherDetailsProps = {
  weatherInfo: WeatherInfo;
};

// TODO move to separate file with navigation logic
type RootStackParamList = {
  Main: undefined;
  Details: WeatherDetailsProps;
};

type WeatherMainPageProps = StackScreenProps<RootStackParamList, 'Main'>;
type WeatherDetailsPageProps = StackScreenProps<RootStackParamList, 'Details'>;

const Header: React.FC<HeaderProps> = ({ title = 'Weather' }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </SafeAreaView>
  );
}

const WeatherDetails: React.FC<WeatherDetailsPageProps> = ({ route }: WeatherDetailsPageProps) => {
  const { weatherInfo } = route.params;

  return (
    <>
      <View style={styles.details}>
        <Text style={styles.title}>{weatherInfo.name}</Text>
        <Text style={styles.detailssubtitle}>{weatherInfo.weather[0].main}</Text>
        <Text style={styles.temp}>{weatherInfo.main.temp.toFixed(1)} °F</Text>
        <Text>Humidity: {weatherInfo.main.humidity}%</Text>
        <Text>Pressure: {weatherInfo.main.pressure} hPa</Text>
        <Text>Wind Speed: {weatherInfo.wind.speed} mph</Text>
        <Text>Cloud Cover: {weatherInfo.clouds.all}%</Text>
      </View>
    </>
  );
}


const WeatherMain: React.FC<WeatherMainPageProps> = ({ navigation }: WeatherMainPageProps) => {
  const [weatherData, setWeatherData] = useState<WeatherInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // TODO move to separate provider
  const cityIds = [
    703448, // Kyiv, UA
    692194, // Sumy, UA
    756135, // Warsaw, PL
    3081368, // Wrocław, PL
    3067696, // Prague, CZ
    3077916, // České Budějovice, CZ
    2950159, // Berlin, DE
    2867714, // Munich, DE
    3247449, // Aachen, DE
    5815135, // Washington, US
    5128581, // New York City, US
  ];

  useEffect(() => {
    // TODO implement pagination
    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null);

      try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/group?id=${cityIds.join(',')}&appid=${OWM_API_KEY}&units=metric`;

        console.log(`fetch ${apiUrl}`);

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.status === 200) {
          setWeatherData(data.list as WeatherInfo[]);
        } else {
          setError('Failed to load weather data');
        }
      } catch (err) {
        setError(`Error fetching data: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading) {
    return (
      <>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </>
    );
  }

  if (error) {
    return (
      <>
        <View style={styles.centered}>
          <Text style={styles.error}>{error}</Text>
        </View>
      </>
    );
  }

  return (
    // TODO move renderItem to separate component
    // TODO implement drag to reload
    <>
      <FlatList
        data={weatherData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Details', { weatherInfo: item })}>
            <View style={styles.card}>
              <Text style={styles.cityName}>{item.name}</Text>
              <Text style={styles.temp}>{item.main.temp}°C</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </>
  );
};

const Stack = createStackNavigator();

const App = (): React.JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={WeatherMain as React.FC<any>} />
        <Stack.Screen name="Details" component={WeatherDetails as React.FC<any>} />
      </Stack.Navigator>
    </NavigationContainer>
  )
};

// TODO support themes with useColorScheme
const styles = StyleSheet.create({
  safeArea: {
    flex: 0,
    width: '100%',
    backgroundColor: 'lightgray',
  },
  header: {
    height: 80,  // Fixed height for the header
    width: '100%',  // Full width
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',  // White text color for contrast
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    fontSize: 18,
  },
  card: {
    padding: 20,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // Android shadow
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  temp: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  details: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    margin: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  detailssubtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
});

export default App;
