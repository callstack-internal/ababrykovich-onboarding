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
import MainListItem from '@/component/MainListItem';

import { OWM_API_KEY } from '@env';
import useWeatherInfo from '@/hook/useWeatherInfo';
import DefaultCityProvider from '@/service/CityInfoProvider';

const MainPage: React.FC<MainPageProps> = ({ navigation }: MainPageProps) => {
  const [ cityIds ] = useState<number[]>(new DefaultCityProvider().getCityIds());
  const { weatherData, loading, error } = useWeatherInfo(OWM_API_KEY, cityIds);

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