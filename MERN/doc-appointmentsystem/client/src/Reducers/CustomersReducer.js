import * as ActionTypes  from "../Constants/CustomersConstants";

const initialState = {
    data: [],
    editdata:[],
    isLoading: false,
    errMess:null,
    messageapi: null
}

export const CustomersReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state
        case ActionTypes.CUSTOMERS_GET:
            return {...state, isLoading: true, data: action.payload, errMess: null,messageapi:null}
        // case ActionTypes.CUSTOMERS_GET_EDIT:
        //         return {...state, isLoading: true, editdata: action.payload,errMess: null,messageapi:null}
        case ActionTypes.CUSTOMERS_LOADING:
            return {...state, isLoading: true}
        case ActionTypes.CUSTOMERS_SUCCESS:
            return {...state, isLoading: false, messageapi: action.payload, errMess: null}
        case ActionTypes.CUSTOMERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, messageapi: null}
    }
}