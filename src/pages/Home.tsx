import {FC, useContext} from 'react'
import SummaryData from '../components/dashboard/summaryData'
import { store } from '../utils/store'

const Home:FC = () => {

    const {state} = useContext(store)

    return (
        <div>
            <SummaryData/>
        </div>
    )
}


export default Home