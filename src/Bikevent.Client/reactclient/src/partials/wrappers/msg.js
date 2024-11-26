import { Alert } from "react-bootstrap";

export const MsgA = ({ children, variant = 'info' }) => {
    return <>
        <div className="msgA">
            <Alert className="m-2 text-center" variant={variant}>{children}</Alert>
        </div>
    </>
}

