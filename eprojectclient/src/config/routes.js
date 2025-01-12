import ContestList from "../pages/StaffPages/ContestList";
import AddContest from "../pages/StaffPages/AddContest";
import AdminLayout from "../pages/AdminPages/AdminLayout"
import StudentManagement from "../pages/AdminPages/StudentManagement";
import CompetitionManagement from "../pages/AdminPages/CompetitionManagement";
import ARMangement from "../pages/AdminPages/ARMangement";
import AwardManagement from "../pages/AdminPages/AwardManagement";
import ExhibitionManagement from "../pages/AdminPages/ExhibitionManagement";
import DesignManagement from "../pages/AdminPages/DesignManagement";
import StudentDetail from "../pages/AdminPages/StudentDetail";
import EditContest from "../pages/StaffPages/EditContest";
import ContestDetail from "../pages/StaffPages/ContestDetail";
import AddAwardForm from "../pages/StaffPages/AwardFeature.jsx/AddAwardForm";
import AwardList from "../pages/StaffPages/AwardFeature.jsx/AwardList";
import EditAwardForm from "../pages/StaffPages/AwardFeature.jsx/EditAwardForm";
import AwardDetails from "../pages/StaffPages/AwardFeature.jsx/AwardDetails";
import ExhibitionDetail from "../pages/AdminPages/ExhibitionDetail";
import ExhibitionIndex from "../pages/StaffPages/ExhibitionFeature/ExhibitionIndex";
import AddExhibition from "../pages/StaffPages/ExhibitionFeature/AddExhibition";
import EditExhibition from "../pages/StaffPages/ExhibitionFeature/EditExhibition";
import ClassesManagement from "../pages/AdminPages/CLassesManagement";
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

export const AdminConfig = {
    adminlayout: {
        component: AdminLayout,
        path: '/admin/adminlayout'
    },
    classesmanagement: {
        component: ClassesManagement,
        path: '/admin/classesmanagement'
    },
    studentmanagement: {
        component: StudentManagement,
        path: '/admin/studentmanagement/:classId'
    },
    competitionmanagement: {
        component: CompetitionManagement,
        path: '/admin/competitionmanagement'
    },
    armanagement: {
        component: ARMangement,
        path: '/admin/armanagement'
    },
    awardmanagement: {
        component: AwardManagement,
        path: '/admin/awardmanagement'
    },
    exhibitionmanagement: {
        component: ExhibitionManagement,
        path: '/admin/exhibitionmanagement'
    },
    designmanagement: {
        component: DesignManagement,
        path: '/admin/designmanagement'
    },
    studentdetail: {
        component: StudentDetail,
        path: '/admin/studentdetail/:id'
    },
    exhibitiondetail: {
        component: ExhibitionDetail,
        path: '/admin/exhibitiondetail/:id'
    }
}
