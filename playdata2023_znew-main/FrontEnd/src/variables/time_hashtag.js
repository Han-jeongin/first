import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

const HashtagTrendLineChart = ({ data }) => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        if (data) {
            const timestamps = data.map((item) => item.timestamp);
            const reversedTimestamps = timestamps.slice().reverse();
            const hashtags = data.map((item) => item.hashtag);

            const allHashtags = [...new Set(hashtags)];

            const datasets = allHashtags.map((hashtag) => {
                const hashtagCounts = reversedTimestamps.map((timestamp) => {
                    const dataPoint = data.find((item) => item.timestamp === timestamp && item.hashtag === hashtag);
                    return dataPoint ? dataPoint.count : 0;
                });
                return {
                    label: hashtag,
                    data: hashtagCounts,
                    borderColor: getRandomColor(),
                    fill: false,
                };
            });

            setChartData({
                labels: reversedTimestamps,
                datasets: datasets,
            });
        }
    }, [data]);

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

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
        <div style={{ height: '800px' }}>
            {chartData ? <Line data={chartData} options={options} /> : <p>Loading...</p>}
        </div>
    );
};

export default HashtagTrendLineChart;