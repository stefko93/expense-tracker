/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";

import { GlobalContext } from '../../../context/GlobalState';

import numberWithCommas from '../../utils/Format';

const Transaction = ({ transaction }) => {
    const history = useHistory();

    const { deleteTransaction } = useContext(GlobalContext);

    const sign = transaction.amount < 0 ? '-' : '+';

    const handleRoute = () =>{ 
        history.push({
            pathname: `/update/${(transaction._id)}` ,
            transaction
        });
  }

    return (
        <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
            {transaction.text} 
            <span>{sign}{numberWithCommas(Math.abs(transaction.amount))}Ft</span>
            <span>{transaction.date}</span>
            <button className="delete-btn" onClick={() => deleteTransaction(transaction._id)} >delete</button>
            <button className="edit-btn" onClick={handleRoute} >edit</button>
        </li>
    )
}

export default Transaction;