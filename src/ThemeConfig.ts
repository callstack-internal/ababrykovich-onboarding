import { ColorSchemeName } from 'react-native';

export type ThemeConfig = {
  navigationItemBackground: string;
  navigationItemTint: string;
  separatorColor: string;
  background: string;
  primaryText: string;
  primartSize: number;
  secondaryText: string;
  secondarySize: number;
  temperatureBadgeBackground: string;
  temperatureText: string;
  errorText: string;
  activityColor: string;
};

const baseTheme = {
  primartSize: 20,
  secondarySize: 18,
};

const lightTheme: ThemeConfig = {
  ...baseTheme,
  navigationItemBackground: '#F5F5F5',
  navigationItemTint: 'black',
  separatorColor: '#F5F5F5',
  background: '#FFFFFF',
  primaryText: '#000000',
  secondaryText: '#808080',
  temperatureBadgeBackground: '#D1E3F0',
  temperatureText: '#4A708B',
  errorText: 'red',
  activityColor: '#0000ff',
};

const darkTheme: ThemeConfig = {
  ...baseTheme,
  navigationItemBackground: '#2E2E2E',
  navigationItemTint: '#FFFFFF',
  separatorColor: '#121212',
  background: '#1E1E1E',
  primaryText: '#FFFFFF',
  secondaryText: '#B0B0B0',
  temperatureBadgeBackground: '#30475E',
  temperatureText: '#A8DADC',
  errorText: 'red',
  activityColor: '#0000ff',
};

const themes: Record<'light' | 'dark', ThemeConfig> = {
  light: lightTheme,
  dark: darkTheme,
};

export const getTheme = (mode: ColorSchemeName): ThemeConfig => themes[mode ?? 'light'];
