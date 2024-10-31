export const MsgA = ({ children }) => {
    return <div className="msgContainer"><div className="">{children}</div></div>;
}
export const MsgSuccessA = ({ children }) => {
    return <div className="msgContainer"><div className="success">{children}</div></div>;
}
export const MsgErrorA = ({ children }) => {
    return <div className="msgContainer"><div className="error">{children}</div></div>;
}
export const MsgHighlight = ({ children }) => {
    return <div className="msgContainer"><div className="highlight">{children}</div></div>;
}