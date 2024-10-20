export const InputB = ({pageMode, label, fieldName, errors, register, curentVal}) => {
    return (  
        <>
            <div className="row">
                <div className="col c3 label">{label}</div>
            
            {pageMode === undefined ? 
            (<div className="col c3"><div>{curentVal}</div></div>) 
            : 
            (<div className="col c3"><input {...register(fieldName)}></input></div>)}
                <div className="col c4">{errors[fieldName] ? <div className='error'>{errors[fieldName].message}</div> : <>&nbsp;</>}</div>
            </div> 
        </>
    );
}