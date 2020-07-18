import React, { useState } from 'react';
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList } from "./StackParamList";
import { RouteProp } from "@react-navigation/native";
import { Center } from "./CenterView";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MapView, { Marker } from 'react-native-maps';
import { styles } from './stylesheet';

interface locationData{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}

function SelectPlace({
        navigation, 
        route
    }: {
        navigation: StackNavigationProp<StackParamList, 'SelectPlace'>;
        route: RouteProp<StackParamList, 'SelectPlace'>;
    }) {
    
    //현재 위치
    const [location, setLocation] = useState<locationData>({
        latitude: route.params.latitude,
        longitude: route.params.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.015,
    });

    const PressAdd = () =>{
        navigation.navigate('AddPlace', {
            latitude: location.latitude,
            longitude: location.longitude,
        });
    }

    const PressGoBack = () =>{
        navigation.navigate('Home', {
            key: undefined,
            placeName: undefined,
            latitude: location.latitude,
            longitude: location.longitude,
            canIAdd: false,
        })
    }
    

    return(
        <View>
            <MapView
                style={styles.mapStyle}
                region={location}
            >
            </MapView>

            <Text>{route.params.latitude}</Text>
            <TouchableOpacity onPress={PressAdd} >
                <Text>추가</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.goBack()} >
                <Text>취소</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SelectPlace;