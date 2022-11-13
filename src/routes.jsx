import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import { NotFoundPage } from "./features/ErrorPages";
import Login from "./features/Login";
import { useSelector } from "react-redux";
import AdminDashboard from "./features/AdminDashboard";
import Groups from "./features/Groups";
import UserManagement from "./features/UserManagement";
import Calons from "./features/Calons";
import Settings from "./features/Settings";
import Periodes from "./features/Periodes";
import EditUser from "./features/UserManagement/edit";
import CreateCalon from "./features/Calons/CreateCalon";
import EditCalon from "./features/Calons/EditCalon";

const ProtectedRoute = ({children}) => {
    const token = useSelector(state => state.auth.token)
    if (token == "") {
        return <Navigate to="/login" />
    }
    return children
}

const routes = createBrowserRouter([
    {
        path: '/',
        element: 
            <ProtectedRoute>
                <App />
            </ProtectedRoute>,
        errorElement: <NotFoundPage />,
        children: [
            {
                path: '/',
                element: <AdminDashboard />
            },
            {
                path: '/groups',
                element: <Groups />
            },
            {
                path: '/users',
                element: <UserManagement />
            },
            {
                path: '/users/:id',
                element: <EditUser />
            },
            {
                path: '/periodes',
                element: <Periodes />
            },
            {
                path: '/calons',
                element: <Calons />
            },
            {
                path: '/calons/create/:periodeId',
                element: <CreateCalon />
            },
            {
                path: '/calons/:id/edit',
                element: <EditCalon />
            },
            {
                path: '/settings',
                element: <Settings />
            },
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
])


export default routes