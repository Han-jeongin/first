import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';

const ChartComponent = ({ data, category }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (data) {
      const newData = {
        labels: ['긍정', '부정', '모호'],
        datasets: [
          {
            data: [data.positive, data.negative, data.ambiguous],
            backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
            hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
          },
        ],
      };
      setChartData(newData);
    }
  }, [data]);

  if (!chartData) {
    // 데이터 로딩 중 처리
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{category}</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default ChartComponent;
