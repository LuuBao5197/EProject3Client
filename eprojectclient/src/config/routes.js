import Home from "../pages/Home";
import Demo from "../pages/StaffPages/Demo";
import AdminLayout from "../pages/AdminPages/AdminLayout"

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
    }
};

export const AdminConfig = {
    adminlayout: {
        component: AdminLayout,
        path: '/admin/adminlayout'
    }
}
