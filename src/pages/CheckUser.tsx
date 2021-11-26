import { FC, useContext, useState } from 'react'
import AuthComponent from '../components/AuthComponent'
import { LoginUrl } from '../utils/network'
import { ActionTypes, DataProps } from '../utils/types'
import { useAuth } from '../utils/hooks'
import { useHistory } from 'react-router-dom'
import { axiosRequest } from '../utils/functions'
import { store } from '../utils/store'

interface CheckUserProps {
    user_id: number
}

const CheckUser: FC = () => {

    const [loading, setLoading] = useState(false)
    const {dispatch} = useContext(store)

    const history = useHistory()

    useAuth({
        successCallBack: () => {
            history.push("/")
        }
    })

    const onSubmit = async (values: DataProps) => {
       setLoading(true)
       const response = await axiosRequest<CheckUserProps>({
           method: 'post',
           url: LoginUrl,
           payload: {...values, is_new_user: true}
       })
       if(response){
           dispatch({
               type:ActionTypes.UPDATE_PASSWORD_USER_ID, 
               payload:response.data.user_id
            })
            history.push("/create-password")
       }
       setLoading(false)
    }

    return <AuthComponent
        titleText="Verify Yourself!"
        bottonText="Submit"
        linkText="Go Back"
        isPassword={false}
        linkPath="/login"
        loading={loading}
        onSubmit={onSubmit}
    />
}

export default CheckUser