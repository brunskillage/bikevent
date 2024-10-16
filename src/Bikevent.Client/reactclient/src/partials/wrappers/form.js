export const FormA = ({ onSubmit, children }) => {

    const handleSubmit = (onSubmit) => { }

    return <>
        <form onSubmit={onSubmit}>
            <div className="row">
                {children}
                <div className="col c2">&nbsp;</div>
                <div className="col c10"> <input className='btn btn-a btn-sm' type="submit" /></div>
            </div>
        </form>
    </>

}