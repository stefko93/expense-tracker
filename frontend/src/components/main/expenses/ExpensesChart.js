/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
import React, {useEffect, useContext} from 'react';
import { PieChart, Pie, Cell, Legend, Label, ResponsiveContainer  } from 'recharts';

import { GlobalContext } from '../../../context/GlobalState';

// const data = [
//     { name: 'household', value: 100 },
//     { name: 'travel', value: 300 },
//     { name: 'food & drink', value: 100 },
//     { name: 'personal items', value: 80 },
//     { name: 'pets', value: 40 },
//     { name: 'services', value: 30 },
//     { name: 'health', value: 50 },
//     { name: 'fun & relax', value: 100 }
//   ];

// const colors = ['#b50d12', '#bf2f1f', '#c9452c', '#d3583a', '#dc6a48', '#e57c58', '#ee8d68', '#f79d79']; 

const ExpensesChart = () => {
  const { transactions, getTransactions, expenses, getExpenses } = useContext(GlobalContext);

  useEffect(() => {
      getTransactions();
      getExpenses();
  }, [])

  const colorList = expenses.map(expense => expense.color);
  console.log(colorList);

  const expenseType = item => item.type === "Expense"
  const expenseList = transactions.filter(expenseType);

  const colors = ['#b50d12', '#bf2f1f', '#c9452c'];
  const chartName = expenseList.map(expense => expense.category)
  const chartValue = expenseList.map(expense => Math.abs(expense.amount));

  console.log(chartName);
  console.log(chartValue);


    // const  = expenseList.category;
    // const 
    // const colors = 

  return (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart className='pieChart' width={400} height={400}>
            <Legend verticalAlign="top"  />
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={chartValue}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              fill="#8884d8"
              label={chartName} 
            >
              {chartName.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
              <Label value="Expenses" position="center" />
              
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      );
}

export default ExpensesChart;