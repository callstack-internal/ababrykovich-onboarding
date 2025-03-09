import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { NavigationContainer as ReactNavigationContainer } from '@react-navigation/native';

import MainPage from '@/MainPage';
import DetailsPage from '@/DetailsPage';
import { PageName, StackParamList } from '@/navigation/PageProps';
import { useThemedStyles } from '@/hook/useThemedStyles';
import { ThemeConfig } from '@/ThemeConfig';

const Stack = createStackNavigator<StackParamList>();

const NavigationContainer = () => {
  const [screenOptions] = useThemedStyles(createScreenOptions);

  return (
    <ReactNavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name={PageName.Main} component={MainPage} />
        <Stack.Screen name={PageName.Details} component={DetailsPage} />
      </Stack.Navigator>
    </ReactNavigationContainer>
  );
};

const createScreenOptions = (config: ThemeConfig): StackNavigationOptions => ({
  headerStyle: { backgroundColor: config.navigationItemBackground },
  headerTintColor: config.navigationItemTint,
  headerTitleStyle: { fontWeight: 'bold' },
});

export default NavigationContainer;
