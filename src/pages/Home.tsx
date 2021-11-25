import {FC, useContext} from 'react'
import { store } from '../utils/store'

const Home:FC = () => {

    const {state} = useContext(store)

    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}


export default Home