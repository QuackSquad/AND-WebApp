import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import "../App.css";

interface messageProps {
    message: string;
    status: string;
}

function HttpTest() {
    const [data, setData] = useState<string>("");

    const getDataAxios = async () => {
        try {
            const response: AxiosResponse<messageProps> = await axios.get(
                "http://localhost:8000/hello/Per"
            );
            console.log(response.data);
            setData(response.data.message);
        } catch (error) {
            console.error("Error receiving data:", error);
        }
    };

    useEffect(() => {
        getDataAxios();
    }, []);

    return (
        <>
            <h1>HTTP Requests</h1>
            <button type="button" className="btn btn-primary">
                Primary
            </button>
            {data ? <p>{data}</p> : <p>Loading...</p>}
        </>
    );
}

export default HttpTest;
