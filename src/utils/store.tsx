import { createContext, FC, useReducer } from "react"
import { ActionProps, ActionTypes, StoreProps, StoreProviderProps } from "./types"

const initialState: StoreProps = {
    user: null
}

const appReducer = (
    state: StoreProps,
    action: ActionProps): StoreProps => {

    if (action.type === ActionTypes.UPDATE_USER_INFO) {
        return {
            ...state,
            user: action.payload
        }
    }

    return state
}

export const store = createContext<StoreProviderProps>({state:initialState, dispatch:() => null})

const StoreProvider: FC = ({ children }) => {

    const [state, dispatch] = useReducer(appReducer, initialState)

    const {Provider} = store

    return <Provider value={{state, dispatch}}>{children}</Provider>

}

export default StoreProvider