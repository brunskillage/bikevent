export const InputA = ({label, fieldName, errors, register}) => {
    return (  
        <>
            <div className="row">
                <div className="col c2">{label}</div>
                <div className="col c3"><input {...register(fieldName)}></input></div>
                <div className="col c4">{errors[fieldName] ? <div className='error'>{errors[fieldName].message}</div> : <>&nbsp;</>}</div>
            </div> 
        </>
    );
}