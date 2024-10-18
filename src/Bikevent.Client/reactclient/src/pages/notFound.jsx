import { MsgA, MsgErrorA } from "../partials/wrappers/msg";

export const NotFound = (args) => {
    return (<>
        <div className='rides'>
            <h3>Page Not Found</h3>
            <MsgErrorA>The page you requested does not exist</MsgErrorA>
        </div>
    </>);
}
