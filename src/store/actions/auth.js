import axios from 'axios';

export const authStart = () => {
    return {
        type: 'AUTH_START'
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: 'AUTH_SUCCESS',
        token: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: 'AUTH_FAIL',
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');

    return {
        type: 'AUTH_LOGOUT'
    }
}

export const checkAuthTimeout = (expireTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expireTime * 1000)
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCct7j7_999sK_Pfuzrr9ZgUbDoia0MLQM'
        if(isSignUp){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCct7j7_999sK_Pfuzrr9ZgUbDoia0MLQM'
        } 
        axios.post(url, authData)
        .then(response=> {
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
            localStorage.setItem('token', response.data.idToken)
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', response.data.localId)
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn))
        })
        .catch(error => {
            console.log(error);
            dispatch(authFail(error.response.data.error))
        })
        
    }
}

export const authCheckState = () => {
    return dispatch => {
        console.log("hi1")
        const token = localStorage.getItem('token');
        if(!token){
            console.log("hi2")
            dispatch(logout())
        } else {
            console.log("hi3")
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()){
                console.log("hi4")
                dispatch(logout())
            } else {
                console.log("hi5")
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}