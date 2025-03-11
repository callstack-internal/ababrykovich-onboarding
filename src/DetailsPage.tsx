import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { PageProps, PageName } from '@/navigation/PageProps';
import MainListItem from '@/component/MainListItem';
import DetailsListItem from '@/component/DetailsListItem';
import { useThemeConfig } from './hook/useThemedStyles';

const DetailsPage = ({ route }: PageProps<PageName.Details>) => {
  const { weatherInfo } = route.params;
  const config = useThemeConfig();

  return (
    <>
      <MainListItem weatherInfo={weatherInfo} showArrow={false} />
      <ScrollView style={{backgroundColor: config.background}}>
        <DetailsListItem name="Humidity" value={weatherInfo.main.humidity + '%'} />
        <DetailsListItem name="Pressure" value={weatherInfo.main.pressure + ' hPa'} />
        <DetailsListItem name="Wind Speed" value={weatherInfo.wind.speed + ' mps'} />
        <DetailsListItem name="Cloud Cover" value={weatherInfo.clouds.all + '%'} />
      </ScrollView>
    </>
  );
};

export default DetailsPage;
