import { useContext, useEffect } from "react"
import { authHandler } from "./functions"
import { store } from "./store"
import { ActionTypes, AuthProps, UserType } from "./types"

export const useAuth = async (
    {
        errorCallBack, 
        successCallBack
    }:AuthProps) => {

    const {dispatch} = useContext(store)

    useEffect(() => {
        const checkUser = async () => {
            const user:UserType | null = await authHandler()
            if(!user){
                if(errorCallBack){
                    errorCallBack()
                }
                return
            }
            if(successCallBack){
                dispatch({type: ActionTypes.UPDATE_USER_INFO, payload: user})
                successCallBack()
            }
        }
        checkUser()
    }, [])
}