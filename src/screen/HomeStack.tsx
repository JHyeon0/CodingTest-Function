import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, FlatList } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"
import { StackParamList } from "../StackParamList"
import { styles } from '../style/stylesheet'
import MapView, { Marker } from 'react-native-maps';
import moment from 'moment';
import { UsePlaceDataArray, PlaceDataArray } from '../PlaceNameProvider'
import { EmptyList } from './EmptyListView'

/*
  Region: 중심 좌표와 그 주변(화면에 나타나는 지도)
  Coordinate: 지도상 좌표(marker 좌표에 이용)
*/
type Region = {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}
type Coordinate = {
    latitude: number;
    longitude: number;
}

/*
  Home Stack.Screen
*/
function Home({ navigation }: 
    { navigation: StackNavigationProp<StackParamList, 'Home'> }) 
{

    // 0.1초마다 현재 상태(시간)을 변경.
    useEffect(() => {
        let timerID = setInterval( ()=>{setDate(moment().format())}, 100 );
        return function cleanup() {
            clearInterval(timerID);
        };
    });

    // MapView의 ref
    const mapRef = useRef<MapView|null>(null);

    // 현재 시간(단순히 state 변경으로 화면 update 위한 state)
    const [date, setDate] = useState<string>(moment().format())
    
    // 장소 리스트 데이터를 읽음
    const placeData: PlaceDataArray = UsePlaceDataArray();

    // 현재 region. default 값 설정(수원역)
    const [region, setRegion] = useState<Region>({
        latitude: 37.266162,
        longitude: 127.000055,
        latitudeDelta: 0.015,
        longitudeDelta: 0.015,
    });

    // 현재 coordinate. default 값 설정(수원역)
    const [coordinate, setCoordinate] = useState<Coordinate>({
        latitude: 37.266162,
        longitude: 127.000055,
    });

    // 리스트, markers Show/Hide boolean
    const [showList, setShowList] = useState<boolean>(false);
    const [showMarkersList, setShowMarkersList] = useState<boolean>(true);
    
    // Toggler: [모든 장소 markers 보기] / [선택 marker 보기]
    const ToggleMarker = () => {setShowMarkersList(!showMarkersList)}
    // Toggler: [목록 보기] / [목록 닫기]
    const ToggleList = () => {setShowList(!showList)}

    // 장소 이름 입력 화면('AddPlace')으로 이동
    const GoInputNameScreen = () => {
        ToggleMarker();
        navigation.navigate('AddPlace', {
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
        });
    }

    // 이름 누르면 해당 위치로 이동, draggable marker 초기 위치 설정.
    const PressPlaceName = 
        (pressedLatitude: number, pressedLongitude: number) => {
        const pressedPlaceName: Region = {
            latitude: pressedLatitude,
            longitude: pressedLongitude,
            latitudeDelta: region.latitudeDelta,
            longitudeDelta: region.longitudeDelta,
        }

        if(mapRef.current !== null){
            mapRef.current.animateToRegion(pressedPlaceName, 500);
        }
        else{
            console.error("mapRef is null");
        }

        setCoordinate({
            latitude: pressedLatitude,
            longitude: pressedLongitude,
        })
    }

    // Relative time threshold custom settings
    moment.relativeTimeThreshold('s', 60);
    moment.relativeTimeThreshold('ss', 0);

    //Screen of HomeStack
    return (
        <View>
            <MapView
                ref={mapRef}
                style={styles.mapStyle}
                initialRegion={region}
            >
                {
                    <Marker 
                        draggable 
                        coordinate={coordinate}
                        pinColor={'green'}
                        onDragEnd={(e) => setCoordinate(e.nativeEvent.coordinate) }
                        opacity={showMarkersList? 0: 1}
                    />
                }
                {
                    placeData.map(marker => (
                        <Marker 
                            key={marker.key}
                            coordinate={marker.coordinate}
                            opacity={showMarkersList? 1: 0}
                        />
                    ))
                }
            </MapView>
            
            <TouchableOpacity 
                style={ showMarkersList?
                    styles.choosePlaceButton :
                    styles.hideContainer
                } 
                onPress={ToggleMarker} 
            >
                <Text>장소 추가</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={ showMarkersList?
                    styles.hideContainer : styles.addPlaceButton
                } 
                onPress={GoInputNameScreen} 
            >
                <Text>추가</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={ showMarkersList?
                    styles.hideContainer : styles.cancelAddButton
                } 
                onPress={ToggleMarker} 
            >
                <Text>취소</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.openListButton} 
                onPress={ToggleList}
                activeOpacity={1}
            >
                <Text>목록 열기</Text>
            </TouchableOpacity>

            <View style={showList? 
                styles.showListContainer : styles.hideContainer
                }
            >
                <TouchableOpacity 
                    style={styles.closeListButton}
                    onPress={ToggleList}
                >
                    <Text>닫기</Text>
                </TouchableOpacity>

                <FlatList 
                    ListEmptyComponent={ EmptyList }
                    data={placeData}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            style={styles.placeList}
                            onPress={() => PressPlaceName
                                (item.coordinate.latitude, item.coordinate.longitude)
                            } 
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