import { Reducer } from "redux"
import { InfringementsProps } from "../../../models/InfringementsProps"
import { AnyAction } from "../../../models/IReduxProps"
import { InfringementsEnum } from "./actionType"

type InfringementsType = {
    dateList: InfringementsProps[]
}

const defaultState: InfringementsType = {
    dateList: []
}

const infringementsReducer: Reducer<InfringementsType, AnyAction> = (state = defaultState, action) => {
    switch(action.type){
        case InfringementsEnum.GET_INFRINGEMENTS_DATES: return {...state, dateList: action.payload }
    default:
        return state
    }
}

export default infringementsReducer