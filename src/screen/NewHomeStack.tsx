import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, FlatList } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"
import Animated, { Marker } from 'react-native-maps';
import { StackParamList } from "../StackParamList"
import { styles } from '../style/stylesheet'
import { usePlaceDataArray, PlaceDataArray } from '../PlaceNameProvider'
import { EmptyList } from './EmptyListView'
import moment from 'moment';

interface Region{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}
interface Coordinate{
    latitude: number;
    longitude: number;
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

    //현재 region
    const [region, setRegion] = useState<Region>({
        latitude: 37.266162,
        longitude: 127.000055,
        latitudeDelta: 0.015,
        longitudeDelta: 0.015,
    });

    //현재 coordinate.
    const [coordinate, setCoordinate] = useState<Coordinate>({
        latitude: region.latitude,
        longitude: region.longitude,
    });

    //리스트, markers Show/Hide boolean
    const [showList, setShowList] = useState<boolean>(false);
    const [showListMarkers, setShowListMarkers] = useState<boolean>(true);

    //현재 시간을 설정
    function RefreshTime() {
        setDate(moment().format());
    }
    
    //장소 선택 화면 toggler
    const ToggleMarker = () => {
        setShowListMarkers(!showListMarkers);
    }

    //이름 입력 화면으로 이동
    const GoInputNameScreen = () => {
        ToggleMarker();
        navigation.navigate('AddPlace', {
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
        });
    }

    //이름 누르면 해당 위치로 이동
    const PressPlaceName = (pressedLatitude: number, pressedLongitude: number) => {
        console.log("pressed place name!");
        setRegion({
            latitude: pressedLatitude,
            longitude: pressedLongitude,
            latitudeDelta: region.latitudeDelta,
            longitudeDelta: region.longitudeDelta,
        })
        setCoordinate({
            latitude: pressedLatitude,
            longitude: pressedLongitude,
        })
        
        // animation 기능 구현 해야함. class에서 아래와 같이함.
        // this.map.animateToRegion(pressedPlaceName, 500)
    }

    //Relative time threshold custom settings
    moment.relativeTimeThreshold('s', 60);
    moment.relativeTimeThreshold('ss', 0);

    return (
        <View>
            <Animated
                // animation 기능 구현 해야함 class에서 아래와 같이함.
                style={styles.mapStyle}
                initialRegion={region}
                region={region}
            >
                {
                    <Marker 
                        draggable 
                        coordinate={coordinate}
                        pinColor={'green'}
                        onDragEnd={(e) => setCoordinate(e.nativeEvent.coordinate) }
                        opacity={showListMarkers? 0: 1}
                    />
                }
                {
                    placeData.map(marker => (
                        <Marker 
                            coordinate={marker.coordinate}
                            opacity={showListMarkers? 1: 0}
                        />
                    ))
                }
            </Animated>
            
            <TouchableOpacity 
                style={ showListMarkers?
                    styles.addPlaceButton_Home :
                    styles.hideContainer
                } 
                onPress={ToggleMarker} 
            >
                <Text>장소 추가</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={ showListMarkers?
                    styles.hideContainer :
                    styles.addPlaceButton} 
                onPress={GoInputNameScreen} 
            >
                <Text>추가</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={ showListMarkers?
                    styles.hideContainer :
                    styles.cancelAddButton
                } 
                onPress={ToggleMarker} 
            >
                <Text>취소</Text>
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