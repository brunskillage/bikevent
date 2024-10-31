export const ButtonLink = ({ text, onClick }) => {
    return (<>
        <button className="btn btn-a btn-sm linkButton" onClick={onClick}>{text}</button>
    </>);
}