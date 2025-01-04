
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { publicRoutes, StaffRoutes, AdminRoutes } from './routes/routes';
import TeacherLayout from './layout/TeacherLayout';
import AdminLayout from './layout/AdminLayout';

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