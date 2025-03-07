import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { PageProps, PageName } from '@/navigation/PageProps';
import MainListItem from '@/component/MainListItem';
import DetailsListItem from '@/component/DetailsListItem';

const DetailsPage = ({ route }: PageProps<PageName.Details>) => {
  const { weatherInfo } = route.params;

  return (
    <>
      <MainListItem weatherInfo={weatherInfo} showArrow={false} />
      <ScrollView>
        <DetailsListItem name="Humidity" value={weatherInfo.main.humidity + '%'} />
        <DetailsListItem name="Pressure" value={weatherInfo.main.pressure + ' hPa'} />
        <DetailsListItem name="Wind Speed" value={weatherInfo.wind.speed + ' mps'} />
        <DetailsListItem name="Cloud Cover" value={weatherInfo.clouds.all + '%'} />
      </ScrollView>
    </>
  );
};

export default DetailsPage;
