import { IPlanner, IPlannerRow } from "../dataObjects";
import { FETCH_PLANNERS_ERROR, FETCH_PLANNERS_PENDING, FETCH_PLANNERS_SUCCESS } from "./actionConstants";
import { AppDispatch } from "./store";

// INIT STATE
// interface
interface ApiState {
  planners: IPlanner[];
  pending: boolean;
  error: string | null;
}

const initialState: ApiState = {
  planners: [],
  pending: false,
  error: null,
};

// ACTION CREATORS
export const GetPlannersPending = () => {
  return {
    type: FETCH_PLANNERS_PENDING,
  };
};

export const GetPlannersSuccess = (planners: IPlanner[]) => {
  return {
    type: FETCH_PLANNERS_SUCCESS,
    planners: planners,
  };
};

export const GetPlannersError = () => {
  return {
    type: FETCH_PLANNERS_ERROR,
  };
};

export const PlannersReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_PLANNERS_PENDING:
      return {
        ...state,
        pending: true,
      };
    case FETCH_PLANNERS_SUCCESS:
      return {
        ...state,
        planners: action.payload,
      };
    case FETCH_PLANNERS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
};

// SELECTORS
// export const getProducts = (state: ApiState) => state.planners;
// export const getProductsPending = (state: ApiState) => state.pending;
// export const getProductsError = (state: ApiState) => state.error;

export const getPlannersAsync = () => {
  return (dispatch: AppDispatch) => {
    console.log("getting planners async...");
    dispatch(GetPlannersPending());
    fetch("http://localhost:7091")
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        dispatch(GetPlannersSuccess(res.data.products));
        return res.products;
      })
      .catch((error) => {
        dispatch(GetPlannersSuccess(error));
      });
  };
};
