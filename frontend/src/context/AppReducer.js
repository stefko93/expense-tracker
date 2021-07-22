/* eslint-disable no-param-reassign */
/* eslint-disable no-case-declarations */
/* eslint-disable import/no-anonymous-default-export */
const AppReducer = (state, action) => {
    switch(action.type) {
        case 'DELETE_TRANSACTION':
            return {
                ...state,
                transactions: state.transactions.filter(transaction => transaction.id !== action.payload)
            }
        case 'EDIT_TRANSACTION':
            const { id, amount, text, date } = action.payload;
            state.transactions.forEach((transaction) => {
                if( transaction.id === id) {
                    transaction.amount = amount;
                    transaction.text = text;
                    transaction.dat = date;
                } 
            })
            return {
                ...state,
                transaction: [...state.transaction]
            }
        case 'ADD_TRANSACTION':
            return {
                ...state,
                transactions: [action.payload, ...state.transactions]
            }
        default:
            return state;
    }
}

export default AppReducer;