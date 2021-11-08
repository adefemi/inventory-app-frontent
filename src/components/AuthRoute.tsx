import {FC, useState} from 'react'
import { logout } from '../utils/functions'
import { useAuth } from '../utils/hooks'

const AuthRoute:FC = ({children}) => {

    const [loading, setLoading] = useState(true)

    useAuth({
        successCallBack: () => {setLoading(false)},
        errorCallBack: () => {logout()}
    })

    if(loading){
        return <i>loading...</i>
    }

    return <>
        {children}
    </>
}


export default AuthRoute