/* eslint-disable no-unused-vars */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import React, { useContext, useEffect  } from 'react';

import { GlobalContext } from '../../../context/GlobalState';
import numberWithCommas from '../../utils/Format';

export default function Balance() {
    const { transactions, getTransactions, resetTransaction } = useContext(GlobalContext);

    if( transactions && transactions.length !== 0 ) {
        const amounts = transactions.map(transition => transition.amount);
        const total = amounts.reduce((acc, item) => (acc += item), 0);
    }
    const total = '0';

    useEffect(() => {
        resetTransaction()
        console.log(resetTransaction)
        getTransactions();
    }, [])


    return (
        <div className="container mb-5">
            <div className="d-flex justify-content-center">
                <h4>Your Balance</h4>
            </div>
            <div className="d-flex justify-content-center">
                <h1>{numberWithCommas(total)}Ft</h1>
            </div>
        </div>
    )
}
