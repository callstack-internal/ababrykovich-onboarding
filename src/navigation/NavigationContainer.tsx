import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import { NavigationContainer as ReactNavigationContainer } from '@react-navigation/native';

import MainPage from '../MainPage';
import DetailsPage from '../DetailsPage';

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
        <Stack.Screen name="Main" component={MainPage as React.FC<any>} />
        <Stack.Screen name="Details" component={DetailsPage as React.FC<any>} />
      </Stack.Navigator>
    </ReactNavigationContainer>
  )
};

export default NavigationContainer;