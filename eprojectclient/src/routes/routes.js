// import config from '../config/routes';

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { AdminConfig, AdminStaffConfig, AdminStudentConfig, TeacherConfig } from "../config/routes";
=======
import { ManagerConfig, TeacherConfig } from "../config/routes";
>>>>>>> b3b6a212cf295f39f8865ee5b63aa87f57d26aaf
=======
import { ManagerConfig, TeacherConfig } from "../config/routes";
>>>>>>> b3b6a212cf295f39f8865ee5b63aa87f57d26aaf
=======
import { ManagerConfig, TeacherConfig } from "../config/routes";
>>>>>>> b3b6a212cf295f39f8865ee5b63aa87f57d26aaf
// import Contest from "../pages/Contest";
import EditProfile from "../pages/PublicPages/EditProfile";
import Contest from "../pages/StudentPages/Contest";
import Login from "../pages/PublicPages/Login";
import AwardReceived from "../pages/StudentPages/AwardReceived";
import CreateNewSubmission from "../pages/StudentPages/CreateNewSubmission";
import ForgotPassword from "../pages/PublicPages/ForgotPassword";
import HomePage from "../pages/PublicPages/HomePage";



export const publicRoutes = [
    {
        path: "/",
        element: <HomePage/>,
        
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

        path: "/forgotpassword",
        element: <ForgotPassword/>,
    },
    {

        path: "/contest",
        element: <Contest/>,
        
    },
    {

        path: "/awardreceived",
        element: <AwardReceived/>,
        
    },{

        path: "/createsubmission",
        element: <CreateNewSubmission/>,
        
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
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
>>>>>>> b3b6a212cf295f39f8865ee5b63aa87f57d26aaf
=======
>>>>>>> b3b6a212cf295f39f8865ee5b63aa87f57d26aaf
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
