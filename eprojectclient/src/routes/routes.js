// import config from '../config/routes';

import { AdminConfig, TeacherConfig } from "../config/routes";
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
    }, 
    {
        path: TeacherConfig.addcontest.path,
        element: TeacherConfig.addcontest.component,
    }, 

];

export const AdminRoutes =[
    {
        path: AdminConfig.adminlayout.path,
        element: AdminConfig.adminlayout.component
    },
    {
        path: AdminConfig.studentmanagement.path,
        element: AdminConfig.studentmanagement.component
    },
    {
        path: AdminConfig.competitionmanagement.path,
        element: AdminConfig.competitionmanagement.component
    },
    {
        path: AdminConfig.armanagement.path,
        element: AdminConfig.armanagement.component
    },
    {
        path: AdminConfig.awardmanagement.path,
        element: AdminConfig.awardmanagement.component
    },
    {
        path: AdminConfig.exhibitionmanagement.path,
        element: AdminConfig.exhibitionmanagement.component
    },
    {
        path: AdminConfig.designmanagement.path,
        element: AdminConfig.designmanagement.component
    },
    {
        path: AdminConfig.studentdetail.path,
        element: AdminConfig.studentdetail.component
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
