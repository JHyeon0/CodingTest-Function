import React, { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../StackParamList';
import { RouteProp } from '@react-navigation/native';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { usePlaceDataDispatch, PlaceData } from '../PlaceNameProvider';
import { styles } from '../style/stylesheet';
import moment from 'moment';


function AddPlace({
        navigation, 
        route
    }: {
        navigation: StackNavigationProp<StackParamList, 'AddPlace'>;
        route: RouteProp<StackParamList, 'AddPlace'>;
    }) {
    
    const [newPlaceName, setNewPlaceName] = useState<string>('')

    const disptach = usePlaceDataDispatch();

    const PressAdd = () => {
        const newPlaceData:PlaceData = {
            key: moment().format(),
            placeName: newPlaceName,
            coordinate:{
                latitude: route.params.latitude,
                longitude: route.params.longitude,
            }
        }
        disptach({type:'Add', newPlaceData:newPlaceData})
        navigation.navigate('NewHome')
    }

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
                onPress={PressAdd} 
            >
                <Text>저장</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddPlace