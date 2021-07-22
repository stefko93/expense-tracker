/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
import React from 'react';
import { PieChart, Pie, Cell, Legend, Label, ResponsiveContainer  } from 'recharts';

const data = [
    { name: 'salary', value: 100 },
    { name: 'investments', value: 300 },
    { name: 'deposit', value: 100 },
    { name: 'rental income', value: 80 },
    { name: 'saving', value: 40 },
    { name: 'gift', value: 30 },
    { name: 'extra income', value: 50 },
    { name: 'other', value: 100 }
  ];

const colors = ['#b50d12', '#bf2f1f', '#c9452c', '#d3583a', '#dc6a48', '#e57c58', '#ee8d68', '#f79d79']; 

const IncomesChart = () => {
  return (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart className='pieChart' width={400} height={400}>
            <Legend verticalAlign="top"  />
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              fill="#8884d8"
              label={(data) => data.name} 
            >
              {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
              <Label value="Incomes" position="center" />
              
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      );
}

export default IncomesChart;