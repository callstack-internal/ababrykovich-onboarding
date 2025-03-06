import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { PageProps, PageName } from '@/navigation/PageProps';
import MainListItem from '@/component/MainListItem';

type DetailsPropertyProps = {
  name: string;
  value: string | number;
};

const DetailsListItem = ({ name, value }: DetailsPropertyProps) => {
  return (
    <>
      <View style={styles.separator} />
      <View style={styles.detailsSubListItem}>
        <Text style={styles.detailsSubListItemName}>{name}</Text>
        <Text style={styles.detailsSubListItemValue}>{value}</Text>
      </View>
    </>
  );
};

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


const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#ccc',
  },
  detailsSubListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 20,
  },
  detailsSubListItemName: {
    fontSize: 18,
  },
  detailsSubListItemValue: {
    fontSize: 18,
    color: 'gray',
  },
});

export default DetailsPage;
