import { useEffect } from "react"
import { authHandler } from "./functions"
import { authHookProps, UserType } from "./types"


export const useAuth = ({successCallBack, errorCallBack}:authHookProps) => {
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
                successCallBack()
            }
        }
        checkUser()
    }, [])

}