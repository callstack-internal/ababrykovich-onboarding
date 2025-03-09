import { useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { getTheme, ThemeConfig } from '@/ThemeConfig';

type CreateStyleFunction<T> = (theme: ThemeConfig) => T;

export const useThemeConfig = () => {
  const colorScheme = useColorScheme();
  return useMemo(() => getTheme(colorScheme), [colorScheme]);
};

export const useThemedStyles = <T>(createStyle: CreateStyleFunction<T>)
  : [T, ThemeConfig] => {
  const theme = useThemeConfig();
  const styles = useMemo(() => createStyle(theme), [theme, createStyle]);

  return [styles, theme];
};
