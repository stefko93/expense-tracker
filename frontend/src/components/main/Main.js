import React from 'react';

import SideBar from '../utils/SideBar';
import Balance from './Balance';
import IncomeExpenses from './IncomeExpenses';
import AddTransaction from './AddTransaction';


export default function Main() {
  return (
    <div className="row">
      <SideBar />
      <div className='col-md-9 ms-sm-auto col-lg-10 px-md-4'>
        <Balance />
        <IncomeExpenses />
        <AddTransaction />
      </div>
    </div>
  );
}
