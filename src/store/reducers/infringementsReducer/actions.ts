import { Dispatch } from "redux";
import { InfringementsProps } from "../../../models/InfringementsProps";
import { InfringementsEnum } from "./actionType";
import { AnyAction } from "../../../models/IReduxProps";
// import { fetchImage, fetchIncidents } from "../../../api/services/infringementsService/infringementsService";
import dataSample from '../../../assets/data/dataSample.json'; //delete json local file and import

export const getInfringementsDates = (dates: InfringementsProps[]) => {
    return { type: InfringementsEnum.GET_INFRINGEMENTS_DATES, payload: dates };
}

// export const getInfringementsDatesToStore = (limit: number) => {
//     return (dispatch: Dispatch<AnyAction>) => {
//         fetchIncidents(limit, offset)
//             .then(dataList => {
//                 const updatedDataList = Promise.all(dataList.map(async (incident) => {
//                     const roadImageBlob = await fetchImage(incident.road_frame_filename);
//                     const fullImageBlob = await fetchImage(incident.full_frame_filename);

//                     return {
//                         ...incident,
//                         road_frame_blob: roadImageBlob,
//                         full_frame_blob: fullImageBlob
//                     };
//                 }));

//                 return updatedDataList;
//             })
//             .then(updatedDataList => {
//                 dispatch(getInfringementsDates(updatedDataList));
//             })
//             .catch(error => {
//                 console.error('Failed to fetch incidents or images:', error);
//             });
//     };
// };

export const getLocalInfringementsDatesToStore = (limit: number) => {
    return async (dispatch: Dispatch<AnyAction>) => {
        try {
            const dataSampleLimited = dataSample.slice(0, limit);

            dispatch(getInfringementsDates(dataSampleLimited));

        } catch (error) {
            console.error('Failed to fetch images:', error);
        }
    };
}
