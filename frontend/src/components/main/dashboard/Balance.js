/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import React, { useContext } from 'react';

import { GlobalContext } from '../../../context/GlobalState';

export default function Balance() {
    const { transactions } = useContext(GlobalContext);

    const amounts = transactions.map(transition => transition.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0);

    return (
        <div className="container mb-5">
            <div className="d-flex justify-content-center">
                <h4>Your Balance</h4>
            </div>
            <div className="d-flex justify-content-center">
                <h1>{total}Ft</h1>
            </div>
        </div>
    )
}