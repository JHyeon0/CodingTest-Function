import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, FlatList } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"
import MapView, { Marker } from 'react-native-maps';
import { StackParamList } from "../StackParamList"
import { styles } from '../style/stylesheet'
import { usePlaceDataArray, PlaceDataArray } from '../PlaceNameProvider'
import { EmptyList } from './EmptyListView'
import moment from 'moment';

interface locationData{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}

function Home({
        navigation, 
    }: {
        navigation: StackNavigationProp<StackParamList, 'Home'>;
    }) {

    // 0.1초마다 현재 시간(state)을 변경.
    useEffect(() => {
        var timerID = setInterval( () => {RefreshTime()}, 100 );
        return function cleanup() {
            clearInterval(timerID);
        };
    });

    //현재 시간
    const [date, setDate] = useState<string>(moment().format())
    
    //장소 리스트 데이터    
    const placeData: PlaceDataArray = usePlaceDataArray();

    //현재 위치
    const [location, setLocation] = useState<locationData>({
        latitude: 37.266162,
        longitude: 127.000055,
        latitudeDelta: 0.015,
        longitudeDelta: 0.015,
    });

    //장소 리스트 Show/Hide boolean
    const [showList, setShowList] = useState<boolean>(false);

    //현재 시간을 설정함.
    function RefreshTime() {
        setDate(moment().format());
    }
    
    const PressAdd = () => {
        navigation.navigate('SelectPlace', {
            latitude: location.latitude,
            longitude: location.longitude,
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
        
        // animation 기능 구현 해야함. class에서 아래와 같이함.
        // this.map.animateToRegion(pressedPlaceName, 500)
    }

    //Relative time threshold custom settings
    moment.relativeTimeThreshold('s', 60);
    moment.relativeTimeThreshold('ss', 0);

    return (
        <View>
            <MapView
                // animation 기능 구현 해야함 class에서 아래와 같이함.
                // ref={(map)=>{this.map = map;}}
                style={styles.mapStyle}
                initialRegion={location}
                region={location}
            >
                {placeData.map(marker => (
                        <Marker coordinate={marker.coordinate}/>
                ))}
            </MapView>
            
            <TouchableOpacity 
                style={styles.addPlaceButton_Home} 
                onPress={PressAdd} 
            >
                <Text>장소 추가</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.openListButton} 
                onPress={()=>{setShowList(!showList)}} 
            >
                <Text>목록 열기</Text>
            </TouchableOpacity>

            <View style={showList? styles.showListContainer : styles.hideContainer}>
                <TouchableOpacity 
                    style={styles.placeList}
                    onPress={()=>{setShowList(!showList)}} 
                >
                    <Text>닫기</Text>
                </TouchableOpacity>

                <FlatList 
                    ListEmptyComponent={ EmptyList }
                    data={placeData}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            style={styles.placeList}
                            onPress={() => PressPlaceName(item.coordinate.latitude, item.coordinate.longitude)} 
                        >
                            <Text>{item.placeName}</Text>
                            <Text>{moment(item.key).fromNow()}</Text>
                        </TouchableOpacity>
                    )} 
                />
            </View>
        </View>
    )
}



export default Home;