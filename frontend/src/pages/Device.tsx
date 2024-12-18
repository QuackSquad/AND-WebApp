import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import Tabs from "../components/Tabs";
import { DevicesTableProps } from "../components/DatabaseTableProps";
import "../App.css";
import Overview from "./DeviceTabs/Overview";
import DeviceTab from "./DeviceTabs/Device";

/**
 * The `Device` component is responsible for rendering a set of tabs and the corresponding content
 * based on the selected tab. It fetches device data from an API and stores it in session storage
 * to avoid redundant network requests.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 *
 * @remarks
 * - The component uses `useParams` to get the current tab ID from the URL.
 * - It uses `useState` to manage the state of the tabs and the loading state.
 * - The `useEffect` hook is used to fetch device data and update the state accordingly.
 * - The `getDevices` function fetches device data from the API.
 * - The component conditionally renders the `Tabs` component and either the `Overview` or `DeviceTab` component based on the selected tab.
 *
 * @function
 * @name Device
 */
function Device() {
    const currentTab = useParams().id;
    const [tabs, setTabs] = useState<{ name: string; path: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const loadingTabs = [
        { name: "overview", path: "overview" },
        { name: "", path: "" },
    ];

    // Fetch device data and store it in session storage
    useEffect(() => {
        const storedTabs = sessionStorage.getItem("Device-tabs");

        if (storedTabs) {
            setTabs(JSON.parse(storedTabs));
            setLoading(false);
        } else {
            setLoading(true);
        }

        // Fetch device data
        const fetchData = async () => {
            const devices = await getDevices();

            if (devices !== undefined) {
                const tabsList = [{ name: "overview", path: "overview" }];
                devices.forEach((device) => {
                    tabsList.push({
                        name: device.name,
                        path: device.id.toString(),
                    });
                });
                sessionStorage.setItem("Device-tabs", JSON.stringify(tabsList));
                setTabs(tabsList);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Get device data from the API
    const getDevices = async () => {
        try {
            const response: AxiosResponse<DevicesTableProps[]> =
                await axios.get(`http://localhost:8000/device`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error("Error receiving helloData:", error);
        }
    };

    return (
        <>
            <Tabs
                items={loading ? loadingTabs : tabs}
                selectedPath={currentTab}
            />
            <div style={{ height: "10px" }} />
            <div className="container justify-content-center">
                {currentTab === "overview" ? <Overview /> : <DeviceTab />}
            </div>
        </>
    );
}

export default Device;
