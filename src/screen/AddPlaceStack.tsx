import React, { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../StackParamList';
import { RouteProp } from '@react-navigation/native';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { UsePlaceDataDispatch, PlaceData } from '../PlaceNameProvider';
import { styles } from '../style/stylesheet';
import moment from 'moment';

/*
  AddPlace Stack.Screen
*/
function AddPlace({
        navigation, 
        route
    }: {
        navigation: StackNavigationProp<StackParamList, 'AddPlace'>;
        route: RouteProp<StackParamList, 'AddPlace'>;
    }) {
    
    // 사용자로부터 입력받을 장소 이름
    const [newPlaceName, setNewPlaceName] = useState<string>('')

    // 장소 리스트 데이터에 허용된 action들로만 접근함.
    const disptach = UsePlaceDataDispatch();

    // 새로운 PlaceData를 List에 추가, 'Home'으로 이동
    const PressSave = () => {
        const newPlaceData:PlaceData = {
            key: moment().format(),
            placeName: newPlaceName,
            coordinate:{
                latitude: route.params.latitude,
                longitude: route.params.longitude,
            }
        }
        disptach({type:'Add', newPlaceData:newPlaceData})
        navigation.navigate('Home')
    }

    //Screen of AddPlaceStack
    return(
        <View style={styles.addPlaceContainer}>
            <View >
                <View style={styles.guideInput}>
                    <Text>새로운 장소 이름을 정하세요.</Text>
                </View>
                <TextInput
                    style={styles.inputPlaceName}
                    placeholder='장소 이름'
                    value={newPlaceName}
                    onChangeText={newPlaceName=>setNewPlaceName(newPlaceName)}
                >
                </TextInput>
            </View>
            <TouchableOpacity
                style={styles.saveButton} 
                onPress={PressSave} 
            >
                <Text>저장</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddPlace