import { Col, Form, Row } from "react-bootstrap";
import { PAGE_MODE_ADD, PAGE_MODE_EDIT, PAGE_MODE_VIEW } from "../../lib/common";
import { Controller } from "react-hook-form";

export const InputB = ({ pageMode, label, fieldName, errors, register, currentVal, control }) => {
    return (
        <>
            <Controller
                name={fieldName}
                control={control}
                render={({ field }) =>
                    <Form.Group as={Row} className="mb-3" controlId={"form" + { fieldName }}>
                        <Form.Label column sm="3">
                            {label}
                        </Form.Label>
                        <Col sm="8">
                            {pageMode === PAGE_MODE_VIEW && <Form.Control plaintext readOnly defaultValue={currentVal} />}
                            {pageMode === PAGE_MODE_ADD &&
                                <>
                                    <Form.Control isInvalid={!!errors[fieldName]}
                                        {...register(fieldName)} errors={errors} />
                                </>
                            }
                            {pageMode === PAGE_MODE_EDIT &&
                                <>
                                    <Form.Control isInvalid={!!errors[fieldName]}
                                        {...register(fieldName)} errors={errors} />
                                </>
                            }

                            {errors[fieldName] && <Form.Control.Feedback type="invalid">
                                {errors[fieldName].message}
                            </Form.Control.Feedback>}
                        </Col>
                    </Form.Group >}
            ></Controller >
        </>
    );
}