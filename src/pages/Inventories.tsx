import {FC, useState} from 'react'
import { axiosRequest } from '../utils/functions';
import { GroupUrl, InventoryUrl } from '../utils/network';
import { useEffect } from 'react';
import ContentLayout from '../components/ContentLayout';
import { DataProps, GroupProps, InventoryProps } from '../utils/types';
import { useGetGroups } from '../utils/hooks';
import AddInventoryForm from '../components/AddInventoryForm';

const Inventories:FC = () => {

    const [modalState, setModalState] = useState(false)
    const [fetching, setFetching] = useState(true)
    const [groups, setGroups] = useState<GroupProps[]>([])
    const [inventories, setInventories] = useState<InventoryProps[]>([])

    useGetGroups(setGroups, () => null)
      
    const columns = [
      {
        title: 'Code',
        dataIndex: 'code',
        key: 'code',
      },
      {
        title: 'Photo',
        dataIndex: 'photoInfo',
        key: 'photoInfo',
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Category',
        dataIndex: 'groupInfo',
        key: 'groupInfo',
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: 'Remaining',
        dataIndex: 'remaining',
        key: 'remaining',
      },
      {
        title: 'Added On',
        dataIndex: 'created_at',
        key: 'created_at',
      },
      {
        title: 'Actions',
        dataIndex: 'action',
        key: 'action',
      },
    ];

    const getInventories = async () => {
      const response = await axiosRequest<{results:InventoryProps[]}>({
        url: InventoryUrl,
        hasAuth: true,
        showError: false
      })
  
      if(response){
        const data = response.data.results.map(item => ({
          ...item, groupInfo: item.group.name, 
          photoInfo: <div 
            className="imageView" 
            style={{
                backgroundImage: `url(${item.photo})`,
                width: "50px",
                height: "50px"
            }}
          />
        }))
        setInventories(data)
        setFetching(false)
      }
    }

    useEffect(() => {
      getInventories()
    }, [])

    const onCreateInventory = () => {
      setModalState(false)
      setFetching(true)
      getInventories()
    }

    return (
      <ContentLayout
        pageTitle="Inventory"
        setModalState={setModalState}
        dataSource={(inventories as unknown) as DataProps[]}
        columns={columns}
        fetching={fetching}
        customName="Inventories"
      >
        <AddInventoryForm 
          onSuccessCallBack={onCreateInventory} 
          isVisible={modalState}
          onClose={() => setModalState(false)}
          groups={groups}
        />
      </ContentLayout>
    )
}


export default Inventories