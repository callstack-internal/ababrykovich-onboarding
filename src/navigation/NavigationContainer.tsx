import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer as ReactNavigationContainer } from '@react-navigation/native';

import MainPage from '@/MainPage';
import DetailsPage from '@/DetailsPage';
import { PageName } from '@/navigation/PageProps';

const Stack = createStackNavigator();

const NavigationContainer = () => {
  return (
    <ReactNavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: 'lightgray' },
          headerTintColor: 'black',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name={PageName.Main} component={MainPage} />
        <Stack.Screen name={PageName.Details} component={DetailsPage} />
      </Stack.Navigator>
    </ReactNavigationContainer>
  )
};

export default NavigationContainer;