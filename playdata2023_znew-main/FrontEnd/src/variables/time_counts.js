import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

const VlcTotalLineChart = ({ data }) => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        if (data) {
            const timestamps = data.map((item) => item.timestamp);
            const viewsData = data.map((item) => item.total_views);
            const likesData = data.map((item) => item.total_likes);
            const commentsData = data.map((item) => item.total_comments);

            const reversedTimestamps = timestamps.slice().reverse();
            const reversedViewsData = viewsData.slice().reverse();
            const reversedLikesData = likesData.slice().reverse();
            const reversedCommentsData = commentsData.slice().reverse();

            setChartData({
                labels: reversedTimestamps,
                datasets: [
                    {
                        label: 'Views',
                        data: reversedViewsData,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        fill: false,
                    },
                    {
                        label: 'Likes',
                        data: reversedLikesData,
                        borderColor: 'rgba(192, 75, 192, 1)',
                        fill: false,
                    },
                    {
                        label: 'Comments',
                        data: reversedCommentsData,
                        borderColor: 'rgba(192, 192, 75, 1)',
                        fill: false,
                    },
                ],
            });
        }
    }, [data]);

    const options = {
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <div style={{ height: '500px' }}>
                {chartData ? <Line data={chartData} options={options} /> : <p>Loading...</p>}
            </div>
        </div>
    );
};

export default VlcTotalLineChart;
