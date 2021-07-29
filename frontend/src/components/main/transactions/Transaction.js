/* eslint-disable no-lone-blocks */
/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";

import { GlobalContext } from '../../../context/GlobalState';

import numberWithCommas from '../../utils/Format';
import formatDate from '../../utils/FormatDate';

const Transaction = ({ transaction }) => {
    const history = useHistory();

    const { deleteTransaction } = useContext(GlobalContext);

    const sign = transaction.amount < 0 ? '-' : '+'

    const handleRoute = () =>{ 
        history.push({
            pathname: `/update/${(transaction._id)}` ,
            transaction
        });
    }

    return (
         <>
            <td>{transaction.detail}</td>
            <td>{transaction.type}</td>
            <td>{sign}{numberWithCommas(Math.abs(transaction.amount))}Ft</td>
            <td>{formatDate(transaction.date)}</td>
            <td style={{whiteSpace: "nowrap"}}>
                <button
                        type="button" className="btn btn-sm btn-primary"
                        onClick={handleRoute}
                    >Edit</button>&nbsp;
                <button
                        type="button" className="btn btn-sm btn-danger"
                        onClick={() => deleteTransaction(transaction._id)}
                    >Delete</button>
            </td>
         </>
        
    )
}

export default Transaction;
