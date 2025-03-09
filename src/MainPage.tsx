import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { PageProps, PageName } from '@/navigation/PageProps';
import MainListItem from '@/component/MainListItem';

import { OWM_API_KEY } from '@env';
import { ThemeConfig } from '@/ThemeConfig';
import { useThemedStyles } from '@/hook/useThemedStyles';
import useWeatherInfo from '@/hook/useWeatherInfo';
import DefaultCityProvider from '@/service/CityInfoProvider';
import DefaultDeviceWeatherInfoProvider from '@/service/DeviceWeatherInfoProvider';
import WeatherInfo from '@/model/WeatherInfo';

const MainPage = ({ navigation }: PageProps<PageName.Main>) => {
  const [cityIds] = useState<number[]>(new DefaultCityProvider().getCityIds());
  const [deviceInfo] = useState<WeatherInfo>(new DefaultDeviceWeatherInfoProvider().getWeatherInfo());
  const { weatherData, loading, error } = useWeatherInfo(OWM_API_KEY, cityIds, deviceInfo);

  const [styles, themeConfig] = useThemedStyles(createStyles);

  if (loading) {
    return (
      <>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={themeConfig.activityColor} />
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
        style={{ backgroundColor: themeConfig.background }}
        data={weatherData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <>
            <TouchableOpacity onPress={() => navigation.navigate(PageName.Details, { weatherInfo: item })}>
              <MainListItem weatherInfo={item} />
            </TouchableOpacity>
            <View style={styles.separator} />
          </>
        )}
      />
    </>
  );
};

const createStyles = (config: ThemeConfig) => StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: config.errorText,
    fontSize: config.primartSize,
  },
  separator: {
    height: 1,
    backgroundColor: config.separatorColor,
  },
});

export default MainPage;
