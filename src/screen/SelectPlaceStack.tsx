import React, { useState } from 'react';
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList } from "../StackParamList";
import { RouteProp } from "@react-navigation/native";
import { Text, View, TouchableOpacity } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { styles } from '../style/stylesheet';

interface Coordinate{
    latitude: number;
    longitude: number;
}
interface Region{
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
    
    //현재 coordinate.
    const [coordinate, setCoordinate] = useState<Coordinate>({
        latitude: route.params.latitude,
        longitude: route.params.longitude,
    });
    //현재 region.
    const [region, setRegion] = useState<Region>({
        latitude: route.params.latitude,
        longitude: route.params.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.015,
    })

    //추가 버튼 누를 경우 화면 이동.
    const PressAdd = () =>{
        navigation.navigate('AddPlace', {
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
        });
    }
    

    return(
        <View>
            <MapView
                style={styles.mapStyle}
                region={region}
            >
                <Marker 
                    draggable 
                    coordinate={coordinate}
                    pinColor={'green'}
                    onDragEnd={(e) => setCoordinate(e.nativeEvent.coordinate) } 
                />
            </MapView>

            <TouchableOpacity 
                style={styles.addPlaceButton} 
                onPress={PressAdd} 
            >
                <Text>추가</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.cancelAddButton} 
                onPress={() => navigation.goBack()} 
            >
                <Text>취소</Text>
            </TouchableOpacity>

        </View>
    )
}

export default SelectPlace;