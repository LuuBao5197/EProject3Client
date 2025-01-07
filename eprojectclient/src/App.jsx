
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import { AdminRoutes, publicRoutes, StaffRoutes } from './routes/routes';
import TeacherLayout from './layout/TeacherLayout';
import AdminLayout from './layout/AdminLayout';
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {


    return (
        <div className="App">
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
                {StaffRoutes.map((item, index) => {
                    const Comp = item.element;
                    return (

                        <Route
                            path={item.path}
                            key={index}
                            element={
                                <div>
                                    <TeacherLayout>
                                        <Comp />
                                    </TeacherLayout>
                                </div>
                            }
                        />
                    );
                })}
                {AdminRoutes.map((item, index) => {
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
                })}
            </Routes>
            {/* <Routes>
                    {privateRoutes.map((route, index) => {
                        const Layout = route.layout || DefaultLayout;
                        const Comp = route.component;
                        return (
                            <Route
                                path={route.path}
                                key={index}
                                element={
                                    <div>
                                        <Wrapper>
                                            <Layout>
                                                <Comp />
                                            </Layout>
                                        </Wrapper>
                                    </div>
                                }
                            />
                        );
                    })}
                </Routes> */}

        </div>


    )
}
export default App;