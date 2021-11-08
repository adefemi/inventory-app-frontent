import axios, {AxiosResponse} from "axios"
import { tokenName } from "./data"
import { MeUrl } from "./network"
import { AuthTokenType, UserType } from "./types"


export const getAuthToken = ():AuthTokenType | null => {
    const accessToken = localStorage.getItem(tokenName)
    if (!accessToken){
        return null
    }

    return {headers:{Authorization: `Bearer ${accessToken}`}}
}

export const logout = () => {
    localStorage.removeItem(tokenName)
    window.location.href = "/login"
}


export const authHandler = async ():Promise<UserType | null> => {
    const headers = getAuthToken()
    if(!headers){
        return null
    }

    const response:AxiosResponse = await axios.get(MeUrl, headers).catch(
        (e) => {}
    ) as AxiosResponse

    if(response){
        return response.data as UserType
    }

    return null
}