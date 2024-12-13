import { ReactNode, useState } from "react";

interface ButtonProps {
    header: string;
    children?: ReactNode;
    submitText?: string;
    onSubmit: () => void;
    cancelText?: string;
    onCancel: () => void;
    onClose?: () => void;
    verticalCenter?: boolean;
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
}: ButtonProps) {
    const [showModal, setShowModal] = useState(true);

    return (
        <div
            className={"modal fade" + (showModal ? " show" : "")}
            id="exampleModal"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            style={{ display: "block" }}
        >
            <div
                className={
                    "modal-dialog" +
                    (verticalCenter && " modal-dialog-centered")
                }
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                            {header}
                        </h1>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={() => {
                                setShowModal(false);
                                setInterval(() => {
                                    onClose();
                                    setShowModal(true);
                                }, 500);
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
                                setInterval(() => {
                                    onCancel();
                                    setShowModal(true);
                                }, 500);
                            }}
                        >
                            {cancelText}
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => {
                                setShowModal(false);
                                setInterval(() => {
                                    onSubmit();
                                    setShowModal(true);
                                }, 500);
                            }}
                        >
                            {submitText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Button;
