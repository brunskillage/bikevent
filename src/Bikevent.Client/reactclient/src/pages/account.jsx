import { ADD_CLUB } from '../lib/common';
import { LinkButton } from '../partials/wrappers/linkButton';
import { MsgHighlight, MsgSuccessA } from './../partials/wrappers/msg'

export const Account = () => {
   return (<>
      <h3>Account</h3>
      <MsgSuccessA>You are now signed in.</MsgSuccessA>
      <div><LinkButton path={ADD_CLUB} text="Add Club" /></div>
   </>)
};