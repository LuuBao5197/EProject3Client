
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AdminRoutes, publicRoutes, StaffRoutes } from './routes/routes';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import TeacherLayout from './layout/TeacherLayout';

import React from "react";
import AdminLayout from './layout/AdminLayout';
const Dashboard = () => <div>Dashboard Content</div>;
const Users = () => <div>Users Content</div>;
const Settings = () => <div>Settings Content</div>;

function App() {

    return (
        <div className="App">
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

        </div>


    )
}
export default App;