/* eslint-disable react/prop-types */
import React, { createContext, useReducer } from 'react';

import AppReducer from './AppReducer';

const initialState = {
    transactions: []
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

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
        addTransaction
    }}>
        { children }
    </GlobalContext.Provider>);
}