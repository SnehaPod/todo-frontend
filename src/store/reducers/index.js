import { ADD_ITEM, DELETE_ITEM, EDIT_ITEM, GET_LIST } from '../constants'
const initialState = {
    items: []
}
const rootReducer = (state=initialState, action) =>  {
    switch(action.type) {
        case ADD_ITEM:
        return {
            ...state,
            items: action.payload
        }

        case DELETE_ITEM:
        return {
            ...state,
            items: state.items.map((x, index)=>{
                    if(x != action.payload){
                        return x
                    }
                    // if(x == action.payload) {
                    //     state.items.splice(index, x)
                    // }
               })
            // items: state.items.filter((item) => {
            //     return item !== action.payload
            // })
        }

        case EDIT_ITEM:
        return {
            ...state,
            item: action.payload
        }

        case GET_LIST:
        return {
            ...state,
            items: action.payload
        }

        default:
        return state
    }
}

export default rootReducer