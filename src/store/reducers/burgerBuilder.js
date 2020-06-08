const initialState = {
    ingredients : null,
    totalPrice: 20,
    error: false
}

const INGREDIENT_PRICES = {
    salad: 2,
    cheese: 5,
    meat: 20,
    bacon: 30
}

const reducer = (state=initialState, action) => {
    switch(action.type){
        case('ADD_INGREDIENT'):
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName] 
            }
        case('REMOVE_INGREDIENT'):
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            }
        case 'SET_INGREDIENTS':
            return {
                ...state,
                ingredients: action.ingredients,
                totalPrice: 20
            }   
        case 'FETCH_INGREDIENTSS_FAILED':
            return {
                ...state,
                error: true
            }     
        default:
            return state
    }
}

export default reducer;