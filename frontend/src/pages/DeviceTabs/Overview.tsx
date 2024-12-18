import { useEffect, useState } from "react";
import ListCard from "../../components/ListCard";
import {
    DevicesTableProps,
    EventsTableProps,
} from "../../components/DatabaseTableProps";
import axios, { AxiosResponse } from "axios";
import { width } from "@fortawesome/free-solid-svg-icons/fa0";

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
            <div className="d-flex flex-column flex-lg-row align-items-stretch">
                <div className="left-box d-flex justify-content-center align-items-center mb-3 mb-lg-0">
                    <ListCard
                        title="Devices"
                        listHeaders={["Name", "Status", "Updated", "Battery"]}
                        list={devicesTable}
                        width="-webkit-fill-available"
                        maxWidth="500px"
                    />
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
                <div className="right-box d-flex justify-content-center align-items-center">
                    <img
                        src="/512image.jpg"
                        alt="image"
                        style={{ width: "100%" }}
                    />
                </div>
            </div>
        </div>
        // <div className="container text-center justify-content-center">
        //     <div className="align-items-center">
        //         <div
        //             className="device-left-col"
        //             style={{ border: "1px solid black" }}
        //         >
        //             <ListCard
        //                 title="Title"
        //                 listHeaders={["Name", "ID", "Value1", "Value2"]}
        //                 list={[
        //                     ["AAAA", "1", "1.5", "2"],
        //                     ["BBBB", "2", "3.4", "4"],
        //                     ["CCCC", "3", "5.3", "6"],
        //                     ["CCCC", "3", "5.3", "6"],
        //                     ["CCCC", "3", "5.3", "6"],
        //                     ["CCCC", "3", "5.3", "6"],
        //                     ["CCCC", "3", "5.3", "6"],
        //                     ["CCCC", "3", "5.3", "6"],
        //                     ["CCCC", "3", "5.3", "6"],
        //                 ]}
        //                 width="410px"
        //             />
        //             <div
        //                 className="device-left-col"
        //                 style={{ border: "1px solid red" }}
        //             >
        //                 <h5>New devices</h5>
        //             </div>
        //             <div
        //                 className="device-left-col"
        //                 style={{ border: "1px solid red" }}
        //             >
        //                 <h5>Events</h5>
        //             </div>
        //         </div>
        //         <div
        //             className="device-right-col justify-content-end device-right-container"
        //             style={{ border: "1px solid black" }}
        //         >
        //             <h5>Overview</h5>
        //         </div>
        //     </div>
        // </div>
    );
}

export default Overview;
