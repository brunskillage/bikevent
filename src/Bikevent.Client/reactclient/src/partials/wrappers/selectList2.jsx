import { PAGE_MODE_ADD, PAGE_MODE_EDIT, PAGE_MODE_VIEW } from "../../lib/common";
import { Col, Form, Row } from "react-bootstrap";

export const SelectList2 = ({ label, fieldName, keyValues, defaultVal, currentVal, pageMode, register, errors }) => {

    // insert if not already there
    console.log("render select")

    const getSelected = () => {
        if (keyValues.length > 1 && currentVal) {
            let res = keyValues.filter(kv => kv.key === currentVal)
            if (res.length) return res[0].value
        }
        return "";
    }


    const addDefaultIfRequired = () => {
        if (!!keyValues && keyValues.length && !(keyValues[0].key === 0)) {
            keyValues.unshift({ key: 0, value: "Please select" });
        }
    }

    addDefaultIfRequired()


    return (<>

        <Form.Group as={Row} className="mb-3" controlId={"form" + { fieldName }}>
            <Form.Label column sm="2">
                {label}
            </Form.Label>
            <Col sm="8">
                {pageMode === PAGE_MODE_VIEW ?
                    <>
                        <Form.Control plaintext readOnly defaultValue={getSelected()} />
                    </>
                    :
                    <>
                        <Form.Select aria-label="Select Region" id={fieldName} {...register(fieldName)}>
                            {keyValues.map(kv => {
                                return <option key={kv.key} value={kv.key}>{kv.value}</option>
                            })}
                        </Form.Select>
                    </>
                }
            </Col>
        </Form.Group >
    </>);
}