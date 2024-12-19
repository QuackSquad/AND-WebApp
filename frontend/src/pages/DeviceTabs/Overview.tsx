import { useEffect, useState } from "react";
import ListCard from "../../components/ListCard";
import {
    DevicesTableProps,
    EventsTableProps,
} from "../../components/DatabaseTableProps";
import axios, { AxiosResponse } from "axios";
import GoogleMaps from "../../components/GoogleMaps";

function Overview() {
    const [devicesTable, setDeviceTable] = useState<string[][]>([]);
    const [eventTable, setEventTable] = useState<string[][]>([]);

    // Get device data from the API
    const getDevices = async () => {
        try {
            const response: AxiosResponse<DevicesTableProps[]> =
                await axios.get(`http://localhost:8000/device`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error("Error receiving data:", error);
        }
    };

    // Get event data from the API
    const getEvents = async () => {
        try {
            const response: AxiosResponse<EventsTableProps[]> = await axios.get(
                `http://localhost:8000/device/events?limit=10`
            );
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error("Error receiving data:", error);
        }
    };

    // Generate the device table
    const fetchDeviceData = async (
        devices: DevicesTableProps[] | undefined,
        events: EventsTableProps[] | undefined
    ) => {
        if (devices === undefined || events === undefined) {
            return undefined;
        }

        const table: string[][] = [];
        for (let i = 0; i < devices.length; i++) {
            const device = devices[i];
            const event =
                events.find((event) => event.device_id === device.id)?.status ??
                "Unknown";

            table.push([
                device.name,
                event,
                unixToString(device.updated_at),
                "100%",
            ]);
        }
        setDeviceTable(table);
    };

    const unixToString = (unix: number) => {
        const date = new Date(unix * 1000);
        return date.toLocaleString();
    };

    // Generate the event table
    const fetchEventData = async (
        events: EventsTableProps[] | undefined,
        devices: DevicesTableProps[] | undefined
    ) => {
        if (events === undefined || devices === undefined) {
            return undefined;
        }

        const table: string[][] = [];
        for (let i = 0; i < events.length; i++) {
            const event = events[i];
            const deviceName =
                devices.find((device) => device.id === event.device_id)?.name ??
                event.id.toString();

            table.push([
                deviceName,
                event.status,
                event.severity.toString(),
                unixToString(event.timestamp),
            ]);
        }
        setEventTable(table);
    };

    useEffect(() => {
        const fetchData = async () => {
            const devices = await getDevices();
            const events = await getEvents();

            fetchDeviceData(devices, events);
            fetchEventData(events, devices);
        };
        fetchData();
    }, []);

    return (
        <div className="container">
            <div className="d-flex flex-column flex-lg-row align-items-center">
                <div className="device-left-box d-flex justify-content-center align-items-center mb-3 mb-lg-0">
                    <ListCard
                        title="Devices"
                        listHeaders={["Name", "Status", "Updated", "Battery"]}
                        list={devicesTable}
                        width="-webkit-fill-available"
                        maxWidth="500px"
                    />
                    <div style={{ height: "0px" }} />
                    <ListCard
                        title="Events"
                        listHeaders={[
                            "Device",
                            "Type",
                            "Severity",
                            "Timestamp",
                        ]}
                        list={eventTable}
                        width="-webkit-fill-available"
                        maxWidth="500px"
                    />
                </div>
                <div
                    className="device-right-box d-flex align-items-begin device-map"
                    style={{ width: "100%", aspectRatio: "1/1" }}
                >
                    <GoogleMaps />
                </div>
            </div>
        </div>
    );
}

export default Overview;
