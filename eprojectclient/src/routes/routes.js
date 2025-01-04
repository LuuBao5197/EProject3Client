// import config from '../config/routes';

import { TeacherConfig } from "../config/routes";
import Contest from "../pages/Contest";
import EditProfile from "../pages/EditProfile";
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
    {

        path: "/edit",
        element: <EditProfile/>,
    },
    {

        path: "/contest",
        element: <Contest/>,
        
    },

        
];
export const StaffRoutes = [
    {
        path: TeacherConfig.demo.path,
        element: TeacherConfig.demo.component,
    }
]
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
