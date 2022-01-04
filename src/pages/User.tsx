import {FC, useState} from 'react'
import AddUserForm from '../components/AddUserForm';
import { axiosRequest } from '../utils/functions';
import { UsersUrl } from '../utils/network';
import { useEffect } from 'react';
import ContentLayout from '../components/ContentLayout';
import { DataProps } from '../utils/types';

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
    const [users, setUsers] = useState<UserProps[]>([])
      
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
      const response = await axiosRequest<{results: UserProps[]}>({
        url: UsersUrl,
        hasAuth: true,
        showError: false
      })

      if(response){
        const data = response.data.results.map(
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
        <ContentLayout
          pageTitle="User"
          setModalState={setModalState}
          dataSource={(users as unknown) as DataProps[]}
          columns={columns}
          fetching={fetching}
        >
          <AddUserForm 
            onSuccessCallBack={onCreateUser} 
            isVisible={modalState}
            onClose={() => setModalState(false)}
          />
        </ContentLayout>
    )
}


export default User