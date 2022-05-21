import axios from 'axios'
import setAuthToken from '../../utils/setAuthToken'
import {setAlert} from "./alert";
import {
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT,
    UPDATE_USER
} from '../types'

// Load User
export const loadUser = () => async dispatch => {
    try {
        setAuthToken(localStorage.token)
        const res = await axios.get('/api/v1/users/profile')
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (err) {
        console.log(err)
        dispatch({
            type: AUTH_ERROR
        })
    }
}

//Signup user
export const signup = (body) => async dispatch =>{
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    try {
        const res = await axios.post('/api/v1/users/register',body,config)
        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
        })
        dispatch(setAlert('Signed Up succesfully','success'))
        dispatch(loadUser())
    } catch (err) {
        const errors = err.response.data.errors

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.message, 'danger')))
        }
        dispatch({
            type: REGISTER_FAIL
        })
    }

}

// Login User
export const login = (email, password) => async dispatch => {
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body = { credentials:email, motdepasse:password }
    try {
        const res = await axios.post('/api/v1/users/login', body, config)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
        dispatch(setAlert('Logged in successfully',"success"))
    } catch (err) {
        const errors = err.response.data.errors
        console.log('errors',err.response.data)
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.message, 'danger')))
        }
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

// Logout
export const logout = () => dispatch => {
    dispatch({type: LOGOUT})
    dispatch(setAlert("Logged out successfully",'success'))
}


// Update
export const updateUser = (id,body) => async dispatch => {
    try {
  
      const config = {
        headers:{
          'Content-Type':'application/json'
        }
      }
      const res = await axios.put(`/api/v1/users/${id}`,body,config)
      dispatch({
        type:UPDATE_USER,
        payload:res.data
      })
      dispatch(setAlert('Your profile has been updated succesfully','success'))
    } catch (err) {
      const errors = err.response.data.errors
      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.message, 'danger')))
      }
    }
  }