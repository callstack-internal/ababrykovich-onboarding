import { jest } from '@jest/globals';

jest.mock('react-native/Libraries/TurboModule/TurboModuleRegistry', () => {
  const orig = jest.requireActual<Record<string, any>>(
    'react-native/Libraries/TurboModule/TurboModuleRegistry'
  );

  return {
    ...orig,
    getEnforcing: (name: string) => {
      if (name === 'NativeWeatherModule') {
        return {
          getWeather: jest.fn(), // Mock the methods exposed by your module
        };
      }
      return orig.getEnforcing(name);
    },
  };
});

jest.mock('@react-navigation/stack', () => {
  const orig = jest.requireActual<Record<string, any>>('@react-navigation/stack');

  return {
    ...orig,
    createStackNavigator: jest.fn(() => ({
      Navigator: ({ children }: { children: React.ReactNode }) => children,
      Screen: ({ children }: { children: React.ReactNode }) => children,
    })),
  };
});

import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';
jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);

import 'react-native-gesture-handler/jestSetup';
