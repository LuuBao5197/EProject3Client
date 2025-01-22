// import config from '../config/routes';


import {AdminStaffConfig, AdminStudentConfig, StudentConfig } from "../config/routes";

import { ManagerConfig, TeacherConfig } from "../config/routes";

import EditProfile from "../pages/PublicPages/EditProfile";
import AwardReceived from "../pages/StudentPages/AwardReceived";
import CreateNewSubmission from "../pages/StudentPages/CreateNewSubmission";
import HomePage from "../pages/PublicPages/HomePage";
import AboutUs from "../pages/PublicPages/AboutUs";
import MySubmission from "../pages/StudentPages/MySubmissions";
import UpdateMySubmission from "../pages/StudentPages/UpdateMySubmission";
import ExhibitionArtwork from "../pages/StudentPages/ExhibitionArtwork";



export const publicRoutes = [
    {
        path: "/",
        element: <HomePage/>,
        
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

        path: "/awardreceived",
        element: <AwardReceived/>,
        
    },{

        path: "/createnewsubmission/:contestId",
        element: <CreateNewSubmission/>,
        
    },,{

        path: "/mysubmissions",
        element: <MySubmission/>,
        
    },{

        path: "/updatemysubmission/:id",
        element: <UpdateMySubmission/>,
        
    },
    {

        path: "/exhibitionartwork",
        element: <ExhibitionArtwork/>,
        
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
export const AdminStaffRoute = [
    {
        path: AdminStaffConfig.adminstafflayout.path,
        element: AdminStaffConfig.adminstafflayout.component
    },
    {
        path: AdminStaffConfig.adminstaffadd.path,
        element: AdminStaffConfig.adminstaffadd.component
    },
    {
        path: AdminStaffConfig.adminstaffdetail.path,
        element: AdminStaffConfig.adminstaffdetail.component
    }
];
export const AdminStudentRoute = [
    {
        path: AdminStudentConfig.adminstudentlist.path,
        element: AdminStudentConfig.adminstudentlist.component
    },
    {
        path: AdminStudentConfig.adminstudentadd.path,
        element: AdminStudentConfig.adminstudentadd.component
    },
    {
        path: AdminStudentConfig.adminstudentimport.path,
        element: AdminStudentConfig.adminstudentimport.component
    },
    {
        path: AdminStudentConfig.adminstudentdetail.path,
        element: AdminStudentConfig.adminstudentdetail.component

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
