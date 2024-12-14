import { ReactNode, useState, useEffect } from "react";

interface ButtonProps {
    header: string;
    children?: ReactNode;
    submitText?: string;
    onSubmit: () => void;
    cancelText?: string;
    onCancel: () => void;
    onClose?: () => void;
    verticalCenter?: boolean;
    submitType?:
        | "primary"
        | "secondary"
        | "success"
        | "danger"
        | "warning"
        | "info"
        | "light"
        | "dark";
}

function Button({
    header,
    children,
    submitText = "Submit",
    onSubmit,
    cancelText = "Cancel",
    onCancel,
    onClose = onCancel,
    verticalCenter = true,
    submitType = "primary",
}: ButtonProps) {
    const [showModal, setShowModal] = useState(false);
    const [first, setFirst] = useState(true);
    const animationDelay = 300;

    useEffect(() => {
        if (first) {
            setShowModal(true);
            setFirst(false);
        }
    }, [showModal, first]);

    return (
        <>
            <div
                className={"modal fade" + (showModal ? " show modal-open" : "")}
                id="modal"
                style={{ display: "block" }}
                onClick={() => {
                    setShowModal(false);
                    setTimeout(() => {
                        onClose();
                        console.log("onClose");
                    }, animationDelay);
                }}
            >
                <div
                    className={
                        "modal-dialog" +
                        (verticalCenter && " modal-dialog-centered")
                    }
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="modalLabel">
                                {header}
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={() => {
                                    setShowModal(false);
                                    setTimeout(() => {
                                        onClose();
                                        console.log("onClose");
                                    }, animationDelay);
                                }}
                            ></button>
                        </div>
                        <div className="modal-body">{children}</div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                onClick={() => {
                                    setShowModal(false);
                                    setTimeout(() => {
                                        onCancel();
                                        console.log("onCancel");
                                    }, animationDelay);
                                }}
                            >
                                {cancelText}
                            </button>
                            <button
                                type="button"
                                className={"btn btn-" + submitType}
                                onClick={() => {
                                    setShowModal(false);
                                    setTimeout(() => {
                                        onSubmit();
                                        console.log("onSubmit");
                                    }, animationDelay);
                                }}
                            >
                                {submitText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={"modal-backdrop fade" + (showModal ? " show" : "")}
            ></div>
        </>
    );
}

export default Button;
