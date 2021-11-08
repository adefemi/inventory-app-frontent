import { FC, useState } from 'react'
import AuthComponent from '../components/AuthComponent'
import { CustomAxiosError, DataProps } from '../utils/types'
import { tokenName } from '../utils/data'
import axios from 'axios'
import { LoginUrl } from '../utils/network'
import { notification } from 'antd'
import {useHistory} from 'react-router-dom'
import { useAuth } from '../utils/hooks'

interface LoginDataProps {
    data: {
        access: string
    }
}

const Login: FC = () => {

    const [loading, setLoading] = useState(false)
    const history = useHistory()

    useAuth({
        successCallBack: () => {
            history.push("/")
        }
    })

    const onSubmit = async (values: DataProps) => {
       setLoading(true)
       const response: LoginDataProps = await axios.post(LoginUrl, values).catch(
           (e:CustomAxiosError) => {
               notification.error({
                   message:"Login Error",
                   description: e.response?.data.error
               })
           }
       ) as LoginDataProps
       if(response){
           localStorage.setItem(tokenName, response.data.access)
           history.push("/")
       }
       setLoading(false)
    }

    return <AuthComponent onSubmit={onSubmit} loading={loading}/>        
}

export default Login