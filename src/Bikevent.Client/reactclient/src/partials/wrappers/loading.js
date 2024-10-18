import { MsgA } from "./msg";
import { FaMotorcycle } from "react-icons/fa6";

export const LoadingA = ({isLoading}) => {
    return (  
    <>
      {isLoading &&  <MsgA><FaMotorcycle> </FaMotorcycle> Loading data....</MsgA> }
    </>);
}