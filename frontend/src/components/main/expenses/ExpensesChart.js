/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
import React, {useEffect, useContext} from 'react';
import { PieChart, Pie, Cell, Legend, Label, ResponsiveContainer  } from 'recharts';

import { expenseCategories, resetCategories } from './ExpenseList';

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
  resetCategories();
  const { transactions, getTransactions } = useContext(GlobalContext);

  useEffect(() => {
      getTransactions();
  }, [])

  const expenseType = item => item.type === "Expense"
  const expenseListType = transactions.filter(expenseType);

  expenseListType.forEach((t) => {
    const expenseList = expenseCategories.find((c) => c.type === t.category )
    
    if(expenseList){
      expenseList.amount -= t.amount
    }
  })

  const filteredCategory = expenseCategories.filter((sc) => sc.amount > 0)

  const name = filteredCategory.map((c) => {return c.type})
  const value = filteredCategory.map((c) => {return Math.abs(c.amount)})
  const color = filteredCategory.map((c) => {return c.color})

  const result = [];
  for (let i = 0; i < name.length; i++) {
    result[i] = {name: name[i], value: value[i]};
  }

  return (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart className='pieChart' width={400} height={400}>
            <Legend verticalAlign="top"  />
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={result}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              fill="#8884d8"
              label={(result) => result.name} 
            >
              {result.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={color[index % color.length]} />
            ))}
              <Label value="Expenses" position="center" />
              
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      );
}

export default ExpensesChart;