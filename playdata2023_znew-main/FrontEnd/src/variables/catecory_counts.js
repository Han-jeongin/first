import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';

const CategoryCountsPieChart = ({ data }) => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        if (data) {
            const labels = data.map((item) => item.category);
            const counts = data.map((item) => item.document_count);

            const newData = {
                labels: labels,
                datasets: [
                    {
                        data: counts,
                        backgroundColor: ['#82ccdd', '#81ecec', '#74b9ff', '#a29bfe', '#ffeaa7', '#fab1a0', '#e17055'],
                        hoverBackgroundColor: ['#82ccdd', '#81ecec', '#74b9ff', '#a29bfe', '#ffeaa7', '#fab1a0', '#e17055']
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
            <h3>카테고리별 영상 수</h3>
            <Pie data={chartData} />
        </div>
    );
};

export default CategoryCountsPieChart;
