import { useThemedStyles } from '@/hook/useThemedStyles';
import { ThemeConfig } from '@/ThemeConfig';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

type DetailsPropertyProps = {
  name: string;
  value: string | number;
};

const DetailsListItem = ({ name, value }: DetailsPropertyProps) => {
  const [styles] = useThemedStyles(createStyles);

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

const createStyles = (config: ThemeConfig) => StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: config.separatorColor,
  },
  detailsSubListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: config.background,
    padding: 20,
  },
  detailsSubListItemName: {
    color: config.primaryText,
    fontSize: config.primartSize,
  },
  detailsSubListItemValue: {
    color: config.secondaryText,
    fontSize: config.secondarySize,
  },
});

export default DetailsListItem;
