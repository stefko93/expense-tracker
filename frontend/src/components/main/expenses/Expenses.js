import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
// import { Doughnut } from 'react-chartjs-2';

// let labels = ['household', 'travel', 'food & drink', 'personal items', 'services', 'pets', 'health', 'fun & relax', 'bills', 'other']
// let colorHex = [
//     'rgba(255, 99, 132, 0.2)',
//     'rgba(54, 162, 235, 0.2)',
//     'rgba(255, 206, 86, 0.2)',
//     'rgba(75, 192, 192, 0.2)',
//     'rgba(153, 102, 255, 0.2)',
//     'rgba(255, 159, 64, 0.2)',
//     'rgba(255, 99, 132, 0.2)',
//     'rgba(54, 162, 235, 0.2)',
//     'rgba(255, 206, 86, 0.2)',
//     'rgba(75, 192, 192, 0.2)'
// ]

// const data = {
//   datasets: [{
//     label: 'Expenses',
//     data: [10, 12, 15, 17, 20, 25, 5, 10, 50, 20],
//     backgroundColor: colorHex,
//     borderWidth: 1,
//     hoverOffset: 4
//   }],
//   labels: labels
// }

// const options = {
//     responsive: true,
//     legend: {
//       position: 'bottom'
//     },
//     plugins: {
//         datalabels: {
//           color: '#fff',
//           anchor: 'end',
//           align: 'start',
//           offset: -10,
//           borderWidth: 2,
//           borderColor: '#fff',
//           borderRadius: 25,
//           backgroundColor: (context) => {
//             return context.dataset.backgroundColor;
//           },
//           font: {
//             weight: 'bold',
//             size: '10'
//           },
//           formatter: (value) => {
//             return value + ' %';
//           }
//         }
//       }
//   }


const data01 = [
    { name: 'household', value: 100 },
    { name: 'travel', value: 300 },
    { name: 'food & drink', value: 100 },
    { name: 'personal items', value: 80 },
    { name: 'pets', value: 40 },
    { name: 'services', value: 30 },
    { name: 'health', value: 50 },
    { name: 'fun & relax', value: 100 },
  ];
  const data02 = [
    { name: 'household', value: 100 },
    { name: 'travel', value: 300 },
    { name: 'food & drink', value: 100 },
    { name: 'personal items', value: 80 },
    { name: 'pets', value: 40 },
    { name: 'services', value: 30 },
    { name: 'health', value: 50 },
    { name: 'fun & relax', value: 100 }
  ];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const renderCustomizedLabel2 = ({cx, cy, x, y, name}) => {
    return (
      <text x={x} y={y} fill="black" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
        {name}
      </text>
    );
  };
  

const Expenses = () => {
    return (
        
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="chartjs-size-monitor">
                <div className="chartjs-size-monitor-expand"><div className=""></div></div><div className="chartjs-size-monitor-shrink"><div className=""></div></div>
            </div>

            <div className="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h3>Expenses</h3>
            </div>
            {/* react-chartjs-2
            <div classNameName="chart-wrapper">
                <Doughnut data={data} options={options} />
            </div> */}
            <div className="container-chart">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart width={700} height={700}>
                        <Pie 
                            data={data01} 
                            dataKey="value" 
                            cx="50%" 
                            cy="50%" 
                            labelLine={false}
                            label={renderCustomizedLabel} 
                            outerRadius={60} 
                            fill="#8884d8" 
                            > 
                            {data01.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
                        </Pie>

                        <Pie 
                            data={data02} 
                            // dataKey="value" 
                            cx="50%" 
                            cy="50%" 
                            innerRadius={70} 
                            outerRadius={90} 
                            fill="#82ca9d" 
                            label={renderCustomizedLabel2}
                            nameKey="name"
                            >
                            {data02.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
                        </Pie>
                    </PieChart>
                </ ResponsiveContainer>
            </div>
        </main>
    )
}

export default Expenses;