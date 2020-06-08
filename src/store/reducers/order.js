const initialState = {
    orders: [],
    loading: false,
    purchase: false
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
                orders: state.orders.concat(newOrder)
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
                purchased: true
            }        
        default:
            return state
    }

}

export default reducer