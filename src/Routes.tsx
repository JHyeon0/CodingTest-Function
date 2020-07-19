import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StackParamList } from './StackParamList';
import Home from './screen/HomeStack';
import SelectPlace from './screen/SelectPlaceStack'
import AddPlace from './screen/AddPlaceStack'
import { PlaceDataContextProvider } from './PlaceNameProvider'


interface RoutesProps {}
const Stack = createStackNavigator<StackParamList>();

export const Routes: React.FC<RoutesProps> = ({}) => {
    return (
        <PlaceDataContextProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={Home} options={{header:()=>null}}/>
                    <Stack.Screen name="SelectPlace" component={SelectPlace} options={{animationEnabled: false, header:()=>null}} />
                    <Stack.Screen name="AddPlace" component={AddPlace} options={{}}/>
                </Stack.Navigator>
            </NavigationContainer>
        </PlaceDataContextProvider>
    )
}