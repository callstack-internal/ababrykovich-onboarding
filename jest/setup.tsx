import {jest} from '@jest/globals';

import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);

import 'react-native-gesture-handler/jestSetup'

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
    push: jest.fn(),
  })),
  NavigationContainer: ({ children }: { children: React.ReactNode }) => children,
}))


jest.mock('@react-navigation/stack', () => {
  const actualNav: any = jest.requireActual('@react-navigation/stack')

  return {
    ...actualNav,
    createStackNavigator: jest.fn(() => ({
      Navigator: ({ children }: { children: React.ReactNode }) => children,
      Screen: ({ children }: { children: React.ReactNode }) => children,
    })),
  }
});


