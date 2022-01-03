import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {FC} from "react"
import Login from "./pages/Login"
import CheckUser from './pages/CheckUser'
import Home from './pages/Home'
import AuthRoute from './components/AuthRoute'
import User from './pages/User'
import Groups from './pages/Groups'
import Inventories from './pages/Inventories'
import UpdateUserPassword from './pages/UpdateUserPassword'
import Shop from './pages/Shop'


const Router:FC = () => {
    return <BrowserRouter>
        <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/check-user" exact component={CheckUser} />
            <Route path="/create-password" exact component={UpdateUserPassword} />

            <Route path="/" render={() =>
                <AuthRoute>
                    <Route path="/" exact component={Home} />
                    <Route path="/users" exact component={User} />
                    <Route path="/groups" exact component={Groups} />
                    <Route path="/inventories" exact component={Inventories} />
                    <Route path="/shops" exact component={Shop} />
                </AuthRoute>
            } />
        </Switch>
    </BrowserRouter>
}

export default Router