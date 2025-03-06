import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import WeatherInfo from '@/model/WeatherInfo';

type MainListItemProps = {
  weatherInfo: WeatherInfo;
  showArrow?: boolean
};

const ArrowIcon = () => <Text style={styles.arrow}>{'\u276F'}</Text>;

const MainListItem = ({ weatherInfo, showArrow = true }: MainListItemProps) => {
  return (
    <View style={styles.mainListItem}>
      <View style={styles.mainListItemComponent}>
        <Image source={{ uri: `https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png` }}
          style={styles.mainListItemIcon} />
        <View>
          <Text style={styles.mainListItemTitle}>{weatherInfo.name}</Text>
          <Text style={styles.mainListItemSubtitle}>{weatherInfo.weather[0].main}</Text>
        </View>
      </View>

      <View style={styles.mainListItemComponent}>
        <Text style={styles.temp}>{weatherInfo.main.temp} °C</Text>
        {showArrow ? <ArrowIcon /> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  arrow: {
    fontSize: 18,
    padding: 5,
  },
  mainListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
  },
  mainListItemComponent: {
    flexDirection: 'row',
    gap: 10,
  },
  mainListItemIcon: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 100 / 2,
    overflow: 'hidden',
  },
  mainListItemTitle: {
    fontSize: 20,
  },
  mainListItemSubtitle: {
    fontSize: 18,
    color: 'gray',
  },
  temp: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#B9D3DE',
    color: '#ffffff',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
  },
});

export default MainListItem;
