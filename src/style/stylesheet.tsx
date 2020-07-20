import { StyleSheet, Dimensions } from 'react-native';

// 화면 가로, 세로에 대한
const windowWidth:number = Dimensions.get("window").width;
const windowHeight:number = Dimensions.get("window").height;

const styles = StyleSheet.create({

    ////////////   General   ////////////
    mapStyle: {
        position: 'relative',
        width: windowWidth,
        height: windowHeight,
    },
    addPlaceContainer: {
        flex: 1,
    },
    inputPlaceName:{
        padding: 10,
        margin: 10,
    },
    guideInput:{
        padding: 10,
        margin: 10,
    },

    ////////////   Place List View   ////////////
    showListContainer: {
        position: 'absolute',
        width: windowWidth,
        height: windowHeight*0.4,
        backgroundColor: 'white',
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    hideContainer: {
        display: 'none'
    },
    emptyList: {
        marginTop: windowHeight*0.15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    placeList: {
        flexDirection: 'row',
        backgroundColor: 'white',
        width: windowWidth,
        height: windowHeight*0.06,
        borderStyle: 'solid',
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgb(200,200,00)',
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    ////////////   Button   ////////////
    openListButton: {
        position: 'absolute',
        bottom: 0,
        width: windowWidth,
        backgroundColor: 'white',
        height: windowHeight*0.06,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeListButton: {
        backgroundColor: '#FFBBAC',
        width: windowWidth,
        height: windowHeight*0.06,
        top: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    choosePlaceButton: {
        position: 'absolute',
        bottom: '10%',
        right: '7%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFBBAC',
        padding: 10,
        paddingHorizontal: 30,
    },
    cancelAddButton: {
        position: 'absolute',
        bottom: '10%',
        right: '5%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 5,
        paddingHorizontal: 50,
    },
    addPlaceButton: {
        position: 'absolute',
        bottom: '10%',
        left: '5%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFBBAC',
        padding: 10,
        paddingVertical: 5,
        paddingHorizontal: 50,
    },
    saveButton: {
        backgroundColor: '#FFBBAC',
        color: 'white',
        padding: 10,
        width: windowWidth,
        height: windowHeight*0.06,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },

 });

export { styles };
