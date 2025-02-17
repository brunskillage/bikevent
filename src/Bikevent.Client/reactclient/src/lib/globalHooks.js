import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, matchRoutes } from "react-router-dom";

export let globalNavigate;
export let globaldispatch;
export let globalLocation;
export let globalIsLoading;

// this is a sort of hack to use hooks outside of a react component
// It is used in App.jsx router component. Seems weird but works.
// used becuase axios interceptors and config are not components 
// but need to redirect and update store ect which are hooks...
export const GlobalNavigate = () => {
    console.log("init globalNavigate")
    globalNavigate = useNavigate();
    globaldispatch = useDispatch();
    globalLocation = useLocation();
    globalIsLoading = useSelector(state => state.util.isLoading)

    return null;
}

export const locationMatchesRoute = (locationToMatch) => {
    return !!matchRoutes([{ path: locationToMatch }], globalLocation.pathname)
}