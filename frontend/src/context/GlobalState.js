/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { createContext, useReducer } from 'react';
import jwtDecode from "jwt-decode";

import AppReducer from './AppReducer';

const initialState = {
    users: [],
    transactions: [],
    token: null,
    error: null,
    loading: true,
    incomes: [],
    expenses: [],
}
export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    const getToken = () => {
      return localStorage.getItem('token');
    }

   const getCurrentUser = () => {
        try {
          const jwt = localStorage.getItem('token');
          return jwtDecode(jwt);
        } catch (ex) {
          return null;
        }
      }


  async function getIncomes() {
    const config =  {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await getToken()}`
      }
  }
      try {
          const res = await fetch('http://localhost:5000/api/incomes', config).then((response) => response.json())
          
          dispatch({
              type: 'GET_INCOMES',
              payload: res.data
            });
      } catch (err) {
          dispatch({
              type: 'TRANSACTION_ERROR',
              payload: err.response.data.error
            });
      }
  }

  async function getExpenses() {
    const config =  {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await getToken()}`
      }
  }
      try {
          const res = await fetch('http://localhost:5000/api/expenses', config).then((response) => response.json())
          dispatch({
              type: 'GET_EXPENSES',
              payload: res.data
            });
      } catch (err) {
          dispatch({
              type: 'TRANSACTION_ERROR',
              payload: err.response.data.error
            });
      }
  }

    async function getTransactions() {
      const config =  {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${await getToken()}`
        }
    }
        try {
            const res = await fetch('http://localhost:5000/api/transactions', config).then((response) => response.json())

            dispatch({
                type: 'GET_TRANSACTIONS',
                payload: res.data
              });
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
              });
        }
    }

    async function deleteTransaction(id) {
        const config =  {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getToken()}`
            },
            body: JSON.stringify()
        }
        try {
            await fetch(`http://localhost:5000/api/transactions/${id}`, config)

            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            })
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
              });
        }
    }

    async function updateTransaction(id, transaction) {
        const config =  {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getToken()}`
            },
            body: JSON.stringify(transaction)
        }
        try {
            const res = await fetch(`http://localhost:5000/api/transactions/${id}`, config)
            dispatch({
                type: 'UPDATE_TRANSACTION',
                payload: res
            })
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
              });
        }

    }

    async function addTransaction(transaction) {
        const config =  {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getToken()}`
            },
            body: JSON.stringify(transaction)

        }

        try {
            const res = await fetch('http://localhost:5000/api/transactions', config)

            dispatch({
                type: 'ADD_TRANSACTION',
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
              });
        }
    }

    async function registerUser(user) {
        const config =  {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        }
        try {
          const res = await fetch('http://localhost:5000/api/register', config);
          const json = await res.json();

          if (res.status === 400) {
            if(json.error)
              dispatch({
                type: 'LOGIN_ERROR',
                payload: json.error
              });
          } 
          dispatch({
            type: 'REGISTER_USER',
            payload: json
          });
        } catch (err) {
          dispatch({
            type: 'LOGIN_ERROR',
            payload: err,
          });
        }
      }

      async function loginUser(user) {
        const config =  {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await getToken()}`
            },
            body: JSON.stringify(user)
        }
        try {
          const res = await fetch('http://localhost:5000/api/login', config);
          const json = await res.json();

          if (res.status === 400) {
            if(json.error)
              dispatch({
                type: 'LOGIN_ERROR',
                payload: json.error
              });
          } 
          dispatch({
            type: 'LOGIN_USER',
            payload: json
          });
        } catch (err) {
          dispatch({
            type: 'LOGIN_ERROR',
            payload: err,
          });
        }
      }

      async function loadUser() {
        try {
          const res = await fetch('http://localhost:5000/api/users').then((response) => response.json());
          console.log(res)
          dispatch({
            type: 'LOAD_USER',
            payload: res.data
          });
        } catch (err) {
          dispatch({
            type: 'LOGIN_ERROR',
            payload: err.response
          });
        }
      }

      async function updateUser(id, user) {
        const config =  {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }
        try {
          const res = await fetch(`http://localhost:5000/api/users/${id}`, config);
          dispatch({
            type: 'UPDATE_USER',
            payload: res,
          });
        } catch (err) {

          dispatch({
            type: 'LOGIN_ERROR',
            payload: err.response
          });
        }
      }

      function logoutUser() {
        dispatch({
          type: 'LOGOUT_USER',
        });
      }

    return(<GlobalContext.Provider value={{
        token: state.token,
        users: state.users,
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        incomes: state.incomes,
        expenses: state.expenses,
        getIncomes,
        getExpenses,
        getTransactions,
        deleteTransaction,
        updateTransaction,
        addTransaction,
        registerUser,
        loginUser,
        loadUser,
        updateUser,
        logoutUser,
        getToken,
        getCurrentUser,
    }}>
        { children }
    </GlobalContext.Provider>);
}