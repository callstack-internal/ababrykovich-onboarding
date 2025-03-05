import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { MainPageProps } from '@/model/RootStackParamList';
import WeatherInfo from '@/model/WeatherInfo';
import MainListItem from './component/MainListItem';

import { OWM_API_KEY } from '@env';

const MainPage: React.FC<MainPageProps> = ({ navigation }: MainPageProps) => {
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
    // TODO implement pagination and move to dedicated API client
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
          <>
            <TouchableOpacity onPress={() => navigation.navigate('Details', { weatherInfo: item })}>
              <MainListItem weatherInfo={item} />
            </TouchableOpacity>
            <View style={styles.separator} />
          </>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    fontSize: 18,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
  },
});

export default MainPage;