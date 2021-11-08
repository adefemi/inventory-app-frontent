import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {FC} from "react"
import Login from "./pages/Login"
import CheckUser from './pages/CheckUser'
import Home from './pages/Home'
import AuthRoute from './components/AuthRoute'


const Router:FC = () => {
    return <BrowserRouter>
        <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/check-user" exact component={CheckUser} />

            <Route path="/" render={() =>
                <AuthRoute>
                    <Route path="/" exact component={Home} />
                </AuthRoute>
            } />
        </Switch>
    </BrowserRouter>
}

export default Router