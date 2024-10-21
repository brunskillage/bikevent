export const InputHidden = ({pageMode, label, fieldName, errors, register, currentVal, control}) => {
    return (  
        <>
            <div className="row">
            {pageMode === undefined ? 
            (<div className="col c3"><div>{currentVal}</div></div>) 
            : 
            (<div className="col c3"><input type="hidden" {...register(fieldName)}  defaultValue={currentVal}></input></div>)}
             <div className="col c4"></div>
            </div> 
        </>
    );
}