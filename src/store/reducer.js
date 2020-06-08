const initialState = {
    ingredients : {
        salad: 0,
        meat: 0,
        bacon: 0,
        cheese: 0
    },
    totalPrice: 20
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
        default:
            return state
    }
}

export default reducer;