/* eslint-disable react/no-array-index-key */
/* eslint-disable array-callback-return */
import React, { useContext, useEffect } from 'react'

import AuthNavBar from '../../navbars/AuthNavBar';
import SideBar from '../../utils/SideBar';
import IncomesChart from './IncomesChart';
import numberWithCommas from '../../utils/Format';
import formatDate from '../../utils/FormatDate';


import { GlobalContext } from '../../../context/GlobalState';

const Incomes = () => {
  const { transactions, getTransactions  } = useContext(GlobalContext);

  useEffect(() => {
      getTransactions();
  }, [])

    const incomeType = item => item.type === "Income"
    const incomeList = transactions.filter(incomeType);

    return (
        <>
        <AuthNavBar />
        <div className='container-fluid'>
            <div className="row">
            <SideBar />

    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
        <div className="chartjs-size-monitor"><div className="chartjs-size-monitor-expand"><div className="" /></div><div className="chartjs-size-monitor-shrink"><div className="" /></div></div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Incomes</h1>
      </div>

      <div className="my-4 w-100 chartjs-render-monitor" id="myChart" width="1550" height="653" style={{display: 'flex', height: '523px', width: '1240px'}}>
        <IncomesChart />
      </div>
        
      <h2>Details</h2>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>Detail</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
          { transactions && incomeList.map((income, id) => {
            return (<tr key={id}>
                  <td>{income.detail}</td>
                  <td>{income.type}</td>
                  <td>{numberWithCommas(Math.abs(income.amount))}Ft</td>
                  <td>{formatDate(income.date)}</td>
              </tr>)
            }) 
          }
        
          </tbody>
        </table>
      </div>
    </main>
  </div>
        </div>
        </>
    )
}

export default Incomes;