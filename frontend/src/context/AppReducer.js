/* eslint-disable no-param-reassign */
/* eslint-disable no-case-declarations */
/* eslint-disable import/no-anonymous-default-export */
const AppReducer = (state, action) => {
    switch(action.type) {
        case 'GET_INCOMES': {
            return {
                ...state,
                loading: false,
                incomes: action.payload
            }
        }
        case 'GET_EXPENSES': {
            return {
                ...state,
                loading: false,
                expenses: action.payload
            }
        }
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
                    
        case 'REGISTER_USER':
            return {
                ...state,
                users: action.payload,
             }
        case 'LOGIN_USER':
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                token: action.payload.token,
                users: action.payload,
             }

        case 'UPDATE_USER':
            const { success, user } = action.payload;
            return {
                ...state,
                users: { success, user },
            }

        case 'LOAD_USER':
            const token = localStorage.getItem('token');
            return {
                ...state,
                token,
                loading: false,
                users: action.payload,
            }

        case 'LOGOUT_USER':
            localStorage.removeItem("token");
            window.location = '/login';
            return {
                ...state,
                token: null,
                users: null,
                loading: false,
            }

            case 'LOGIN_ERROR':
                return {
                  ...state,
                  error: action.payload
                }
        default:
            return state;
    }
}

export default AppReducer;