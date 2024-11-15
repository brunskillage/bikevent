import { Form } from "react-bootstrap";

export const InputHidden = ({ pageMode, label, fieldName, errors, register, currentVal }) => {
    return (
        <>
            {pageMode === undefined ?
                <>
                    <span></span>
                </>
                :
                <>
                    <Form.Control type="hidden"  {...register(fieldName)} defaultValue={currentVal} />
                </>
            }
        </>
    );
}

