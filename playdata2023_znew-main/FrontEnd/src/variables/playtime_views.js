import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const PlaytimeViewsComponent = ({ data }) => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        if (data) {
            const labels = ['Short', 'Medium', 'Long'];

            const datasets = [
                {
                    data: [data.short, data.medium, data.long],
                    backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
                    borderColor: ['#36A2EB', '#FFCE56', '#FF6384'],
                    borderWidth: 1,
                },
            ];

            const newData = {
                labels: labels,
                datasets: datasets,
            };
            setChartData(newData);
        } else {
            setChartData(null);
        }
    }, [data]);

    if (!chartData) {
        // 데이터 로딩 중 처리
        return <div>Loading...</div>;
    }

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 100000, // y 축 단위 간격 설정 (조회수가 매우 높다면 조정 필요)
                },
            },
        },
        plugins: {
            legend: {
                display: false, // Hide the legend
            },
        },
    };

    return (
        <div>
            <h3>길이별 조회수 분석</h3>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default PlaytimeViewsComponent;
