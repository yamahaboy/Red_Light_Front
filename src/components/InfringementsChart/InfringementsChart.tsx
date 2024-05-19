import React, { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartData } from 'chart.js';
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getInfringementsDatesToStoreForGraph } from "../../store/reducers/infringementsReducer/actions";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type CountByHour = {
  [key: string]: number;
}

const InfringementsChart: React.FC = () => {
  const dispatch = useAppDispatch();
  const {dataForGraph} = useAppSelector((state) => state.infringementsReducer);

  const [chartData, setChartData] = useState<ChartData<'line'>>({
    labels: [],
    datasets: [{
      label: 'Number of Infringements',
      data: [],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 7,
      fill: true,
      tension: 0.4,
    }]
  });

  useEffect(() => {
    dispatch(getInfringementsDatesToStoreForGraph());
  }, [dispatch]);

  useEffect(() => {
    if (!dataForGraph || !Array.isArray(dataForGraph)) {
      console.error("Data is undefined or not an array:", dataForGraph);
      return;
    }

    const countByHour: CountByHour = dataForGraph.reduce((acc, item) => {
      const date = new Date(item.ts * 1000);
      const dayHour = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()} ${String(date.getHours()).padStart(2, '0')}:00`;
      acc[dayHour] = (acc[dayHour] || 0) + 1;
      return acc;
    }, {} as CountByHour);

    const chartLabels = Object.keys(countByHour);
    const chartValues = Object.values(countByHour);

    setChartData({
      labels: chartLabels,
      datasets: [{
        label: 'Number of Infringements',
        data: chartValues,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: true,
        tension: 0.4,
      }]
    });
  }, [dataForGraph]);

  return (
    <div style={{ width: '100%', height: '500px', display:"flex", justifyContent:"center" }}>
      <Line 
        data={chartData} 
        options={{ 
          plugins: { 
            legend: { display: true } 
          }, 
          scales: { 
            y: { beginAtZero: true } 
          } 
        }} 
      />
    </div>
  );
};

export default InfringementsChart;
