export type StackParamList = {
    Home: {
        key: string | undefined;
        placeName: string | undefined;
        latitude: number;
        longitude: number;
        canIAdd: boolean | undefined;
    };
    SelectPlace: {
        latitude: number;
        longitude: number;
        latitudeDelta: number;
        longitudeDelta: number;
    }
    AddPlace: {
        latitude: number;
        longitude: number;
    };
}