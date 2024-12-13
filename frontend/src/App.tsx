import { BrowserRouter, Routes, Route } from "react-router-dom";
import pageList from "./pages/pagesList";
import NavBar from "./components/NavBar";

import HttpTest from "./pages/HttpTest";

function App() {
    return (
        <>
            <NavBar pages={pageList} title="AND" />
            <BrowserRouter>
                <Routes>
                    <Route path="/" /*element={<Layout />}*/>
                        {pageList.map(({ path, component }) => (
                            <Route
                                path={path}
                                element={component()}
                                key={path}
                            />
                        ))}
                        <Route
                            path={"/http_test1/:id"}
                            element={<HttpTest />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
