/* eslint-disable react/prop-types */
import React, { createContext, useReducer } from 'react';

import AppReducer from './AppReducer';

const initialState = {
    transactions: []
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    async function getTransactions() {
        try {
            const res = await fetch('/api/v1/transactions');

            dispatch({
                type: 'GET_TRANSACTIONS',
                payload: res.data.data
              });
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
              });
        }
    }

    function deleteTransaction(id) {
        dispatch({
            type: 'DELETE_TRANSACTION',
            payload: id
        })
    }

    function editTransaction(id, transaction) {
        dispatch({
            type: 'EDIT_TRANSACTION',
            payload: transaction
        })
    }

    function addTransaction(transaction) {
        dispatch({
            type: 'ADD_TRANSACTION',
            payload: transaction
        })
    }

    return(<GlobalContext.Provider value={{
        transactions: state.transactions,
        deleteTransaction,
        editTransaction,
        getTransactions,
        addTransaction
    }}>
        { children }
    </GlobalContext.Provider>);
}