export const PageTitle = ({ title, hideSubmenu, children }) => {
    return (<>
        <div className="pageTitle">
            <h3>{title}</h3>
            {!hideSubmenu &&
                <div className="subMenu">
                    {children}
                </div>}
        </div>
    </>);
}