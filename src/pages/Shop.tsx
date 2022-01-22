import {FC, useState} from 'react'
import { getShops } from '../utils/functions';
import ContentLayout from '../components/ContentLayout';
import { DataProps, ShopProps } from '../utils/types';
import AddShopForm from '../components/AddShopForm';
import { useGetShops } from '../utils/hooks';

const Shop:FC = () => {

    const [modalState, setModalState] = useState(false)
    const [fetching, setFetching] = useState(true)
    const [shops, setShops] = useState<ShopProps[]>([])
      
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
        title: 'Created By',
        dataIndex: 'created_by_email',
        key: 'created_by_email',
      },
      {
        title: 'Created At',
        dataIndex: 'created_at',
        key: 'created_at',
      },
      {
        title: 'Actions',
        dataIndex: 'actions',
        key: 'actions',
      },
    ];

    useGetShops(setShops, setFetching)

    const onCreateUser = () => {
      setModalState(false)
      setFetching(true)
      getShops(setShops, setFetching)
    }

    return (
        <ContentLayout
          pageTitle="Shop"
          setModalState={setModalState}
          dataSource={(shops as unknown) as DataProps[]}
          columns={columns}
          fetching={fetching}
        >
          <AddShopForm 
            onSuccessCallBack={onCreateUser} 
            isVisible={modalState}
            onClose={() => setModalState(false)}
          />
        </ContentLayout>
    )
}


export default Shop