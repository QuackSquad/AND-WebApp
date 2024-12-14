import { BrowserRouter, Routes, Route } from "react-router-dom";
import pageList from "./pages/pagesList";
import NavBar from "./components/NavBar";

// Pages
import Home from "./pages/Home";
import HttpTest from "./pages/HttpTest";
import Bootstrap from "./pages/Bootstrap";

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
                    <Route path="/bootstrap/:tab" element={<Bootstrap />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
