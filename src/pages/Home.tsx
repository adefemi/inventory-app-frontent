import {FC} from 'react'
import Purchase from '../components/dashboard/purchases'
import SaleByShop from '../components/dashboard/saleByShop'
import SummaryData from '../components/dashboard/summaryData'
import TopSell from '../components/dashboard/topSellData'

const Home:FC = () => {

    return (
        <div>
            <SummaryData/>
            <br />
            <div className='dashboard-ui-st'>
                <TopSell />
                <div>
                    <SaleByShop />
                    <br />
                    <Purchase />
                </div>
            </div>
        </div>
    )
}


export default Home