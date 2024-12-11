import { ReactNode } from "react";
import Home from "./Home";
import NewPage from "./NewPage";

interface PageProps {
    name: string;
    path: string;
    component: () => ReactNode;
    disabled: boolean;
}

const pageList: PageProps[] = [
    { name: 'Home', path: '/', disabled: false,  component: Home },
    { name: 'NewPage', path: '/new_page', disabled: false, component: NewPage },
];

export default pageList;