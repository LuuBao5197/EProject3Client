
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import { AdminRoutes, AdminStaffRoute, AdminStudentRoute, publicRoutes, StaffRoutes } from './routes/routes';
import TeacherLayout from './layout/TeacherLayout';
import AdminLayout from './layout/AdminLayout';
import AdminStaffLayout from './layout/AdminStaffLayout';

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