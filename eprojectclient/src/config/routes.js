import Home from "../pages/Home";
import Demo from "../pages/StaffPages/Demo";
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
    demo: {
        component: Demo,
        path: '/staff/demo'
    },
    addcontest: {
        component: AddContest,
        path: '/staff/contest/add'
    },
    editcontest: {
        component: EditContest,
        path: '/staff/contest/edit/:id'
    }
};

export const AdminConfig = {
    adminlayout: {
        component: AdminLayout,
        path: '/admin/adminlayout'
    },
    studentmanagement: {
        component: StudentManagement,
        path: '/admin/studentmanagement'
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
    }
}
