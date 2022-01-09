import { useContext, useEffect } from "react"
import { authHandler, getGroups, getInventories } from "./functions"
import { store } from "./store"
import { ActionTypes, AuthProps, GroupProps, InventoryProps, UserType } from "./types"

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

export const useGetInventories = (
    setInventory: (data: InventoryProps[]) => void, 
    setFetching: (val:boolean) => void) => {
    
      useEffect(() => {
        getInventories(setInventory, setFetching)
      }, [])
}