import axios from '../../axios-orders';

export const addIngredient = (name) => {
    return {
        type: 'ADD_INGREDIENT',
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: 'REMOVE_INGREDIENT',
        ingredientName: name
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: 'SET_INGREDIENTS',
        ingredients: ingredients
    }
}

export const fetchIngredientsFalied = () => {
    return {
        type: 'FETCH_INGREDIENTS_FAILED'
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://burger-react-bace8.firebaseio.com/ingredients.json')
        .then(response => {
            dispatch(setIngredients(response.data));
        })
        .catch(error => {
            dispatch(fetchIngredientsFalied())
        })
    }
}