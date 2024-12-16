import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import Tabs from "../components/Tabs";
import { DevicesTableProps } from "../components/DatabaseTableProps";
import "../App.css";
import Overview from "./DeviceTabs/Overview";
import DeviceTab from "./DeviceTabs/Device";

function Device() {
    const currentTab = useParams().id;
    const [tabs, setTabs] = useState<{ name: string; path: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const loadingTabs = [
        { name: "overview", path: "overview" },
        { name: "", path: "" },
        { name: "", path: "" },
        { name: "", path: "" },
    ];

    useEffect(() => {
        const storedTabs = sessionStorage.getItem("Device-tabs");

        if (storedTabs) {
            setTabs(JSON.parse(storedTabs));
            setLoading(false);
        } else {
            setLoading(true);
        }

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
            {currentTab === "overview" ? <Overview /> : <DeviceTab />}
        </>
    );
}

export default Device;
