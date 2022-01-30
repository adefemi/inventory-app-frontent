import { useEffect, useState } from "react"
import { axiosRequest } from "../../utils/functions"
import { TopSellUrl } from "../../utils/network"
import {Spin} from 'antd'
import { InventoryProps } from "../../utils/types"


const TopSell = () => {

    const [data, setData] = useState<InventoryProps[]>([])
    const [loading, setLoading] = useState(true)

    const getTopSellData = async () => {
        const response = await axiosRequest<InventoryProps[]>({
            url: TopSellUrl,
            hasAuth: true,
        })
        setLoading(false)
        if(response){
            const data = response.data.map(item => ({
                ...item, groupInfo: item.group.name, 
                photoInfo: item.photo
            }))
            setData(data)
            setLoading(false)
        }
    }

    useEffect(() => {
        getTopSellData()
    }, [])

    return <div className="card">
        <h3>Top Selling Items</h3>
        <div className="topSellContainer">
        {
            loading ? <Spin /> :
            data.map((item, index) => <div key={index} className="topSellItem">
                <div className="imageCon">
                    <img src={item.photo} alt="" />
                </div>
                <h3>{item.name}</h3>
                <h4><span>Total Sold: </span>{item.total}</h4>
            </div>)
        }
    </div>
    </div>
}

export default TopSell