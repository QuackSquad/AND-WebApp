import { BrowserRouter, Routes, Route } from "react-router-dom";
import pageList from "./pages/pagesList";
import NavBar from "./components/NavBar";

function App() {
    return (
        <>
            <NavBar pages={pageList} title="AND" />
            <BrowserRouter>
                <Routes>
                    <Route path="/" /*element={<Layout />}*/>
                        {pageList.map(({ path, component }) => (
                            <Route path={path} element={component()} />
                        ))}
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
