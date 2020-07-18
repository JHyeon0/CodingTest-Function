import React, {useReducer, createContext, Dispatch, useContext} from 'react';


// 장소에 대한 정보이며, key에는 장소 정보를 등록한 현재 시간을 넣는다.
export type PlaceData = {
    key: string;
    placeName: string;
    coordinate: {
        latitude: number;
        longitude: number;
    }
};

export type PlaceDataArray = PlaceData[]; 

// PlaceDataArray에 접근하여 Read할 수 있다.
const PlaceDataArrayContext = createContext<PlaceDataArray | undefined>(undefined);

//PlaceDataArray에 적용할 함수들. Add 이외에, 삭제, 이름 수정 기능 등 더 추가해도 됨.
type Action = 
    | { type: 'Add'; newPlaceData: PlaceData }
    | { type: 'Reverse' }

type PlaceDataDispatch = Dispatch<Action>;

//PlaceDataArray에 접근하여 여러가지 기능을 수행할 수 있다.
const placeDataDispatchContext = createContext<PlaceDataDispatch | undefined>(undefined);

//Action에 대한 기능 구현.
function PlaceDataReducer(array: PlaceDataArray, action: Action): PlaceDataArray {
    switch (action.type) {
        case "Add":
            return array.concat(action.newPlaceData)
        case 'Reverse':
            return array.reverse()
        default:
            throw new Error('Action Error');
    }
    
}

// Context Provider.
export function PlaceDataContextProvider({ children }: { children: React.ReactNode }) {
    const [placeData, dispatch] = useReducer(PlaceDataReducer, []);

    return(
        <placeDataDispatchContext.Provider value={dispatch}>
            <PlaceDataArrayContext.Provider value={placeData}>
                {children}
            </PlaceDataArrayContext.Provider>
        </placeDataDispatchContext.Provider>
    )
}


//PlaceDataArray가 비어있을 때 undefined일 수 있으므로 해당 값이 유효한지 확인.
export function usePlaceDataArray(){
    const array = useContext(PlaceDataArrayContext);
    if (!array) throw new Error('Error: PlaceDataProvider not found');
    return array;
}

export function usePlaceDataDispatch(){
    const dispatch = useContext(placeDataDispatchContext);
    if (!dispatch) throw new Error('Error: PlaceDataProvider not found');
    return dispatch;
}