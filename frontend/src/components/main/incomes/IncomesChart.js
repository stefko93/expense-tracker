/* eslint-disable no-plusplus */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
import React, {useEffect, useContext}  from 'react';
import { PieChart, Pie, Cell, Legend, Label, ResponsiveContainer  } from 'recharts';

import { incomeCategories, resetCategories } from './IncomeList';

import { GlobalContext } from '../../../context/GlobalState';

// const data = [
//     { name: 'salary', value: 100 },
//     { name: 'investments', value: 300 },
//     { name: 'deposit', value: 100 },
//     { name: 'rental income', value: 80 },
//     { name: 'saving', value: 40 },
//     { name: 'gift', value: 30 },
//     { name: 'extra income', value: 50 },
//     { name: 'other', value: 100 }
//   ];

// const colors = ['#b50d12', '#bf2f1f', '#c9452c', '#d3583a', '#dc6a48', '#e57c58', '#ee8d68', '#f79d79']; 

const IncomesChart = () => {
  resetCategories();
  const { transactions, getTransactions } = useContext(GlobalContext);

  useEffect(() => {
      getTransactions();
  }, [])

  const incomeType = item => item.type === "Income"
  const incomeListType = transactions.filter(incomeType);

  incomeListType.forEach((t) => {
    const incomeList = incomeCategories.find((c) => c.type === t.category )
    
    if(incomeList){
      incomeList.amount += t.amount
    }
  })
  
  const filteredCategory = incomeCategories.filter((sc) => sc.amount > 0)

  const name = filteredCategory.map((c) => {return c.type})
  const value = filteredCategory.map((c) => {return c.amount})
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
              <Label value="Incomes" position="center" />
              
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      );
}

export default IncomesChart;