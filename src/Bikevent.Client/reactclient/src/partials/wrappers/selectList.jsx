import { Form } from "react-router-dom";
import { PAGE_MODE_ADD, PAGE_MODE_EDIT, PAGE_MODE_VIEW } from "../../lib/common";

export const SelectList = ({ label, fieldName, keyValues, defaultVal, currentVal, pageMode, register, errors }) => {

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

        <div className="row">
            <div className="col c3 label">{label}:</div>

            {pageMode === PAGE_MODE_VIEW && (
                <div>{getSelected()}</div>

            )}

            {(pageMode === PAGE_MODE_ADD || pageMode === PAGE_MODE_EDIT) &&
                <>
                    <select name={fieldName} id={fieldName} {...register(fieldName)}>
                        {keyValues.map(kv => {
                            return <option key={kv.key} value={kv.key}>{kv.value}</option>
                        })}
                    </select>
                </>}


            <div className="col c3">{errors[fieldName] ? <div className='error'>{errors[fieldName].message}</div> : <></>}</div>
        </div>
    </>);
}