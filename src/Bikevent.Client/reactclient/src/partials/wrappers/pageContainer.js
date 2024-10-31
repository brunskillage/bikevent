export const PageContainer = ({ children }) => {
    return <>
        <div className="container pageContainer">
            <div className="row">
                <div className="col c12">
                    {children}
                </div>
            </div>
        </div></>
}