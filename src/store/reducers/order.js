const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const reducer = (state=initialState, action) => {
    switch(action.type){
        case 'PURCHASE_INIT':
            return {
                ...state,
                purchased: false
            }
        case 'PURCHASE_BURGER_SUCCESS':
            const newOrder = {
                ...action.orderData,
                id: action.id
            }
            return{
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder),
                purchased: true
            }
        case 'PURCHASE_BURGER_FAIL':
            return {
                ...state,
                loading: false
            }
        case 'PURCHASE_BURGER_START':
            return {
                ...state,
                loading: true,
                purchased: false
            }
        case 'FETCH_ORDERS_START':
            return {
                ...state,
                loading: true,
            }  
        case 'FETCH_ORDERS_SUCCESS':
            return {
                ...state,
                loading: false,
                orders: action.orders,
            }
        case 'FETCH_ORDERS_FAIL':
            return {
                ...state,
                loading: false
            }               
        default:
            return state
    }

}

export default reducer