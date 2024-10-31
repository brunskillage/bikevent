export const FormA = ({ onSubmit, children }) => {

    const handleSubmit = (onSubmit) => { }

    return <>
        <form onSubmit={onSubmit}>
            <div className="row">

                {children}

                <div className="col c3">&nbsp;</div>
                <div className="col c8"> <input className='btn btn-a btn-sm' type="submit" /></div>

            </div>
        </form>
    </>

}