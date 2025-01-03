
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { publicRoutes } from './routes/routes';

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