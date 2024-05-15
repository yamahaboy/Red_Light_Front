import { Reducer } from "redux"
import { InfringementsProps } from "../../../models/InfringementsProps"
import { AnyAction } from "../../../models/IReduxProps"
import { InfringementsEnum } from "./actionType"

type InfringementsType = {
    dateList: InfringementsProps[]
    count: number;
    currentPage: number;
    limit: number;
}

const defaultState: InfringementsType = {
    dateList: [],
    count: 1,
    currentPage: 1,
    limit: 5,
}

const infringementsReducer: Reducer<InfringementsType, AnyAction> = (state = defaultState, action) =>  {
    switch(action.type){
        case InfringementsEnum.GET_INFRINGEMENTS_DATES: return {...state, dateList: action.payload }
        case InfringementsEnum.SET_PAGINATION_DATA: return { ...state,count: action.payload.count,currentPage: action.payload.currentPage,limit: action.payload.limit}
    default:
        return state
    }
}

export default infringementsReducer