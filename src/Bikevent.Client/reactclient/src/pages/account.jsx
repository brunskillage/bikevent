import { ADD_CLUB } from '../lib/common';
import { PageTitle } from '../partials/wrappers/pageTitle';
import { LinkButton } from '../partials/wrappers/linkButton';
import { MsgA, MsgHighlight, MsgSuccessA } from './../partials/wrappers/msg'

export const Account = () => {
   return (<>
      <PageTitle title="Account">
         <LinkButton path="/clubs" text={"Clubs"}></LinkButton>

      </PageTitle>
      <MsgA>You are now signed in.</MsgA>
   </>)
};