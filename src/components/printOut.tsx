import {FC} from 'react'
import { getTotal } from '../utils/functions'
import { InvoiceCreationProps } from '../utils/types'

const PrintOut:FC<{data: InvoiceCreationProps[]}> = ({data}) => {
    const stars = <div style={{display: 'flex', fontSize: '18px', fontWeight: 'bold'}}>
        {Array.from({length: 30}, (_, index) => <div key={index}>*</div>)}      
    </div>

    return <div style={{width: '250px'}}>
        {stars}
        <h3 style={{textAlign: 'center'}}>INVOICE</h3>
        {stars}
        <div style={{display: 'flex', alignItems:"center", 
                justifyContent:"space-between", fontSize: '11px', 
                paddingBottom: "10px", borderBottom:"1px solid #c3c3c3"}}>
            <div>
                TERMINAL #1
            </div>
            <div style={{display: 'flex', alignItems:"center"}}>
                <div>
                    09-10-2022
                </div>&nbsp;&nbsp;
                <div>
                    10:30 am
                </div>
            </div>
        </div>
        <div>
            {
                data.map((item, index) => <div key={index} style={{display: 'flex', alignItems:"center", 
                justifyContent:"space-between", fontSize: '13px', marginBottom: "5px"}}>
                                <div>
                                    {item.qty} x {item.item}
                                </div>
                                <div>
                                    {item.price * item.qty}
                                </div>
                            </div>)
            }
        </div>
        <div style={{display: 'flex', alignItems:"center", 
                justifyContent:"space-between", fontSize: '15px', marginBottom: "5px",
                borderTop:"1px solid #c3c3c3", paddingTop: '20px'}}>   
            <div>
                Total Amount:
            </div>
            <div>
                {getTotal(data)}
            </div>
        </div>
    </div>
}

export default PrintOut