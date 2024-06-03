import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Layout/Dashboard";
import Main from "../Layout/Main";
import AddItem from "../pages/Dashboard/AddItem/AddItem";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import ManageItems from "../pages/Dashboard/ManageItems/ManageItems";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import UpdateItem from "../pages/Dashboard/UpdateItem/UpdateItem";
import UserCart from "../pages/Dashboard/UserCart/UserCart";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Menu from "../pages/Menu/Menu/Menu";
import Order from "../pages/Order/Order/Order";
import Signup from "../pages/Signup/Signup";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";



const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: 'home',
                element: <Home />
            },
            {
                path: 'menu',
                element: <Menu />
            },
            {
                path: 'order/:category',
                element: <Order />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'signup',
                element: <Signup />
            },
        ]
    },
    {
        path: "dashboard",
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [

            // ----------------------
            // Admin only routes
            // ----------------------
            {
                path: "allusers",
                element: <AdminRoute><AllUsers /></AdminRoute>
            },
            {
                path: "additems",
                // element: <AdminRoute><AddItem /></AdminRoute>
                element: <AddItem />
            },
            {
                path: "updateitem/:id",
                // element: <AdminRoute><UpdateItem /></AdminRoute>,
                element: <UpdateItem />,
                loader: ({ params }) => fetch(`http://localhost:5000/menu/${params.id}`)
            },
            {
                path: "manageitems",
                element: <AdminRoute><ManageItems /></AdminRoute>
            },



            // ----------------------
            // regular User routes
            // ----------------------
            {
                path: "carts",
                element: <UserCart />
            },
            {
                path: "payment",
                element: <Payment />
            },
            {
                path: "paymenthistory",
                element: <PaymentHistory />
            }

        ]
    }
]);

export default router;