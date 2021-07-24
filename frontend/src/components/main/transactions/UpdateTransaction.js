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
    console.log(transaction);
    
    const [selectedText, setSelectedText] = useState('');
    const [selectedAmount, setSelectedAmount] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    // useEffect(() => {
    //   const transactionId = transaction._id;
    //   const selectedTransaction = transactions.find(transaction => transaction._id === transactionId);
    //   console.log(selectedTransaction)
    // }, [transactions])
  
    const onSubmit = e => {
      e.preventDefault();
  
      const newTransaction = {
        selectedText,
        selectedAmount: +selectedAmount,
        selectedDate
      }
  
      updateTransaction( newTransaction);   

      setSelectedText('');
      setSelectedDate('');
    }
  
    return (
      <>
        <h3>Update transaction</h3>
        <form onSubmit={onSubmit}>
        <div className="form-control">
            <label htmlFor="text">Text</label>
            <input type="text" value={selectedText} onChange={(e) => setSelectedText(e.target.value)} placeholder="Enter text..." />
          </div>
          <div className="form-control">
            <label htmlFor="amount"
              >Amount <br />
              (negative - expense, positive - income)</label>
            <input type="number" value={selectedAmount} onChange={(e) => setSelectedAmount(e.target.value)} placeholder="Enter amount..." />
          </div>
          <div className="form-control">
            <label htmlFor="date">Date</label>
            <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}  />
          </div>
          <button type='button' className="btn btn-dark">Save</button>
        </form>
      </>
    )
}

export default UpdateTransaction;