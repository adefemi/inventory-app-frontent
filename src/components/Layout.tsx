import { FC } from "react";
import Logo from "../assets/logo.svg"
import User from "../assets/user.svg"
import Dashboard from "../assets/dashboard.svg"
import Cart from "../assets/cart.svg"
import Box from "../assets/box.svg"
import File from "../assets/file.svg"
import Report from "../assets/report.svg"
import Usergroup from "../assets/usergroup.svg"
import { logout } from "../utils/functions";


const Layout:FC = ({children}) => {
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
                <div className="logoutButton">
                    <div className="text" onClick={logout}>Logout</div>
                </div>
            </div>
        </div>
        <div className="bodyHolder">
            <div className="sideBar">
                <ul>
                    <li>
                        <img src={Dashboard} alt="dashboard" />
                        <div className="text">Dashboard</div>
                    </li>
                    <li className="active">
                        <img src={Usergroup} alt="user group" />
                        <div className="text">Users</div>
                    </li>
                </ul>
            </div>
            <div className="mainContent">
                {children}
            </div>
        </div>
    </div>
}

export default Layout