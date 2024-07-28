import * as ActionTypes  from "../Constants/CustomersConstants";
import { handleError } from "../Shared/handleError";
import axios from 'axios'

// for getting customer data
export const getCustomers = (page, pageSize) => dispatch => {
    dispatch(CustomersLoading())
    axios.get(`https://reqres.in/api/users?page=${page}&per_page=${pageSize}` )
    .then(r => {
        console.log(r.data.data,'inside get')
        // storing list in localstorage
        localStorage.setItem('list', JSON.stringify(r.data.data))
        dispatch(getCustomersdata(r.data))})
    // .then(r => dispatch(PjsipgeneralSuccess(r.data)))
    .catch(e => dispatch(CustomersFailed(handleError(e))))
}
// for posting customer data
export const postCustomers = (data) => dispatch => {
    dispatch(CustomersLoading())
    axios.post('https://dummyjson.com/products/add',data
    )
    // console.log(data,'testing data')
    .then(r =>{ 
 dispatch(CustomersSuccess(r.data))})
    // this api doesnot store data so the list cannot be updated so i am calling the previous list and storing the data in previous list
    // but i have implemented full update functionality
    .then(r => dispatch(getCustomers(1,6)))
    .catch(e => dispatch(CustomersFailed(handleError(e))))
}
// for updating customer data
export const updateCustomers = (id, data) => dispatch => {
    dispatch(CustomersLoading())
    axios.put(`https://reqres.in/api/users/${id}`, data)
// this api doesnot update data so the list cannot be updated so i am calling the previous list and storing the data in previous list
// but i have implemented full update functionality
        .then(() => dispatch(getCustomers(1,6)))
        .then(r => {
            localStorage.setItem('list', r.data)
            dispatch(CustomersSuccess(r.data))})
        .catch(e => dispatch(CustomersFailed(handleError(e))))
}
// for deleting customer data
export const deleteCustomers = (id) => dispatch => {
    dispatch(CustomersLoading())
    axios.delete(`https://reqres.in/api/users/${id}`)
    .then(r => dispatch(CustomersSuccess(r.data)))
// this api doesnot delete data so the list cannot be updated so i am calling the previous list and storing the data in previous list
// but i have implemented full delete functionality
    .then(r => dispatch(getCustomers(1,6)))
    .catch(e => dispatch(CustomersFailed(handleError(e))))
}
// i have not used it but implemented its full functionality
export const getId = (id) => dispatch => {
    // dispatch(CustomersLoading())
    axios.get(`https://reqres.in/api/users/${id}`)
    .then(r =>{ 
        console.log(r.data.data,'inside action')
        
        localStorage.setItem('user_data', JSON.stringify(r.data.data))
        dispatch(getCustomersdata(r.data))})
    .catch(e => dispatch(CustomersFailed(handleError(e))))
}
const CustomersLoading = () => ({
    type: ActionTypes.CUSTOMERS_LOADING
})

const CustomersSuccess = data => ({
    type: ActionTypes.CUSTOMERS_SUCCESS,
    message: data
})
const getCustomersdata = data => ({
    type: ActionTypes.CUSTOMERS_GET,
    payload: data
})
// const getCustomersdataedit = editdata => ({
//     type: ActionTypes.CUSTOMERS_GET_EDIT,
//     payload: editdata
// })
const CustomersFailed = err => ({
    type: ActionTypes.CUSTOMERS_FAILED,
    error: err
})