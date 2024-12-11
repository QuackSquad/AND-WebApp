import { ReactNode } from "react";
import Home from "./Home";
import HttpTest from "./HttpTest";

interface PageProps {
    name: string;
    path: string;
    component: () => ReactNode;
    disabled: boolean;
}

const pageList: PageProps[] = [
    { name: 'Home', path: '/', disabled: false,  component: Home },
    { name: 'HTTP Test', path: '/http_test', disabled: false, component: HttpTest },
];

export default pageList;