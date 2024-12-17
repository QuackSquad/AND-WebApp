import ListCard from "../../components/ListCard";

function Overview() {
    return (
        <div className="container">
            <div className="d-flex flex-column flex-lg-row align-items-stretch">
                <div className="left-box d-flex justify-content-center align-items-center mb-3 mb-lg-0">
                    <ListCard
                        title="Title"
                        listHeaders={["Name", "ID", "Value1", "Value2"]}
                        list={[
                            ["AAAA", "1", "1.5", "2"],
                            ["BBBB", "2", "3.4", "4"],
                            ["CCCC", "3", "5.3", "6"],
                            ["CCCC", "3", "5.3", "6"],
                            ["CCCC", "3", "5.3", "6"],
                            ["CCCC", "3", "5.3", "6"],
                            ["CCCC", "3", "5.3", "6"],
                            ["CCCC", "3", "5.3", "6"],
                            ["CCCC", "3", "5.3", "6"],
                        ]}
                        width="410px"
                    />
                </div>
                <div className="right-box d-flex justify-content-center align-items-center">
                    <ListCard
                        title="Title"
                        listHeaders={["Name", "ID", "Value1", "Value2"]}
                        list={[
                            ["AAAA", "1", "1.5", "2"],
                            ["BBBB", "2", "3.4", "4"],
                            ["CCCC", "3", "5.3", "6"],
                            ["CCCC", "3", "5.3", "6"],
                            ["CCCC", "3", "5.3", "6"],
                            ["CCCC", "3", "5.3", "6"],
                            ["CCCC", "3", "5.3", "6"],
                            ["CCCC", "3", "5.3", "6"],
                            ["CCCC", "3", "5.3", "6"],
                        ]}
                        width="410px"
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
