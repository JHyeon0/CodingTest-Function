import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StackParamList } from './StackParamList';
import Home from './HomeStack';
import SelectPlace from './SelectPlaceStack'
import AddPlace from './AddPlaceStack'
import { PlaceDataContextProvider } from './GlobalProvider'


interface RoutesProps {}
const Stack = createStackNavigator<StackParamList>();

export const Routes: React.FC<RoutesProps> = ({}) => {
    return (
        <PlaceDataContextProvider>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{header:()=>null}} initialRouteName="Home">
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="SelectPlace" component={SelectPlace} options={{animationEnabled: false}} />
                    <Stack.Screen name="AddPlace" component={AddPlace} />
                </Stack.Navigator>
            </NavigationContainer>
        </PlaceDataContextProvider>

    )
}