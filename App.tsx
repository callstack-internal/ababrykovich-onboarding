import React, { useState, useEffect } from 'react';
import {
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from 'react-native';

import { OWM_API_KEY } from '@env';

// TODO move to separate class
// TODO minimize type to keep only essential info
type CityWeather = {
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
function Header(): React.JSX.Element {
  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Weather Onboarding</Text>
        </View>
      </SafeAreaView>
    </>
  );
}

const App = (): React.JSX.Element => {
  const [weatherData, setWeatherData] = useState<CityWeather[]>([]);
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
          setWeatherData(data.list as CityWeather[]);
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
        <Header />
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
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
      <Header />
      <FlatList
        data={weatherData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cityName}>{item.name}</Text>
            <Text style={styles.temp}>{item.main.temp}°C</Text>
          </View>
        )}
      />
    </>
  );
};

// TODO support themes with useColorScheme
const styles = StyleSheet.create({
  safeArea: {
    flex: 0,
    width: '100%',
    backgroundColor: '#4CAF50',
  },
  header: {
    height: 80,  // Fixed height for the header
    width: '100%',  // Full width
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
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
});

export default App;
