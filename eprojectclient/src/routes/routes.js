// import config from '../config/routes';

import Home from "../pages/Home";
import Login from "../pages/Login";



export const publicRoutes = [
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: "/login",
        element: <Login/>,
    },
];
export const privateRoutes = [
    // {
    //     path: config.home.path,
    //     component: config.home.component,
    // },
    // {
    //     path: config.home.path,
    //     component: config.home.component,
    // },


];
