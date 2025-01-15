
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import { AdminRoutes, AdminStaffRoute, AdminStudentRoute, publicRoutes, StaffRoutes } from './routes/routes';
import TeacherLayout from './layout/TeacherLayout';
import AdminLayout from './layout/AdminLayout';
import AdminStaffLayout from './layout/AdminStaffLayout';
=======
=======
>>>>>>> b3b6a212cf295f39f8865ee5b63aa87f57d26aaf
=======
>>>>>>> b3b6a212cf295f39f8865ee5b63aa87f57d26aaf
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom'
import {publicRoutes, StaffRoutes } from './routes/routes';
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import './assets/css/App.css';
import { } from 'react-router-dom';
import AuthLayout from './layouts/auth';
import RTLLayout from './layouts/rtl';
import StaffLayout from './layouts/staff';
import ManagerLayout from './layouts/manager';
import PublicLayout from './layouts/public';
import {
    ChakraProvider,
    // extendTheme
} from '@chakra-ui/react';
import initialTheme from './theme/theme'; //  { themeGreen };
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> b3b6a212cf295f39f8865ee5b63aa87f57d26aaf
=======
>>>>>>> b3b6a212cf295f39f8865ee5b63aa87f57d26aaf
=======
>>>>>>> b3b6a212cf295f39f8865ee5b63aa87f57d26aaf

function App() {
    const [currentTheme, setCurrentTheme] = useState(initialTheme);


    return (
        <ChakraProvider theme={currentTheme}>
            <ToastContainer
                position="top-right" // Vị trí hiển thị
                autoClose={3000} // Thời gian tự động đóng (ms)
                hideProgressBar={false} // Hiển thị thanh tiến trình
                newestOnTop={false} // Sắp xếp thông báo mới nhất lên đầu
                closeOnClick // Đóng khi click
                pauseOnHover // Dừng lại khi hover
                draggable // Kéo thả
            />

            <Routes>
                {publicRoutes.map((item, index) => {
                    return (
                        <Route key={index} path={item.path} element={item.element} />
                    );
                })}

                {/* {AdminRoutes.map((item, index) => {

                    const Comp = item.element;
                    return (
                        <Route
                            path={item.path}
                            key={index}
                            element={
                                <div>
                                    <AdminLayout>
                                        <Comp />
                                    </AdminLayout>
                                </div>
                            }
                        />
                    );
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                })}
                {AdminStaffRoute.map((item, index) => {
                    const Comp = item.element;
                    return (
                        <Route
                            path={item.path}
                            key={index}
                            element={
                                <div>
                                    <AdminStaffLayout>
                                        <Comp />
                                    </AdminStaffLayout>
                                </div>
                            }
                        />
                    );
                })}
                {AdminStudentRoute.map((item, index) => {
                    const Comp = item.element;
                    return (
                        <Route
                            path={item.path}
                            key={index}
                            element={
                                <div>
                                    <AdminStaffLayout>
                                        <Comp />
                                    </AdminStaffLayout>
                                </div>
                            }
                        />
                    );
                })}
=======
=======
>>>>>>> b3b6a212cf295f39f8865ee5b63aa87f57d26aaf
=======
>>>>>>> b3b6a212cf295f39f8865ee5b63aa87f57d26aaf
                })} */}
                <Route path="auth/*" element={<AuthLayout />} />
                {/* <Route
                    path="admin/*"
                    element={
                        <AdminLayout theme={currentTheme} setTheme={setCurrentTheme} />
                    }
                /> */}
                
                <Route
                    path="staff/*"
                    element={
                        <StaffLayout theme={currentTheme} setTheme={setCurrentTheme} />
                    }
                />
                <Route
                    path="manager/*"
                    element={
                        <ManagerLayout theme={currentTheme} setTheme={setCurrentTheme} />
                    }
                    position="top-right" // Vị trí hiển thị
                    autoClose={3000} // Thời gian tự động đóng (ms)
                    hideProgressBar={false} // Hiển thị thanh tiến trình
                    newestOnTop={false} // Sắp xếp thông báo mới nhất lên đầu
                    closeOnClick // Đóng khi click
                    pauseOnHover // Dừng lại khi hover
                    draggable // Kéo thả
                />
                <Route
                    path="public/*"
                    element={
                        <PublicLayout theme={currentTheme} setTheme={setCurrentTheme} />
                    }
                />
                <Route
                    path="rtl/*"
                    element={
                        <RTLLayout theme={currentTheme} setTheme={setCurrentTheme} />
                    }
                />
                <Route path="/" element={<Navigate to="/admin" replace />} />
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> b3b6a212cf295f39f8865ee5b63aa87f57d26aaf
=======
>>>>>>> b3b6a212cf295f39f8865ee5b63aa87f57d26aaf
=======
>>>>>>> b3b6a212cf295f39f8865ee5b63aa87f57d26aaf
            </Routes>

        </ChakraProvider>

    )
}
export default App;