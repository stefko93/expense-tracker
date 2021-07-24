/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { createContext, useReducer } from 'react';

import AppReducer from './AppReducer';

const initialState = {
    users: [],
    transactions: [],
    token: null,
    error: null,
    loading: true
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    const getToken = () => {
        return localStorage.getItem('token');
      }

    async function getTransactions() {
        try {
            const res = await fetch('http://localhost:5000/api/transactions').then((response) => response.json())

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
                'Content-Type': 'application/json'
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
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transaction)
        }
        try {
            const res = await fetch(`http://localhost:5000/api/transactions/${id}`, config)
            console.log(res)
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
                'Content-Type': 'application/json'
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

    return(<GlobalContext.Provider value={{
        token: state.token,
        users: state.users,
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        getToken,
        getTransactions,
        deleteTransaction,
        updateTransaction,
        addTransaction
    }}>
        { children }
    </GlobalContext.Provider>);
}