const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
}

const reducer = (state=initialState, action) => {
    switch(action.type){
        case 'AUTH_START':
            return{
                ...state,
                loading: true,
                error: null
            }
        case 'AUTH_SUCCESS':
            return {
                ...state,
                token: action.token,
                userId: action.userId,
                error: null,
                loading: false
            }
        case 'AUTH_FAIL':
            return {
                ...state,
                error: action.error,
                loading: false
            } 
        case 'AUTH_LOGOUT':
            return {
                ...state,
                token: null,
                userId: null,
                error: null,
                loading: false
            }
        default:
            return state;    
    }
}

export default reducer;