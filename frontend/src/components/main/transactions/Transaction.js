/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React, { useContext } from 'react';

import { GlobalContext } from '../../../context/GlobalState';

const Transaction = ({ transaction }) => {
    const { deleteTransaction } = useContext(GlobalContext);

    const sign = transaction.amount < 0 ? '-' : '+';

    return (
        <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
            {transaction.text} 
            <span>{sign}{Math.abs(transaction.amount)}Ft</span>
            <span>{transaction.date}</span>
            <button className="delete-btn" onClick={() => deleteTransaction(transaction.id)} >delete</button>
            <button className="edit-btn">edit</button>
        </li>
    )
}

export default Transaction;