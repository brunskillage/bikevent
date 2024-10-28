import { PAGE_MODE_VIEW } from "../../lib/common";

export const InputB = ({ pageMode, label, fieldName, errors, register, currentVal }) => {
    return (
        <>
            <div className="row">
                <div className="col c3 label">{label}</div>

                {pageMode === PAGE_MODE_VIEW ?
                    (<div className="col c3"><div>{currentVal}</div></div>)
                    :
                    (<div className="col c3"><input {...register(fieldName)}></input></div>)}
                <div className="col c4">{errors[fieldName] ? <div className='error'>{errors[fieldName].message}</div> : <>&nbsp;</>}</div>
            </div>
        </>
    );
}