import { PAGE_MODE_ADD, PAGE_MODE_EDIT, PAGE_MODE_VIEW } from "../../lib/common";

export const SelectList = ({ label, fieldName, keyValues, defaultVal, currentVal, pageMode, register }) => {

    keyValues.unshift({ key: 0, value: "Please select" });


    const handleChange = () => {
        console.log("region changed")
    }

    return (<>
        <div className="row">
            <div className="col c3 label">{label}</div>
            {pageMode === PAGE_MODE_VIEW &&
                <div>{currentVal}</div>
            }
            {(pageMode === PAGE_MODE_ADD || pageMode === PAGE_MODE_EDIT) &&
                <>
                    <select name={fieldName} id={fieldName} {...register(fieldName)}>
                        {keyValues.map(kv => {
                            return <option key={kv.key} value={kv.key}>{kv.value}</option>
                        })}
                    </select>
                </>}
        </div>
    </>);
}