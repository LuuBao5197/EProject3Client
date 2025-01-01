// import config from '../config/routes';

import { AdminConfig, TeacherConfig } from "../config/routes";
import Contest from "../pages/Contest";
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

        path: "/contest",
        element: <Contest/>,
        
    },

        
];
export const StaffRoutes = [
    {
        path: TeacherConfig.demo.path,
        element: TeacherConfig.demo.component,
    }
];

export const AdminRoutes =[
    {
        path: AdminConfig.adminlayout.path,
        element: AdminConfig.adminlayout.component
    }
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
