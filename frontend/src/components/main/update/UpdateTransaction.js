/* eslint-disable react/button-has-type */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {useState, useContext} from 'react';
import { useLocation } from 'react-router-dom';
// import { Link, useHistory } from "react-router-dom";

import { GlobalContext } from '../../../context/GlobalState';

const UpdateTransaction = ( ) => {
    const { updateTransaction } = useContext(GlobalContext);
    
    const {transaction} = useLocation();
    // const history = useHistory();

    // const currentTransactionId = match.params.id;
    
    const [text, setText] = useState(transaction.text);
    const [amount, setAmount] = useState(transaction.amount);
    const [date, setDate] = useState(new Date());

    // useEffect(() => {
    //   const transactionId = transaction._id;
    //   const selectedTransaction = transactions.find(transaction => transaction._id === transactionId);
    //   console.log(selectedTransaction)
    // }, [transactions])
  
    const onSubmit = e => {
      e.preventDefault();
  
      const newTransaction = {
        text,
        amount: +amount,
        date,
      }
  
      updateTransaction(transaction._id, newTransaction);   

      setText('');
      setAmount('');
      setDate('');
    }
  
    return (
      <>
        <h3>Update transaction</h3>
        <form onSubmit={onSubmit}>
        <div className="form-control">
            <label htmlFor="text">Text</label>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text..." />
          </div>
          <div className="form-control">
            <label htmlFor="amount"
              >Amount <br />
              (negative - expense, positive - income)</label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." />
          </div>
          <div className="form-control">
            <label htmlFor="date">Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)}  />
          </div>
          <button className="btn btn-dark">Save</button>
        </form>
      </>
    )
}

export default UpdateTransaction;