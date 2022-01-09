import {ChangeEvent, FC, useState} from 'react'
import { DataProps, InventoryProps, InvoiceCreationProps } from '../utils/types';
import { useGetInventories } from '../utils/hooks';
import { Button, Input, Table } from 'antd';
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

const InvoiceCreation:FC = () => {
    const [fetching, setFetching] = useState(true)
    const [inventories, setInventories] = useState<InventoryProps[]>([])
    const [invoiceData, setInvoiceData] = useState<InvoiceCreationProps[]>([])
    const [invoiceItemQty, setInvoiceItemQty] = useState<{[key: number]: number}>({})
      
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
        const qty = invoiceItemQty[inventoryData.id] | 1
        const _tempInvoiceData:InvoiceCreationProps = {
            id: inventoryData.id,
            item: inventoryData.name,
            qty,
            price: inventoryData.price,
            total: inventoryData.price * qty,
            action: <div>
            <Input 
                type="number" 
                min={1} 
                max={qty} 
                defaultValue={1}
            />
            <Button>Remove</Button>
        </div>
        }
        setInvoiceData([...invoiceData, _tempInvoiceData])
    }

    const changeInventoryQty = (value: number, inventory_id:number) => {
        setInvoiceItemQty({
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
                    dataSource={invoiceData} 
                    columns={invoice_columns} 
                />
            </div>
         </div>
     </div>
    )
}


export default InvoiceCreation