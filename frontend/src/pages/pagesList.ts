import { ReactNode } from "react";
import Home from "./Home";
import HttpTest from "./HttpTest";
import Bootstrap from "./Bootstrap";

interface PageProps {
    name: string;
    path: string;
    component: () => ReactNode;
    disabled: boolean;
}

const pageList: PageProps[] = [
    { name: 'Home', path: '/', disabled: false,  component: Home },
    { name: 'HTTP Test', path: "/http_test/:id", disabled: false, component: HttpTest },
    { name: 'Bootstrap', path: "/bootstrap", disabled: false, component: Bootstrap },
];

export default pageList;