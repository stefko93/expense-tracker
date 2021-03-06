/* eslint-disable no-unused-vars */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import React, { useContext, useEffect  } from 'react';

import numberWithCommas from '../../utils/Format';

import { GlobalContext } from '../../../context/GlobalState';

export default function Balance() {
    const { transactions, getTransactions } = useContext(GlobalContext);

    useEffect(() => {
        getTransactions();
    }, [])

    let total = 0;
    let amounts = 0;

    if(transactions === 'undefined' || transactions === 0){
        amounts = 0;
        total = 0;
    } else {
        amounts = transactions.map(transition => transition.amount);
        total = amounts.reduce((acc, item) => (acc += item), 0);
    }
    


    return (
        <div className="container mb-5">
            <div className="d-flex justify-content-center">
                <h4>Your Balance</h4>
            </div>
            <div className="d-flex justify-content-center">
                {transactions && <h1>{numberWithCommas(total)}Ft</h1>}
            </div>
        </div>
    )
}
