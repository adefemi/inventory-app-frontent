import {FC, useState} from 'react'
import { axiosRequest } from '../utils/functions';
import { GroupUrl } from '../utils/network';
import { useEffect } from 'react';
import ContentLayout from '../components/ContentLayout';
import { DataProps, GroupProps } from '../utils/types';
import AddGroupForm from '../components/AddGroupForm';

const Groups:FC = () => {

    const [modalState, setModalState] = useState(false)
    const [fetching, setFetching] = useState(true)
    const [groups, setGroups] = useState<GroupProps[]>([])
      
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Belongs To (Another Group)',
        dataIndex: 'belongsTo',
        key: 'belongsTo',
      },
      {
        title: 'Created At',
        dataIndex: 'created_at',
        key: 'created_at',
      },
      {
        title: 'Total Items',
        dataIndex: 'total_items',
        key: 'total_items',
      },
      {
        title: 'Actions',
        dataIndex: 'action',
        key: 'action',
      },
    ];

    const getGroups = async () => {
      const response = await axiosRequest<{results:GroupProps[]}>({
        url: GroupUrl,
        hasAuth: true,
        showError: false
      })

      if(response){
        const data = response.data.results.map(item => ({
          ...item, belongsTo: item.belongs_to ? 
          item.belongs_to.name : "Not defined"
        }))
        setGroups(data)
        setFetching(false)
      }
    }

    useEffect(() => {
      getGroups()
    }, [])

    const onCreateGroup = () => {
      setModalState(false)
      setFetching(true)
      getGroups()
    }

    return (
      <ContentLayout
        pageTitle="Group"
        setModalState={setModalState}
        dataSource={(groups as unknown) as DataProps[]}
        columns={columns}
        fetching={fetching}
      >
        <AddGroupForm 
          onSuccessCallBack={onCreateGroup} 
          isVisible={modalState}
          onClose={() => setModalState(false)}
          groups={groups}
        />
      </ContentLayout>
    )
}


export default Groups