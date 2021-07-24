/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import React, { useContext } from 'react';
import { GlobalContext } from '../../../context/GlobalState';

import numberWithCommas from '../../utils/Format';

export default function IncomeExpenses() {
    const { transactions } = useContext(GlobalContext);

    const amounts = transactions.map(transaction => transaction.amount);

    const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0);
    const expense = amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1;
    
    return (
        <div className="container mb-5">
            <div className="row">
                <div className="col text-center">
                    <h3>Income</h3>
                    <h4>{numberWithCommas(income)}Ft</h4>
                </div>

                <div className="col text-center">
                    <h3>Expense</h3>
                    <h4>{numberWithCommas(expense)}Ft</h4>
                </div>
            </div>
      </div>
    )
}
