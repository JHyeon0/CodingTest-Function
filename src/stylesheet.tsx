import { StyleSheet, Dimensions } from 'react-native';

const windowWidth:number = Dimensions.get("window").width;
const windowHeight:number = Dimensions.get("window").height;

const styles = StyleSheet.create({

    ////////////   General   ////////////
    mapStyle: {
        width: windowWidth,
        height: windowHeight*0.8,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
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
        height: windowHeight*0.3,
        backgroundColor: 'white',
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    hideListContainer: {
        backgroundColor: 'white',
        height: windowHeight*0.1,
    },
    emptyList: {
        marginTop: windowHeight*0.10,
    },
    placeList: {
        backgroundColor: 'white',
        width: windowWidth,
        height: windowHeight*0.06,
        borderStyle: 'solid',
        borderColor: 'rgb(230, 230, 230)',
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },


    ////////////   Button   ////////////
    openListButton: {
        backgroundColor: 'white',
        height: windowHeight*0.1,
    },
    closeListButton: {
        backgroundColor: '#FFBBAC',
        width: windowWidth,
        height: windowHeight*0.06,
        top: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addPlaceButton_Home: {
        backgroundColor: '#FFBBAC',
        height: windowHeight*0.1,
    },
    cancelAddButton: {
        backgroundColor: 'white',
        height: windowHeight*0.1,
    },
    addPlaceButton: {
        backgroundColor: '#FFBBAC',
        height: windowHeight*0.1,
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
    cancelSaveButton: {
        backgroundColor: '#FFBBAC',
        color: 'white',
        padding: 10,
        width: windowWidth,
        height: windowHeight*0.2,
        top: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    },


 });

export { styles };
