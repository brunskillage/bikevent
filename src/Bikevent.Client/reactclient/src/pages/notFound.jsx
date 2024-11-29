import { PageTitle } from "../partials/wrappers/pageTitle";
import { MsgA } from "../partials/wrappers/msg";

export const NotFound = (args) => {
    return (<>
        <div className='rides'>
            <PageTitle title="Page not found"></PageTitle>
            <MsgA variant={"info"}>The page you requested does not exist</MsgA>
        </div>
    </>);
}
