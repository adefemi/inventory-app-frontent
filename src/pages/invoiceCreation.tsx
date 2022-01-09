import {ChangeEvent, FC, useState} from 'react'
import { DataProps, InventoryProps, invoiceCreationAddRemoveProps, InvoiceCreationProps } from '../utils/types';
import { useGetInventories } from '../utils/hooks';
import { Button, Input, Table, notification} from 'antd';
import { formatInventoryPhoto } from './Inventories';

const formatInventoryAction = (inventories: DataProps[], 
    onAddItem: (inventoryData: InventoryProps) => void, 
    onChangeQty: (value: number, inventory_id:number) => void
    ) => {
    return inventories.map(item => (
      {
        ...item,
        key: item.id,
        action: <div>
            <Input 
                type="number" 
                min={1} 
                max={(item.remaining as number)} 
                defaultValue={1}
                onChange={(e:ChangeEvent<HTMLInputElement>) => onChangeQty(parseInt(e.target.value), (item.id as number) )}
            />
            <Button onClick={() => onAddItem((item as unknown) as InventoryProps)}>Add</Button>
        </div>
      }
    ))
  }

const formatInvoiceDataAction = (invoiceData: InvoiceCreationProps[], 
    onRemoveItem: (inventoryId: number) => void, 
    onChangeQty: (value: number, inventory_id:number) => void
    ) => {
    return invoiceData.map(item => (
      {
        ...item,
        key: item.id,
        action: <div>
        <Input 
            type="number" 
            min={1} 
            max={item.qty} 
            defaultValue={1}
            onChange={(e:ChangeEvent<HTMLInputElement>) => onChangeQty(parseInt(e.target.value), (item.id) )}
        />
        <Button onClick={() => onRemoveItem(item.id)}>Remove</Button>
        </div>
      }
    ))
  }

const InvoiceCreation:FC = () => {
    const [fetching, setFetching] = useState(true)
    const [inventories, setInventories] = useState<InventoryProps[]>([])
    const [invoiceData, setInvoiceData] = useState<InvoiceCreationProps[]>([])
    const [invoiceItemQty, setInvoiceItemQty] = useState<invoiceCreationAddRemoveProps>({})
    const [invoiceItemDataQty, setInvoiceItemDataQty] = useState<invoiceCreationAddRemoveProps>({})
      
    const inventory_columns = [
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
        title: 'Actions',
        dataIndex: 'action',
        key: 'action',
      },
    ];

    const invoice_columns = [
        {
            title: 'Item',
            dataIndex: 'item',
            key: 'item',
          },
          {
            title: 'Qty',
            dataIndex: 'qty',
            key: 'qty',
          },
          {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
          },
          {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
          },
          {
            title: 'Actions',
            dataIndex: 'action',
            key: 'action',
          },
    ]

    useGetInventories(setInventories, setFetching)

    const addItemtoInvoiceData = (inventoryData: InventoryProps) => {
        const qty = invoiceItemQty[inventoryData.id] || 1
        let _invoiceData:InvoiceCreationProps[] = []
        let qtyFlag = false;

        const item = invoiceData.filter(item => item.id === inventoryData.id)
        if(item.length > 0){
          _invoiceData = invoiceData.map(item => {
            if(item.id === inventoryData.id){
              const _qty = item.qty + qty
              if(_qty > inventoryData.remaining){
                qtyFlag = true
              }
              return {
                ...item,
                qty: _qty
              }
            }
            return item
          })
        }
        else{
          const _tempInvoiceData:InvoiceCreationProps = {
              id: inventoryData.id,
              item: inventoryData.name,
              qty,
              price: inventoryData.price,
              total: inventoryData.price * qty,
          }
          if(qty > inventoryData.remaining){
            qtyFlag = true
          }
          _invoiceData = [...invoiceData, _tempInvoiceData]
        }

        if(qtyFlag){
          notification.error({
            message: "Not enough item remaining"
          })
          return
        }
        
        setInvoiceData(_invoiceData)
    }

    const removeItemFromInvoiceData = (inventoryId: number) => {
      const qty = invoiceItemDataQty[inventoryId] || 1
      let _invoiceData:InvoiceCreationProps[] = []

      const item = invoiceData.filter(item => item.id === inventoryId)[0]
      if(qty >= item.qty){
        _invoiceData = invoiceData.filter(item => item.id !== inventoryId)
      }
      else{
        _invoiceData = invoiceData.map(item => {
          if(item.id === inventoryId){
            return {
              ...item,
              qty: item.qty - qty
            }
          }
          return item
        })
      }
      setInvoiceData(_invoiceData)
    }

    const changeInventoryQty = (value: number, inventory_id:number) => {
        setInvoiceItemQty({
            ...invoiceItemQty,
            [inventory_id]: value
        })
    }

    const changeInventoryRemoveQty = (value: number, inventory_id:number) => {
      setInvoiceItemDataQty({
          ...invoiceItemQty,
          [inventory_id]: value
      })
  }

    return (
     <div className="invoice-creation">
         <div className="card">
            <div className="cardHeader">
                <h1 className="headContent">Inventory Management</h1>
                <div className="rightContent">
                    <div className="searchInput">
                        <input type="text" />
                    </div>
                </div>
            </div>
            <br />
            <Table
                dataSource={formatInventoryAction(formatInventoryPhoto(inventories), addItemtoInvoiceData, changeInventoryQty)} 
                columns={inventory_columns} 
                loading={fetching} />
         </div>
         <div>
            <div className="card">
                <Table
                    dataSource={formatInvoiceDataAction(
                      invoiceData, 
                      removeItemFromInvoiceData,
                      changeInventoryRemoveQty,
                    )} 
                    columns={invoice_columns} 
                />
            </div>
         </div>
     </div>
    )
}


export default InvoiceCreation