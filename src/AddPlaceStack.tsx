import React, { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from './StackParamList';
import { RouteProp } from '@react-navigation/native';
import { Center } from './CenterView';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Coordinate{
    latitude: number;
    longitude: number;
}
interface placeData{
    key: string;
    placeName: string;
    coordinate: Coordinate;
}

function AddPlace({
        navigation, 
        route
    }: {
        navigation: StackNavigationProp<StackParamList, 'AddPlace'>;
        route: RouteProp<StackParamList, 'AddPlace'>;
    }) {
    
    const [placeInfo, setPlaceInfo] = useState<placeData>()

    const PressAdd = () => {
        navigation.navigate('Home', {
            key: '2',
            latitude: route.params.latitude,
            longitude: route.params.longitude,
            placeName: 'New Place!',
            canIAdd: true,
        })
    }
    
    const PressGoBack = () => {
        navigation.goBack();
    }

    return(
        <Center>
            <Text>{route.params.latitude}</Text>
            <Text>{route.params.longitude}</Text>
            <TouchableOpacity onPress={PressAdd} >
                <Text>저장</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={PressGoBack} >
                <Text>뒤로가기</Text>
            </TouchableOpacity>
        </Center>
    )
}

export default AddPlace