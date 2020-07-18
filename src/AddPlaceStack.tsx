import React, { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from './StackParamList';
import { RouteProp } from '@react-navigation/native';
import { Center } from './CenterView';
import { Text, View } from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import { usePlaceDataDispatch, PlaceData } from './GlobalProvider';
import { styles } from './stylesheet';



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
            key: Date(),
            placeName: newPlaceName,
            coordinate:{
                latitude: route.params.latitude,
                longitude: route.params.longitude,
            }
        }
        disptach({type:'Add', newPlaceData:newPlaceData})
        navigation.navigate('Home')
    }
    
    const PressGoBack = () => {
        navigation.goBack();
    }

    return(
        <View style={styles.container}>
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
            <TouchableOpacity style={styles.addPlaceButton} onPress={PressAdd} >
                <Text>저장</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelAddButton}  onPress={PressGoBack} >
                <Text>뒤로가기</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddPlace