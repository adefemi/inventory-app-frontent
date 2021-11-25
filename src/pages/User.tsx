import { Table, notification } from 'antd';
import {FC, useState} from 'react'
import AddUserForm from '../components/AddUserForm';
import { getAuthToken } from '../utils/functions';
import { AuthTokenType } from '../utils/types';
import axios, {AxiosResponse} from 'axios'
import { UsersUrl } from '../utils/network';
import { useEffect } from 'react';

interface UserProps {
  created_at: string
  email: string
  fullname: string
  is_active: string
  last_login: string
  role: string
  key?: number
  id: number
}

const User:FC = () => {

    const [modalState, setModalState] = useState(false)
    const [fetching, setFetching] = useState(true)
    const [users, setUsers] = useState<UserProps[]>()
      
    const columns = [
      {
        title: 'ID',
        dataIndex: 'key',
        key: 'key',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Name',
        dataIndex: 'fullname',
        key: 'fullname',
      },
      {
        title: 'Is Active',
        dataIndex: 'is_active',
        key: 'is_active',
      },
      {
        title: 'Last Login',
        dataIndex: 'last_login',
        key: 'last_login',
      },
      {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
      },
      {
        title: 'Created At',
        dataIndex: 'created_at',
        key: 'created_at',
      },
    ];

    const getUsers = async () => {
      const headers = getAuthToken() as AuthTokenType

      const response:AxiosResponse = await axios.get
        (UsersUrl, headers).catch(
            (e) => {
                notification.error({
                    message:"Operation Error",
                    description: e.response?.data.error
                })
            }
        ) as AxiosResponse

      if(response){
        const data = (response.data as UserProps[]).map(
          (item) => 
          ({...item, key:item.id, is_active: item.is_active.toString()}))
        setUsers(data)
        setFetching(false)
      }
    }

    useEffect(() => {
      getUsers()
    }, [])

    const onCreateUser = () => {
      setModalState(false)
      setFetching(true)
      getUsers()
    }

    return (
        <>
          <div className="card">
            <div className="cardHeader">
                <h1 className="headContent">User</h1>
                <div className="rightContent">
                    <div className="searchInput">
                        <input type="text" />
                    </div>
                    <button onClick={() => setModalState(true)}>
                        Add User
                    </button>
                </div>
            </div>

            <br/>

            <Table 
              dataSource={users} 
              columns={columns} 
              loading={fetching} />

          </div>

          <AddUserForm 
            onSuccessCallBack={onCreateUser} 
            isVisible={modalState}
            onClose={() => setModalState(false)}
          />
        </>
    )
}


export default User