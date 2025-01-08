// import config from '../config/routes';

import { AdminConfig, TeacherConfig } from "../config/routes";
// import Contest from "../pages/Contest";
import EditProfile from "../pages/PublicPages/EditProfile";
import Contest from "../pages/StudentPages/Contest";
import Home from "../pages/PublicPages/Home";
import Login from "../pages/PublicPages/Login";
import AwardReceived from "../pages/StudentPages/AwardReceived";


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
    {

        path: "/awardreceived",
        element: <AwardReceived/>,
        
    },

        
];
export const StaffRoutes = [
    {
        path: TeacherConfig.addcontest.path,
        element: TeacherConfig.addcontest.component,
    }, 
    {
        path: TeacherConfig.editcontest.path,
        element: TeacherConfig.editcontest.component,
    }, 
    {
        path: TeacherConfig.listcontest.path,
        element: TeacherConfig.listcontest.component,
    }, 
    {
        path: TeacherConfig.detailcontest.path,
        element: TeacherConfig.detailcontest.component,
    }, 
    {
        path: TeacherConfig.addAward.path,
        element: TeacherConfig.addAward.component,
    }, 
    {
        path: TeacherConfig.listAward.path,
        element: TeacherConfig.listAward.component,
    }, 
    {
        path: TeacherConfig.editAward.path,
        element: TeacherConfig.editAward.component,
    }, 
    {
        path: TeacherConfig.detailAward.path,
        element: TeacherConfig.detailAward.component,
    },
    {
        path: TeacherConfig.listExhibition.path,
        element: TeacherConfig.listExhibition.component,
    },
    {
        path: TeacherConfig.addExhibition.path,
        element: TeacherConfig.addExhibition.component
    },
    {
        path: TeacherConfig.editExhibition.path,
        element: TeacherConfig.editExhibition.component
    } 

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
    },
    {
        path: AdminConfig.exhibitiondetail.path,
        element: AdminConfig.exhibitiondetail.component
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
