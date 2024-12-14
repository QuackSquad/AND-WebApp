import { useState } from "react";
import Button from "../components/Button";
import Alert from "../components/Alert";
import DismissibleAlert from "../components/DismissibleAlert";
import ListGroup from "../components/ListGroup";
import "../App.css";
import Modal from "../components/Modal";

function Bootstrap() {
    const [count, setCount] = useState(0);
    const [showResetAlert, setShowResetAlert] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const list = ["Item 1", "Item 2", "Item 3"];

    return (
        <>
            {showModal && (
                <Modal
                    header="Modal"
                    onSubmit={() => setShowModal(false)}
                    onCancel={() => setShowModal(false)}
                    onClose={() => setShowModal(false)}
                >
                    Text...
                </Modal>
            )}
            <h1>Bootstrap</h1>
            <Alert type={count > 0 ? "primary" : "danger"}>
                Count is {count}
            </Alert>
            <div className="btn-group">
                <Button onClick={() => setCount((count) => count + 1)}>
                    Up
                </Button>
                <Button
                    onClick={() => setCount((count) => count - 1)}
                    type="secondary"
                >
                    Down
                </Button>
                <Button
                    onClick={() => {
                        setCount(0);
                        setShowResetAlert(true);
                    }}
                    type="danger"
                >
                    Reset
                </Button>
            </div>
            {showResetAlert && (
                <>
                    <DismissibleAlert
                        onDismiss={() => setShowResetAlert(false)}
                        type="warning"
                    >
                        Count has been reset{" "}
                    </DismissibleAlert>
                    <Button
                        type="close"
                        onClick={() => setShowResetAlert(false)}
                    ></Button>
                </>
            )}
            <ListGroup items={list}></ListGroup>
            <Button onClick={() => setShowModal(true)}>Show Modal</Button>
        </>
    );
}

export default Bootstrap;
