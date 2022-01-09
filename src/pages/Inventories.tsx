import {FC, useState} from 'react'
import { getInventories } from '../utils/functions';
import ContentLayout from '../components/ContentLayout';
import { DataProps, GroupProps, InventoryProps } from '../utils/types';
import { useGetGroups, useGetInventories } from '../utils/hooks';
import AddInventoryForm from '../components/AddInventoryForm';
import { Button } from 'antd';
import AddInventoryFormCSV from '../components/AddInventoryFormCSV';

enum ModalState {
  addItem,
  addItemCSV,
  off
}

export const formatInventoryPhoto = (inventories: InventoryProps[]) => {
  return inventories.map(item => (
    {
      ...item,
      photoInfo: <div 
          className="imageView" 
          style={{
              backgroundImage: `url(${item.photo})`,
              width: "50px",
              height: "50px"
          }}
      />
    }
  ))
}

const Inventories:FC = () => {

    const [modalState, setModalState] = useState<ModalState>(ModalState.off)
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

    useGetInventories(setInventories, setFetching)

    const onCreateInventory = () => {
      setModalState(ModalState.off)
      setFetching(true)
      getInventories(setInventories, setFetching)
    }

    return (
      <ContentLayout
        pageTitle="Inventory"
        setModalState={() => setModalState(ModalState.addItem)}
        dataSource={(formatInventoryPhoto(inventories) as unknown) as DataProps[]}
        columns={columns}
        fetching={fetching}
        customName="Inventories"
        extraButton={<Button type='primary' onClick={() => setModalState(ModalState.addItemCSV)}>Add items (CSV)</Button>}
      >
        <AddInventoryForm 
          onSuccessCallBack={onCreateInventory} 
          isVisible={modalState === ModalState.addItem}
          onClose={() => setModalState(ModalState.off)}
          groups={groups}
        />
        <AddInventoryFormCSV 
          onSuccessCallBack={onCreateInventory} 
          isVisible={modalState === ModalState.addItemCSV}
          onClose={() => setModalState(ModalState.off)}
        />
      </ContentLayout>
    )
}


export default Inventories