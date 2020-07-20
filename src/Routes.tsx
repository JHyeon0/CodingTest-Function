import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StackParamList } from './StackParamList';
import AddPlace from './screen/AddPlaceStack'
import Home from './screen/HomeStack';
import { PlaceDataContextProvider } from './PlaceNameProvider'


type RoutesProps = {}
const Stack = createStackNavigator<StackParamList>();

/*
  react-navigation에서 Stack간 Routes를 나타냄.
  PlaceDataContextProvider에서 모든 Stack에서 사용할 context를 관리.
*/
export const Routes: React.FC<RoutesProps> = ({}) => {
    return (
        <PlaceDataContextProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={Home} options={{header:()=>null}}/>    
                    <Stack.Screen name="AddPlace" component={AddPlace} options={{headerTitle: '추가'}}/>
                </Stack.Navigator>
            </NavigationContainer>
        </PlaceDataContextProvider>
    )
}