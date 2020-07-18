import React, { useState } from 'react';
import { StackNavigationProp } from "@react-navigation/stack"
import { StackParamList } from "./StackParamList"
import MapView, { Marker } from 'react-native-maps';
import { Text, View } from "react-native"
import { TouchableOpacity, FlatList } from "react-native-gesture-handler"
import { styles } from './stylesheet'
import { usePlaceDataArray, PlaceDataArray } from './GlobalProvider'


interface locationData{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}

function Home({
        navigation, 
        //route
    }: {
        navigation: StackNavigationProp<StackParamList, 'Home'>;
        //route: RouteProp<StackParamList, 'Home'>;
    }) {
        
    //장소 리스트 데이터    
    const placeData: PlaceDataArray = usePlaceDataArray();
    
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
        // animation 기능 구현 해야함
        // this.map.animateToRegion(pressedPlaceName, 500)
    }

    return (
        <View>
            <MapView
                // animation 기능 구현 해야함
                //ref={(map)=>{this.map = map;}}
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
                <Text>장소추가</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.openListButton} 
                onPress={()=>{ setShowList(!showList)}} 
            >
                <Text>열기</Text>
            </TouchableOpacity>

            <View style={showList? styles.showListContainer : styles.hideListContainer}>
                <TouchableOpacity 
                    onPress={()=>{setShowList(!showList)}} 
                >
                    <Text>닫기</Text>
                </TouchableOpacity>

                <FlatList 
                    ListEmptyComponent={<View><Text>장소가 없습니다.</Text></View>}
                    data={placeData}
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