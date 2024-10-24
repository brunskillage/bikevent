import { useSelector } from "react-redux";
import { MsgErrorA } from "../partials/wrappers/msg";

export const Error = () => {

    const error = useSelector(state => state.util.error)

    return (<>
        <div className='club'>
            <h3>Error Page</h3>
            <MsgErrorA>{error}</MsgErrorA>
        </div >

    </>);
}

