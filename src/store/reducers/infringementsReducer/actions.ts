import { Dispatch } from "redux";
import { InfringementsProps, InfringementsPropsResponse } from "../../../models/InfringementsProps";
import { InfringementsEnum } from "./actionType";
import { AnyAction } from "../../../models/IReduxProps";
import {
  fetchIncidents,
} from "../../../api/services/infringementsService/infringementsService";
// import dataSample from "../../../assets/data/response_1715794297386.json"; //delete json local file and import

export const getInfringementsDates = (dates: InfringementsProps[]) => {
  return { type: InfringementsEnum.GET_INFRINGEMENTS_DATES, payload: dates };
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
export const getInfringementsDatesToStore = (limit: number, offset: number) => {
    return async (dispatch: Dispatch<AnyAction>) => {
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

// export const getInfringementsDatesToStore = (limit: number, offset: number) => {
//     return async (dispatch: Dispatch<AnyAction>) => {
//       try {
//         const totalDataCount = dataSample.data.length;
//         const dataSampleLimited = dataSample.data.slice(offset, offset + limit);
//         dispatch(getInfringementsDates(dataSampleLimited));
//         dispatch(setPaginationData(totalDataCount, offset / limit + 1, limit));
//       } catch (error) {
//         console.error('Failed to fetch images:', error);
//       }
//     };
//   };
