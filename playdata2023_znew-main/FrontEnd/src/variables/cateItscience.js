import { useEffect, useState } from 'react';
import axios from 'axios';

const cateItscience = (datasetIndex) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://3.37.47.118:8000/znew/category_ranking/?ct=IT과학');
        const data = response.data;

        if (Array.isArray(data) && data.length > 0) {
          const timestampKeys = Object.keys(data[0]);
          const chartLabels = timestampKeys.map((key) => key).reverse();

          const colorPalette = [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)'
          ];

          const borderColorPalette = [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ];

          const datasets = data.map((entry, i) => {
            const timestampKeys = Object.keys(entry);
            const total_score = timestampKeys.map((timestamp) => {
              const videos = entry[timestamp];
              return videos.length > 0 ? videos[datasetIndex].total_score : 0;
            });

            return {
              label: datasetIndex,
              data: total_score.reverse(),
              fill: false,
              backgroundColor: colorPalette[datasetIndex],
              borderColor: borderColorPalette[datasetIndex],
              borderWidth: 2,
            };
          });

          const selectedDataset = datasets[datasetIndex >= 0 && datasetIndex < datasets.length ? datasetIndex : 0];

          setChartData({ labels: chartLabels, datasets: [selectedDataset] });
        } else {
          console.error('데이터 형식이 잘못되었습니다.');
        }
      } catch (error) {
        console.error('데이터를 불러오는 데 실패했습니다:', error);
      }
    };

    fetchData();
  }, [datasetIndex]);

  return chartData;
};

export default cateItscience;
