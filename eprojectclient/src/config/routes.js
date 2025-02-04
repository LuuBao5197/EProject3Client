
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
import EditAwardForm from "../pages/StaffPages/AwardFeature.jsx/EditAwardForm";
import AwardDetails from "../pages/StaffPages/AwardFeature.jsx/AwardDetails";
import ExhibitionDetail from "../pages/ManagerPages/ExhibitionDetail";
import ExhibitionIndex from "../pages/StaffPages/ExhibitionFeature/ExhibitionIndex";
import AddExhibition from "../pages/StaffPages/ExhibitionFeature/AddExhibition";
import EditExhibition from "../pages/StaffPages/ExhibitionFeature/EditExhibition";
import ClassesManagement from "../pages/ManagerPages/CLassesManagement";
import ManagerLayout from "../pages/ManagerPages/ManagerLayout";
import TeacherDetail from "../pages/ManagerPages/TeacherDetail";
import AwardReceived from "../pages/StudentPages/AwardReceived";
import CreateNewSubmission from "../pages/StudentPages/CreateNewSubmission";
import ExhibitionArtwork from "../pages/StudentPages/ExhibitionArtwork";
import MySubmission from "../pages/StudentPages/MySubmissions";
import UpdateMySubmission from "../pages/StudentPages/UpdateMySubmission";
import Adminlayout from "../pages/AdminPages/Adminlayout";
import AdminClassDetail from "../pages/AdminPages/AdminClassDetail";
import CreateClassForm from "../pages/AdminPages/AdminClassAdd";
import HomePage from "../pages/PublicPages/HomePage";

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
export const AdminConfig = {
    adminlayout: {
        component: Adminlayout,
        path: '/admin/adminlayout'
    },
    adminclassadd: {
        component: CreateClassForm,
        path: '/admin/adminclassadd'
    },
    classdetail: {
        component:AdminClassDetail,
        path: '/admin/classdetail/:id'
    },

    stafflayout: {
        component: AdminStaffLayout,
        path: '/admin/stafflayout'
     },
     staffadd: {
        component: AdminStaffAdd,
        path: '/admin/staffadd'
     },
     staffdetail:{
        component: AdminStaffDetail,
        path: '/admin/staffdetail/:id'
     },
    studentlist: {
        component: AdminStudentList,
        path: '/admin/studentlist'
     },
     studentadd: {
        component: AdminStudentAdd,
        path: '/admin/studentadd'
     },
    studentimport: {
        component: AdminStudentImportForm,
        path: '/admin/studentimport'
     },
     studentdetail: {
        component: AdminStudentDetail,
        path: '/admin/student/:id'
     },
}

export const StudentConfig = {
    home :{
        component :HomePage,
        path:'/student/'
    },
    awardreceived: {
        component: AwardReceived,
        path: '/student/awardreceived'
    },
    createnewsubmission: {
        component: CreateNewSubmission,
        path: '/student/createnewsubmission'
    },
    exhibitionartwork: {
        component: ExhibitionArtwork,
        path: '/student/exhibitionartwork'
    },
    mysubmissions: {
        component: MySubmission,
        path: '/student/mysubmission'
    },
    updatemysubmission: {
        component: UpdateMySubmission,
        path: '/student/updatemysubmission'
    }

}

