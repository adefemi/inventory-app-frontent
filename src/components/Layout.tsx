import { FC, useEffect, useState } from "react";
import Logo from "../assets/logo.svg"
import User from "../assets/user.svg"
import { logout } from "../utils/functions";
import {Link, useHistory} from "react-router-dom"

import { Dashboard, UserGroup, Group, Inventory, Shop, Activities, Invoice} from "../assets/svgs/svgs";


const Layout:FC = ({children}) => {

    const history = useHistory()
    const [activePath, setActivePath] = useState("/")

    useEffect(() => {
        setActivePath(history.location.pathname)
    }, [history.location])

    const isActive = (path:string):string => {
        switch(activePath){
            case path:
                return "active"
            default:
                return ""
        }
    }

    return <div className="layout">
        <div className="header">
            <div className="brand">
                <img src={Logo} alt="logo" />
            </div>
            <div className="rightNav">
                <div className="userAvatar">
                    <img src={User} alt="user" />
                    <div className="text">Adefemigreat</div>
                </div>
                <div className="rightItem">
                    <Link to="/invoice-section">
                        <div className="newInvoiceButton">
                            New Invoice
                        </div>
                    </Link>
                    <div className="logoutButton">
                        <div className="text" onClick={logout}>Logout</div>
                    </div>
                </div>
            </div>
        </div>
        <div className="bodyHolder">
            <div className="sideBar">
                <ul>
                    <Link to="/">
                        <li className={isActive("/")}>
                            <Dashboard />
                            <div className="text">Dashboard</div>
                        </li>
                    </Link>
                    <Link to="/groups">
                        <li className={isActive("/groups")}>
                            <Group />
                            <div className="text">Groups</div>
                        </li>
                    </Link>
                    <Link to="/inventories">
                        <li className={isActive("/inventories")}>
                            <Inventory />
                            <div className="text">Inventories</div>
                        </li>
                    </Link>
                    <Link to="/shops">
                        <li className={isActive("/shops")}>
                            <Shop />
                            <div className="text">Shops</div>
                        </li>
                    </Link>
                    <Link to="/invoices">
                        <li className={isActive("/invoices")}>
                            <Invoice />
                            <div className="text">Invoices</div>
                        </li>
                    </Link>
                    <Link to="/users">
                        <li className={isActive("/users")}>
                            <UserGroup />
                            <div className="text">Users</div>
                        </li>
                    </Link>
                    <Link to="/user-activities">
                        <li className={isActive("/user-activities")}>
                            <Activities />
                            <div className="text">User Activities</div>
                        </li>
                    </Link>
                </ul>
            </div>
            <div className="mainContent">
                {children}
            </div>
        </div>
    </div>
}

export default Layout