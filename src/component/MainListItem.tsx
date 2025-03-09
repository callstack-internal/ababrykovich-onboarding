import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import WeatherInfo from '@/model/WeatherInfo';
import { ThemeConfig } from '@/ThemeConfig';
import { useThemedStyles } from '@/hook/useThemedStyles';
import { ArrowIcon } from './ArrowIcon';

type MainListItemProps = {
  weatherInfo: WeatherInfo;
  showArrow?: boolean
};

const MainListItem = ({ weatherInfo, showArrow = true }: MainListItemProps) => {
  const [styles] = useThemedStyles(createStyles);

  return (
    <View style={styles.row}>
      <View style={styles.rowItem}>
        <Image source={{ uri: `https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png` }}
          style={styles.rowIcon} />
        <View>
          <Text style={styles.rowTitle}>{weatherInfo.name}</Text>
          <Text style={styles.rowSubtitle}>{weatherInfo.weather[0].main}</Text>
        </View>
      </View>

      <View style={styles.rowItem}>
        <Text style={styles.temperature}>{weatherInfo.main.temp} °C</Text>
        {showArrow ? <ArrowIcon /> : null}
      </View>
    </View>
  );
};

const createStyles = (config: ThemeConfig) => StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: config.background,
  },
  rowItem: {
    flexDirection: 'row',
    gap: 10,
  },
  rowIcon: {
    width: 50,
    height: 50,
    backgroundColor: config.background,
    borderRadius: 100 / 2,
    overflow: 'hidden',
  },
  rowTitle: {
    color: config.primaryText,
    fontSize: config.primartSize,
  },
  rowSubtitle: {
    fontSize: config.secondarySize,
    color: config.secondaryText,
  },
  temperature: {
    fontSize: config.secondarySize,
    fontWeight: 'bold',
    backgroundColor: config.temperatureBadgeBackground,
    color: config.temperatureText,
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  separator: {
    height: 1,
    backgroundColor: config.separatorColor,
  },
});

export default MainListItem;
