import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


import { publicRoutes } from './routes';
import AdminStaffLayout from './layout/AdminStaffLayout';
import AuthLayout from './layouts/auth';
import RTLLayout from './layouts/rtl';
import StaffLayout from './layouts/staff';
import ManagerLayout from './layouts/manager';
import PublicLayout from './layouts/public';
import { ChakraProvider } from '@chakra-ui/react';
import initialTheme from './theme/theme';

function App() {
    const [currentTheme, setCurrentTheme] = useState(initialTheme);

    return (
        <ChakraProvider theme={currentTheme}>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

            <Router>
                <Routes>
                    {publicRoutes.map((item, index) => (
                        <Route key={index} path={item.path} element={item.element} />
                    ))}
                    {AdminRoutes.map((item, index) => {
                        const Comp = item.element;
                        return (
                            <Route
                                path={item.path}
                                key={index}
                                element={
                                    <AdminLayout>
                                        <Comp />
                                    </AdminLayout>
                                }
                            />
                        );
                    })}
                    {AdminStaffRoute.map((item, index) => {
                        const Comp = item.element;
                        return (
                            <Route
                                path={item.path}
                                key={index}
                                element={
                                    <AdminStaffLayout>
                                        <Comp />
                                    </AdminStaffLayout>
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
                                    <AdminStaffLayout>
                                        <Comp />
                                    </AdminStaffLayout>
                                }
                            />
                        );
                    })}

                    <Route path="auth/*" element={<AuthLayout />} />
                    <Route path="staff/*" element={<StaffLayout theme={currentTheme} setTheme={setCurrentTheme} />} />
                    <Route path="manager/*" element={<ManagerLayout theme={currentTheme} setTheme={setCurrentTheme} />} />
                    <Route path="public/*" element={<PublicLayout theme={currentTheme} setTheme={setCurrentTheme} />} />
                    <Route path="rtl/*" element={<RTLLayout theme={currentTheme} setTheme={setCurrentTheme} />} />
                    <Route path="/" element={<Navigate to="/admin" replace />} />
                </Routes>
            </Router>
        </ChakraProvider>
    );
}

export default App;
