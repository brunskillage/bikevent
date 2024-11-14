import { Form } from "react-bootstrap";
import { PAGE_MODE_VIEW } from "../../lib/common";
import { Controller } from "react-hook-form";

export const InputB = ({ pageMode, label, fieldName, errors, register, currentVal, control }) => {
    return (
        // <>
        //     <div className="row">
        //         <div className="col c3 label">{label}:</div>

        //         {pageMode === PAGE_MODE_VIEW ?
        //             (<><div className="col c4"><div>&nbsp;&nbsp;{currentVal}</div><br /></div></>)
        //             :
        //             (<div className="col c4"><input {...register(fieldName)}></input></div>)}
        //         <div className="col c3">{errors[fieldName] ? <div className='error'>{errors[fieldName].message}</div> : <></>}</div>
        //     </div>
        // </>
        <>
            <Controller
                name={fieldName}
                control={control}
                render={({ field }) =>
                    <Form.Group className="mb-3" controlId={"form" + { fieldName }}>
                        <Form.Label>{label}</Form.Label>
                        <Form.Control
                            isInvalid={!!errors.email}
                            {...register(fieldName)} errors={errors} />

                        {errors[fieldName] && <Form.Control.Feedback type="invalid">
                            {errors[fieldName].message}
                        </Form.Control.Feedback>}
                    </Form.Group >}
            ></Controller >
        </>
    );
}