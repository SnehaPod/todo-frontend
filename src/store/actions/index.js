import { GET_LIST,ADD_ITEM, EDIT_ITEM, DELETE_ITEM } from '../constants'

export const getItems = (item)=> dispatch => {
    fetch("/todo")
    .then(res =>res.json())
    .then(data=>{
        console.log('data :', data);
        dispatch({
            type:GET_LIST,
            payload:data.data
        })
    })
    .catch(e=>{console.log('e :', e);})
}

export const addItem = (item)=> dispatch => {
    
    fetch("/todo/", {
        method: 'POST',
        body:  JSON.stringify({
            title: item
        }),
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
        }
    })
    .then(res =>res.json())
    .then(data=>{
        dispatch({
            type:ADD_ITEM,
            payload:data
        })
    })
    .catch(e=>{console.log('e :', e);})
}

export const editItem = (item, id) => dispatch =>{
    console.log('item :', item);
    fetch('/todo/', {
        method: 'PUT',
        body: JSON.stringify({
            title: item,
            id: id
        }),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(data => {
        dispatch({type: EDIT_ITEM, payload: data})
    })
    .catch(err => console.log('err :', err))
}

export const deleteItem = item => dispatch =>{
    console.log('item :', item);
    fetch('/todo/', {
        method: 'DELETE',
        body: JSON.stringify({
            id: item
        }),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then((data) => {
        dispatch({type: DELETE_ITEM, payload: data})
    })
}