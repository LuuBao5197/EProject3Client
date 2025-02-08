// import config from '../config/routes';


import {AdminConfig, StudentConfig } from "../config/routes";

import { ManagerConfig, TeacherConfig } from "../config/routes";



// import Contest from "../pages/Contest";
import EditProfile from "../pages/PublicPages/EditProfile";
import AwardReceived from "../pages/StudentPages/AwardReceived";
import CreateNewSubmission from "../pages/StudentPages/CreateNewSubmission";
import HomePage from "../pages/PublicPages/HomePage";
import AboutUs from "../pages/PublicPages/AboutUs";
import ChangePasswordFirstTimeLogin from "../pages/PublicPages/ChangePasswordFirstTimeLogin";
import ExhibitionArtwork from "../pages/StudentPages/ExhibitionArtwork";
import MySubmission from "../pages/StudentPages/MySubmissions";
import UpdateMySubmission from "../pages/StudentPages/UpdateMySubmission";



export const publicRoutes = [
    {
        path: "/",
        element: <HomePage/>,
        
    },
    {

        path: "/ChangePasswordFirstTimeLogin",
        element: <ChangePasswordFirstTimeLogin/>,
    },
    {

        path: "/edit",
        element: <EditProfile/>,
    },
    {

        path: "/aboutus",
        element: <AboutUs/>,
    },
    {

        path: "/student/awardreceived",
        element: <AwardReceived/>,
        
    },{

        path: "/student/createsubmission/:contestId",
        element: <CreateNewSubmission/>,
        
    },{

        path: "/student/exhibitionartwork",
        element: <ExhibitionArtwork/>,
        
    },{

        path: "/student/mysubmissions",
        element: <MySubmission/>,
        
    },
    {

        path: "/student/updatemysubmission/:id",
        element: <UpdateMySubmission/>,

        
    },

        
];


export const ManagerRoutes =[
    {
        path: ManagerConfig.managerlayout.path,
        element: ManagerConfig.managerlayout.component
    },
    {
        path: ManagerConfig.classesmanagement.path,
        element: ManagerConfig.classesmanagement.component
    },
    {
        path: ManagerConfig.studentmanagement.path,
        element: ManagerConfig.studentmanagement.component
    },
    {
        path: ManagerConfig.competitionmanagement.path,
        element: ManagerConfig.competitionmanagement.component
    },
    {
        path: ManagerConfig.armanagement.path,
        element: ManagerConfig.armanagement.component
    },
    {
        path: ManagerConfig.awardmanagement.path,
        element: ManagerConfig.awardmanagement.component
    },
    {
        path: ManagerConfig.exhibitionmanagement.path,
        element: ManagerConfig.exhibitionmanagement.component
    },
    {
        path: ManagerConfig.designmanagement.path,
        element: ManagerConfig.designmanagement.component
    },
    {
        path: ManagerConfig.exhibitiondetail.path,
        element: ManagerConfig.exhibitiondetail.component
    },
    {
        path: ManagerConfig.teacherdetail.path,
        element: ManagerConfig.teacherdetail.component
    }
];
export const AdminRoute = [
    {
        path: AdminConfig.adminlayout.path,
        element: AdminConfig.adminlayout.component
    },
    {
        path: AdminConfig.stafflayout.path,
        element: AdminConfig.stafflayout.component
    },
    {
        path: AdminConfig.staffadd.path,
        element: AdminConfig.staffadd.component
    },
    {
        path: AdminConfig.staffdetail.path,
        element: AdminConfig.staffdetail.component
    },

    {
        path: AdminConfig.studentlist.path,
        element: AdminConfig.studentlist.component
    },
    {
        path: AdminConfig.studentadd.path,
        element: AdminConfig.studentadd.component
    },
    {
        path: AdminConfig.studentimport.path,
        element: AdminConfig.studentimport.component
    },
    {
        path: AdminConfig.studentdetail.path,
        element: AdminConfig.studentdetail.component

    },
    {
        path: AdminConfig.classdetail.path,
        element: AdminConfig.classdetail.component
    },
    {
        path: AdminConfig.adminclassadd.path,
        element: AdminConfig.adminclassadd.component
    }
];

export const StudentRoutes=[
    {
        path: StudentConfig.awardreceived.path,
        element: StudentConfig.awardreceived.component,
    },  {
        path: StudentConfig.createnewsubmission.path,
        element: StudentConfig.createnewsubmission.component,
    },  {
        path: StudentConfig.exhibitionartwork.path,
        element: StudentConfig.exhibitionartwork.component,
    },  {
        path: StudentConfig.mysubmissions.path,
        element: StudentConfig.mysubmissions.component,
    },  {
        path: StudentConfig.updatemysubmission.path,
        element: StudentConfig.updatemysubmission.component,
    },  {
        path: StudentConfig.home.path,
        element: StudentConfig.home.component,
    },
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
