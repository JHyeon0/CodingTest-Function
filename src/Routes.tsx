import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, Header } from '@react-navigation/stack';
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
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={Home} options={{header:()=>null}}/>
                    <Stack.Screen name="SelectPlace" component={SelectPlace} options={{animationEnabled: false, header:()=>null}} />
                    <Stack.Screen name="AddPlace" component={AddPlace} options={{}}/>
                </Stack.Navigator>
            </NavigationContainer>
        </PlaceDataContextProvider>

    )
}