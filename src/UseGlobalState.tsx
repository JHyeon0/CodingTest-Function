import { useState } from 'react';


const useGlobalState = () => {
    const [globalState, globalDispatch] = useState();

    return { globalState, globalDispatch }
}

export default useGlobalState;