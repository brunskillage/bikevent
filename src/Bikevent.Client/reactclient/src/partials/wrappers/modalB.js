import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export const ModalB = ({ children, isVisible = false, headerText = "header", handleOnClose = () => { } }) => {
    const [show, setShow] = useState(isVisible);

    const handleClose = () => {
        setShow(false)
        handleOnClose()
    };

    return <>
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{headerText}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    </>;
}

