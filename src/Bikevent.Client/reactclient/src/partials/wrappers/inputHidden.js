import { Form } from "react-bootstrap";

export const InputHidden = ({ pageMode, label, fieldName, errors, register, currentVal }) => {
    return (
        <>
            <>
                <Form.Control type="hidden" isInvalid={!!errors[fieldName]} {...register(fieldName)} value={currentVal} />
            </>
        </>
    );
}

