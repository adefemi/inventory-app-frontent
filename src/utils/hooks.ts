import { useContext, useEffect } from "react"
import { authHandler, axiosRequest, getGroups } from "./functions"
import { GroupUrl } from "./network"
import { store } from "./store"
import { ActionTypes, AuthProps, GroupProps, UserType } from "./types"

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

export const useGetGroups = (
    setGroup: (data: GroupProps[]) => void, 
    setFetching: (val:boolean) => void) => {
    
      useEffect(() => {
        getGroups(setGroup, setFetching)
      }, [])
}