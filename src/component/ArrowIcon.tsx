import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useThemedStyles } from '@/hook/useThemedStyles';
import { ThemeConfig } from '@/ThemeConfig';

export const ArrowIcon = () => {
  const [styles] = useThemedStyles(createStyles);

  return (<Text style={styles.arrow}>{'\u276F'}</Text>);
};

const createStyles = (config: ThemeConfig) => StyleSheet.create({
  arrow: {
    fontSize: 18,
    padding: 5,
    color: config.primaryText,
  },
});
