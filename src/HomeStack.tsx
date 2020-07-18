import React, { useState, useContext } from 'react';
import { StackNavigationProp } from "@react-navigation/stack"
import { StackParamList } from "./StackParamList"
import { RouteProp, useFocusEffect } from "@react-navigation/native"
import MapView, { Marker } from 'react-native-maps';
import { Text, View } from "react-native"
import { TouchableOpacity, FlatList } from "react-native-gesture-handler"
import { styles } from './stylesheet'

interface Coordinate{
    latitude: number;
    longitude: number;
}
interface placeData{
    key: string;
    placeName: string;
    coordinate: Coordinate;
}
interface locationData{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}

function Home({
        navigation, 
        route
    }: {
        navigation: StackNavigationProp<StackParamList, 'Home'>;
        route: RouteProp<StackParamList, 'Home'>;
    }) {
        

    
    //오직 Add에서 정보를 받을 때만 장소 리스트 데이터 업데이트
    const[canIAdd, setCanIAdd] = useState<boolean|undefined>(undefined);

    //장소 리스트 데이터
    const [placeArray, setDataArray] = useState<placeData[]>([
        {
            key: '1',
            placeName: 'hello',
            coordinate: {
                latitude: 37.256162,
                longitude: 127.000055,
            },
        },
        {
            key: '2',
            placeName: 'hello2',
            coordinate: {
                latitude: 37.266162,
                longitude: 127.000055,
            },
        }
    ]);

    
    //현재 위치
    const [location, setLocation] = useState<locationData>({
        latitude: 37.266162,
        longitude: 127.000055,
        latitudeDelta: 0.015,
        longitudeDelta: 0.015,
    });
    //장소 리스트 Show/Hide
    const [showList, setShowList] = useState<boolean>(false);

    const PressAdd = () => {
        navigation.navigate('SelectPlace', {
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: location.latitudeDelta,
            longitudeDelta: location.longitudeDelta,
        });
    }

    const PressPlaceName = (pressedLatitude: number, pressedLongitude: number) => {
        console.log("pressed place name!");
        setLocation({
            latitude: pressedLatitude,
            longitude: pressedLongitude,
            latitudeDelta: location.latitudeDelta,
            longitudeDelta: location.longitudeDelta,
        })
    }

    return (
        <View>
            <MapView
                style={styles.mapStyle}
                initialRegion={location}
                region={location}
            >
            </MapView>
            
            <TouchableOpacity 
                style={styles.addPlaceButton_Home} 
                onPress={PressAdd} 
                 
            >
                <Text>장소추가</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.openListButton} 
                onPress={()=>{
                    setShowList(!showList)
                }} 
            >
                <Text>열기</Text>
            </TouchableOpacity>

            <View style={showList? styles.showListContainer : styles.hideListContainer}>

                <TouchableOpacity 
                    onPress={()=>{
                    setShowList(!showList)
                    console.log(showList)
                    }} 
                >
                    <Text>닫기</Text>
                </TouchableOpacity>

                <FlatList 
                    ListEmptyComponent={
                        <View>
                            <Text>장소가 없습니다.</Text>
                        </View>
                        }
                    data={placeArray}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            onPress={() => PressPlaceName(item.coordinate.latitude, item.coordinate.longitude)} >
                            <Text>{item.placeName}</Text>
                        </TouchableOpacity>
                    )} 
                />



            </View>

        </View>
    )
}



export default Home;