import React from 'react';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { View, Text, TouchableOpacity } from 'react-native';
import { Center } from './CenterView';
import { StackParamList } from './StackParamList';
import Home from './HomeStack';
import SelectPlace from './SelectPlaceStack'
import AddPlace from './AddPlaceStack'

interface RoutesProps {}

const Stack = createStackNavigator<StackParamList>();


export const Routes: React.FC<RoutesProps> = ({}) => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{header:()=>null}} initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="SelectPlace" component={SelectPlace} options={{animationEnabled: false}} />
                <Stack.Screen name="AddPlace" component={AddPlace} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}