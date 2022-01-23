import {ChangeEvent, FC, useState, useRef} from 'react'
import { DataProps, InventoryProps, invoiceCreationAddRemoveProps, InvoiceCreationProps, ShopProps } from '../utils/types';
import { useGetInventories, useGetShops } from '../utils/hooks';
import { Button, Input, Table, notification} from 'antd';
import { formatInventoryPhoto } from './Inventories';
import SelectShop from '../components/SelectShop';
import { axiosRequest, getTotal } from '../utils/functions';
import { InvoiceUrl } from '../utils/network';
import { useReactToPrint } from 'react-to-print';
import PrintOut from '../components/printOut';

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
        total: item.price * item.qty,
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
    const [shops, setShops] = useState<ShopProps[]>([])
    const [selectShopVisible, setSelectShopVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [canPrintOut, setCanPrintOut] = useState(false)

    const printOutRef = useRef<any>()

    useGetShops(setShops, () => null)
      
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

    const handlePrint = useReactToPrint({
      content: () => printOutRef.current,
    });

    const clearInvoiceData = () => {
      setInvoiceData([])
      setInvoiceItemDataQty({})
    }

    const submitInvoice = async (data?:number) => {
      setSelectShopVisible(false)
      const dataToSend = {
        shop_id: data as number,
        invoice_item_data: invoiceData.map(item => ({
          item_id: item.id,
          quantity: item.qty
        }))
      }
      setLoading(true)
      const response = await axiosRequest({
          method:"post",
          url: InvoiceUrl,
          hasAuth: true,
          payload: dataToSend
      })
      setLoading(false)

      if(response){
          notification.success({
              message:"Operation Success",
              description: "Invoice created successfully"
          })
      }
      setCanPrintOut(true)
      handlePrint()
      setCanPrintOut(false)
      clearInvoiceData()
    }

    const getShopID = () => {
      if(invoiceData.length < 1){
        notification.error({
          message:"You need to have an invoice item first"
        })
        return
      }
      setSelectShopVisible(true)
    }

    const getTime = () => {
      const date = new Date()
      return date.getFullYear()
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
                    pagination={false}
                />
                <div className='contentContainer'>
                  <div className="contentHolder">
                    <div className="info">Date</div>
                    <div className="content">{getTime()}</div>
                  </div>
                  <div className="contentHolder">
                    <div className="info">Total</div>
                    <div className="content">{getTotal(invoiceData)}</div>
                  </div>
                </div>
            </div>
            <br />
            <div>
              <Button type='primary' onClick={getShopID} loading={loading}>Save & Print</Button> &nbsp;&nbsp;
              <Button danger onClick={clearInvoiceData}>Clear</Button>
            </div>
         </div>
         <SelectShop 
          isVisible={selectShopVisible}
          onSuccessCallBack={submitInvoice}
          onClose={() => setSelectShopVisible(false)}
          shops={shops}
         />
         <div ref={printOutRef}>
          {canPrintOut && <PrintOut data={invoiceData}  />}
         </div>
     </div>
    )
}


export default InvoiceCreation