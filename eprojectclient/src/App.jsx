
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { publicRoutes, StaffRoutes } from './routes/routes';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import TeacherLayout from './layout/TeacherLayout';

import React from "react";
import Layout from "./components/Layout";

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
                                    <Comp/>
                                  </TeacherLayout>
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