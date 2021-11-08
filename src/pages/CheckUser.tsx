import { FC, useState } from 'react'
import AuthComponent from '../components/AuthComponent'
import { LoginUrl } from '../utils/network'
import { CustomAxiosError, DataProps } from '../utils/types'
import axios from 'axios'
import { notification } from 'antd'
import { useAuth } from '../utils/hooks'
import { useHistory } from 'react-router-dom'

const CheckUser: FC = () => {

    const [loading, setLoading] = useState(false)

    const history = useHistory()

    useAuth({
        successCallBack: () => {
            history.push("/")
        }
    })

    const onSubmit = async (values: DataProps) => {
       setLoading(true)
       const response = await axios.post(LoginUrl, {...values, is_new_user: true}).catch(
           (e:CustomAxiosError) => {
               notification.error({
                   message:"User Check Error",
                   description: e.response?.data.error
               })
           }
       )
       if(response){
           console.log("Check completed")
       }
       setLoading(false)
    }

    return <AuthComponent
        titleText="Verify Yourself!"
        bottonText="Submit"
        linkText="Go Back"
        isPassword={false}
        linkPath="/login"
        onSubmit={onSubmit}
    />
}

export default CheckUser