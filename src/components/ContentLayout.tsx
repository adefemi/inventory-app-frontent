import { FC, ReactElement } from "react"
import { Table } from 'antd';
import { DataProps } from "../utils/types";

interface ContentLayoutProps {
    pageTitle: string
    setModalState?: (val: boolean) => void
    dataSource: DataProps[]
    columns: DataProps[]
    fetching: boolean
    customName?: string
    extraButton?: ReactElement
    disableAddButton?: boolean
}

const ContentLayout:FC<ContentLayoutProps> = ({
    children,
    pageTitle,
    setModalState,
    dataSource,
    columns,
    fetching,
    customName,
    extraButton,
    disableAddButton = false
}) => {
    return (
        <>
          <div className="card">
            <div className="cardHeader">
                <h1 className="headContent">{customName ? customName : `${pageTitle}s`}</h1>
                <div className="rightContent">
                    <div className="searchInput">
                        <input type="text" />
                    </div>
                    {
                        !disableAddButton && <button onClick={() => setModalState && setModalState(true)}>
                                                Add {pageTitle}
                                            </button>
                    }
                    {extraButton}
                </div>
            </div>

            <br/>

            <Table
              dataSource={dataSource} 
              columns={columns} 
              loading={fetching} />

          </div>

          {children}
        </>
    )
}

export default ContentLayout