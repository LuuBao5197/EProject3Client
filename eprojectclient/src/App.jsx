
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { publicRoutes } from './routes/routes';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
            </Routes>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/settings" element={<Settings />} />
                    </Routes>
                </Layout>
            </Router>
        </div>


    )
}
export default App;