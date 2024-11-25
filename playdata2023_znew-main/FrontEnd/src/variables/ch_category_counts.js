import React from 'react';
import { Pie } from 'react-chartjs-2';

const ChannelCategoryCountsPieChart = ({ data, idx }) => {
    // 채널 데이터 추출
    const ChannelData = data.channels[parseInt(idx)];

    // 채널명
    const channelName = ChannelData.channel

    // 카테고리명과 document_count 데이터 추출
    const categoryLabels = ChannelData.categories.map((category) => category.category);
    const documentCounts = ChannelData.categories.map((category) => category.document_count);

    // 파이 차트에 필요한 데이터 형식으로 가공
    const chartData = {
        labels: categoryLabels,
        datasets: [
            {
                data: documentCounts,
                backgroundColor: [
                    '#ff6384',
                    '#36a2eb',
                    '#ffce56',
                    '#cc65fe',
                    '#4bc0c0',
                    '#c9cbcf',
                    '#ffab7a',
                ],
            },
        ],
    };

    return (
        <div>
            <h5>{channelName} </h5>
            <Pie data={chartData} />
        </div>
    );
};

export default ChannelCategoryCountsPieChart;
