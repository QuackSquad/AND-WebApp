import Card from "../../components/Card";
import ListCard from "../../components/ListCard";

function Device() {
    return (
        <>
            <h1>Device</h1>
            <div className="row" style={{ gap: "1rem", padding: "0" }}>
                <Card
                    topElement={
                        <span
                            className="placeholder placeholder-wave card-img-top"
                            style={{ height: "150px" }}
                        ></span>
                    }
                    title="Title"
                    text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque illo reiciendis quidem aut optio inventore dolores magnam. Consequuntur ab suscipit, officiis delectus aliquid quasi aperiam nostrum fuga saepe in quis?"
                    bottomElement={<button>Click me</button>}
                />
                <Card
                    topElement={
                        <span
                            className="placeholder placeholder-wave card-img-top"
                            style={{ height: "150px" }}
                        ></span>
                    }
                    title="Title"
                    text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque illo reiciendis quidem aut optio inventore dolores magnam. Consequuntur ab suscipit, officiis delectus aliquid quasi aperiam nostrum fuga saepe in quis?"
                    bottomElement={<button>Click me</button>}
                />
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
                />
            </div>
        </>
    );
}

export default Device;
