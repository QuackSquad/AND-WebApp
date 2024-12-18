import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import pageList from "./pages/pagesList";
import NavBar from "./components/NavBar";

// Pages
import Home from "./pages/Home";
import HttpTest from "./pages/HttpTest";
import Bootstrap from "./pages/Bootstrap";
import Device from "./pages/Device";

function App() {
    return (
        <>
            <NavBar pages={pageList} title="AND" />
            <BrowserRouter>
                <Routes>
                    {/* <Route>
                        {pageList.map(({ path, dynamicPath, component }) => (
                            <Route
                                path={path + (dynamicPath ? dynamicPath : "")}
                                element={component()}
                                key={path}
                            />
                        ))}
                    </Route> */}
                    <Route path="/" element={<Home />} />
                    <Route path="/http_test/:id" element={<HttpTest />} />
                    <Route
                        path="/http_test"
                        element={<Navigate to="/http_test/1" />}
                    />
                    <Route path="/bootstrap/:tab" element={<Bootstrap />} />
                    <Route
                        path="/bootstrap"
                        element={<Navigate to="/bootstrap/overview" />}
                    />
                    <Route path="/device/:id" element={<Device />} />
                    <Route
                        path="/device"
                        element={<Navigate to="/device/overview" />}
                    />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
