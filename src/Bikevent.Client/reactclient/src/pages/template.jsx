import { PageTitle } from "../partials/wrappers/pageTitle";
import { SubMenu } from "../partials/wrappers/subMenu";
import { PageContainer } from "../partials/wrappers/pageContainer";


export const Template = (args) => {

    return (<>
        <div className='eventPage'>

            <PageTitle >Template Page</PageTitle>
            <SubMenu>
                This is the Submenu
            </SubMenu>

            <PageContainer>
                This is the Page Content
            </PageContainer>
        </div >
    </>);
}