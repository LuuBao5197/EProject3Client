// import config from '../config/routes';

import Contest from "../pages/Contest";
import Home from "../pages/Home";



export const publicRoutes = [
    {
        path: "/",
        element: <Home/>,
        
    },
    {
        path: "/contest",
        element: <Contest/>,
        
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
