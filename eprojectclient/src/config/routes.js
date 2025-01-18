
import ContestList from "../pages/StaffPages/ContestFeature/ContestList";
import AddContest from "../pages/StaffPages/ContestFeature/AddContest";
import StudentManagement from "../pages/ManagerPages/StudentManagement";
import CompetitionManagement from "../pages/ManagerPages/CompetitionManagement";
import ARMangement from "../pages/ManagerPages/ARMangement";
import AwardManagement from "../pages/ManagerPages/AwardManagement";
import ExhibitionManagement from "../pages/ManagerPages/ExhibitionManagement";
import DesignManagement from "../pages/ManagerPages/DesignManagement";
import EditContest from "../pages/StaffPages/ContestFeature/EditContest";
import ContestDetail from "../pages/StaffPages/ContestFeature/ContestDetail";
import AddAwardForm from "../pages/StaffPages/AwardFeature.jsx/AddAwardForm";
import AwardList from "../pages/StaffPages/AwardFeature.jsx/AwardList";
import AdminStaffLayout from "../pages/AdminStaffPages/AdminStaffLayout";
import AdminStaffAdd from "../pages/AdminStaffPages/AdminStaffAdd";
import AdminStudentList from "../pages/AdminStudentPages/AdminStudentList";
import AdminStaffDetail from "../pages/AdminStaffPages/AdminStaffDetail";
import AdminStudentAdd from "../pages/AdminStudentPages/AdminStudentAdd";
import AdminStudentImportForm from "../pages/AdminStudentPages/AdminStudentImportForm";
import AdminStudentDetail from "../pages/AdminStudentPages/AdminStudentDetail";
export const config = {

    // home: {
    //     component: Home,
    //     path: '/',
    // },
    // home: {
    //     component: Home,
    //     path: '/',
    // },
    // home: {
    //     component: Home,
    //     path: '/',
    // },

};
import EditAwardForm from "../pages/StaffPages/AwardFeature.jsx/EditAwardForm";
import AwardDetails from "../pages/StaffPages/AwardFeature.jsx/AwardDetails";
import ExhibitionDetail from "../pages/ManagerPages/ExhibitionDetail";
import ExhibitionIndex from "../pages/StaffPages/ExhibitionFeature/ExhibitionIndex";
import AddExhibition from "../pages/StaffPages/ExhibitionFeature/AddExhibition";
import EditExhibition from "../pages/StaffPages/ExhibitionFeature/EditExhibition";
import ClassesManagement from "../pages/ManagerPages/CLassesManagement";
import ManagerLayout from "../pages/ManagerPages/ManagerLayout";
import TeacherDetail from "../pages/ManagerPages/TeacherDetail";

export const TeacherConfig = {
    listcontest: {
        component: ContestList,
        path: '/staff/contest'
    },
    addcontest: {
        component: AddContest,
        path: '/staff/contest/add'
    },
    editcontest: {
        component: EditContest,
        path: '/staff/contest/edit/:id'
    },
    detailcontest: {
        component: ContestDetail,
        path: '/staff/contest/:id'
    },
    listAward: {
        component: AwardList,
        path: '/staff/award'
    },
    addAward: {
        component: AddAwardForm,
        path: '/staff/award/add'
    },
    editAward: {
        component: EditAwardForm,
        path: '/staff/award/edit/:id'
    },
    detailAward: {
        component: AwardDetails,
        path: '/staff/award/:id'
    },
    listExhibition: {
        component: ExhibitionIndex,
        path: '/staff/exhibition'
    },
    addExhibition: {
        component: AddExhibition,
        path: '/staff/exhibition/add'
    },
    editExhibition: {
        component: EditExhibition,
        path: '/staff/exhibition/edit/:id'
    }

};

export const ManagerConfig = {
    managerlayout: {
        component: ManagerLayout,
        path: '/manager/managerlayout'
    },
    classesmanagement: {
        component: ClassesManagement,
        path: '/manager/classesmanagement'
    },
    studentmanagement: {
        component: StudentManagement,
        path: '/manager/students/:classId'
    },
    competitionmanagement: {
        component: CompetitionManagement,
        path: '/manager/competitionmanagement'
    },
    armanagement: {
        component: ARMangement,
        path: '/manager/armanagement'
    },
    awardmanagement: {
        component: AwardManagement,
        path: '/manager/awardmanagement'
    },
    exhibitionmanagement: {
        component: ExhibitionManagement,
        path: '/manager/exhibitionmanagement'
    },
    designmanagement: {
        component: DesignManagement,
        path: '/manager/designmanagement'
    },
    exhibitiondetail: {
        component: ExhibitionDetail,
        path: '/manager/exhibitiondetail/:id'
    },
    teacherdetail: {
        component: TeacherDetail,
        path: '/manager/teacherdetail/:id'
    }

}
export const AdminStaffConfig = {
    adminstafflayout: {
        component: AdminStaffLayout,
        path: '/adminstaff/adminstafflayout'
     },
     adminstaffadd: {
        component: AdminStaffAdd,
        path: '/adminstaff/adminstaffadd'
     },
     adminstaffdetail:{
        component: AdminStaffDetail,
        path: '/adminstaff/adminstaffdetail/:id'
     }
}
export const AdminStudentConfig = {
    adminstudentlist: {
        component: AdminStudentList,
        path: '/adminstudent/adminstudentlist'
     },
     adminstudentadd: {
        component: AdminStudentAdd,
        path: '/adminstudent/adminstudentadd'
     },
     adminstudentimport: {
        component: AdminStudentImportForm,
        path: '/adminstudent/adminstudentimport'
     },
     adminstudentdetail: {
        component: AdminStudentDetail,
        path: '/adminstudent/adminstudentdetail/:id'
     },
}

