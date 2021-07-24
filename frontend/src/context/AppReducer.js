/* eslint-disable no-param-reassign */
/* eslint-disable no-case-declarations */
/* eslint-disable import/no-anonymous-default-export */
const AppReducer = (state, action) => {
    switch(action.type) {
        case 'GET_TRANSACTIONS': {
            return {
                ...state,
                loading: false,
                transactions: action.payload
            }
        }
        case 'GET_TRANSACTION':
            return {
                ...state,
                loading: false,
                transactions: action.payload,
            }
        case 'DELETE_TRANSACTION':
            return {
                ...state,
                transactions: state.transactions.filter(transaction => transaction._id !== action.payload)
            }
        case 'UPDATE_TRANSACTION':
            const { _id, amount, text, date } = action.payload;
            state.transactions.forEach(transaction => {
                if (transaction._id === _id) {
                transaction.amount = amount;
                transaction.text = text;
                transaction.date = date;
                }
            });
            return {
                ...state,
                transactions: [...state.transactions],
            };
        case 'ADD_TRANSACTION':
            return {
                ...state,
                transactions: [...state.transactions, action.payload]
            }
        case 'TRANSACTION_ERROR':
                return {
                    ...state,
                    error: action.payload
                }    
        default:
            return state;
    }
}

export default AppReducer;