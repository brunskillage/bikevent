import { PageTitle } from "../partials/wrappers/pageTitle";
import { MsgA, MsgErrorA } from "../partials/wrappers/msg";

export const NotFound = (args) => {
    return (<>
        <div className='rides'>
            <PageTitle title="Page not found"></PageTitle>
            <MsgErrorA>The page you requested does not exist</MsgErrorA>
        </div>
    </>);
}
