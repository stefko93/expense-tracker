import React, { useContext, useEffect } from 'react'

import { GlobalContext } from '../../../context/GlobalState';

import Transaction from './Transaction';

export default function TransactionList() {
    const { transactions, getTransactions  } = useContext(GlobalContext);

    useEffect(() => {
        getTransactions();
    }, [])

    return (
        <>
            <h2>History</h2>  
                        <div className="table-responsive">
                          <table className="table table-striped table-sm ">
                            <thead>
                              <tr>
                                <th>Detail</th>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Operations</th>
                              </tr>
                            </thead>         
                         <tbody>                
                            { transactions && transactions.map((transaction) => ( 
                                <tr key={transaction}>
                                    <Transaction transaction={transaction} /> 
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
        </>
    )
}
