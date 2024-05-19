import { Dispatch } from "redux";
import { InfringementsProps, InfringementsPropsResponse, PartialInfringementsProps } from "../../../models/InfringementsProps";
import { InfringementsEnum } from "./actionType";
import { AnyAction } from "../../../models/IReduxProps";
import {
  fetchIncidents,
  fetchPartialIncidents,
} from "../../../api/services/infringementsService/infringementsService";
import { store } from "../../store";
import dataSample from "../../../assets/data/response_1715794297386.json"; //delete json local file and import

export const getInfringementsDates = (dates: InfringementsProps[]) => {
  return { type: InfringementsEnum.GET_INFRINGEMENTS_DATES, payload: dates };
};

export const getInfringementsDatesForGraph = (dates: PartialInfringementsProps[]) => {
  return { type: InfringementsEnum.GET_INFRINGEMENTS_DATES_FOR_GRAPH, payload: dates };
};


export const setPaginationData = (
  count: number,
  currentPage: number,
  limit: number
) => {
  return {
    type: InfringementsEnum.SET_PAGINATION_DATA,
    payload: { count, currentPage, limit },
  };
};
export const getInfringementsDatesToStore = () => {
    return async (dispatch: Dispatch<AnyAction>) => {
      const { limit, currentPage } = store.getState().infringementsReducer
      const offset = (currentPage - 1) * limit;

      try {
        const response: InfringementsPropsResponse = await fetchIncidents(limit, offset);
        const { totalCount, data } = response;
  
        dispatch(getInfringementsDates(data));
        dispatch(setPaginationData(totalCount, offset / limit + 1, limit));
      } catch (error) {
        console.error("Failed to fetch incidents or images:", error);
      }
    };
};

export const getInfringementsDatesToStoreForGraph = () => {
  return async (dispatch: Dispatch<AnyAction>) => {

    try {
      const response: PartialInfringementsProps[] = await fetchPartialIncidents();

      dispatch(getInfringementsDatesForGraph(response));
    } catch (error) {
      console.error("Failed to fetch incidents for graph:", error);
    }
  };
};

// export const getInfringementsDatesToStore = (limit: number, offset: number) => {
//     return async (dispatch: Dispatch<AnyAction>) => {
//       try {
//         const totalDataCount = dataSample.data.length;
//         const dataSampleLimited = dataSample.data.slice();
//         dispatch(getInfringementsDates(dataSampleLimited));
//         dispatch(setPaginationData(totalDataCount, offset / limit + 1, limit));
//       } catch (error) {
//         console.error('Failed to fetch images:', error);
//       }
//     };
//   };
