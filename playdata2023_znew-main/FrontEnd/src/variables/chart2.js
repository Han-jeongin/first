// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { Pie } from 'react-chartjs-2';

// // function PieChart() {
// //   const [data, setData] = useState([]);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const response = await axios.get(''); // Replace with your API URL.
// //         setData(response.data);
// //       } catch (error) {
// //         console.error('Error fetching data:', error);
// //       }
// //     };

// //     fetchData();
// //   }, []);

// //   return (
// //     <div>
// //       <h1>Pie Charts</h1>
// //       {data.length > 0 ? (
// //         data.map((item) => (
// //           <div key={item.id}>
// //             <h2>Chart ID: {item.id}</h2>
// //             <PieChartForId data={item} />
// //           </div>
// //         ))
// //       ) : (
// //         <p>Loading...</p>
// //       )}
// //     </div>
// //   );
// // }

// // function PieChartForId({ data }) {
// //   const categoryLabels = data.categories.map((category) => category.category);
// //   const documentCounts = data.categories.map((category) => category.document_count);

// //   const pieChartData = {
// //     labels: categoryLabels,
// //     datasets: [
// //       {
// //         data: documentCounts,
// //         backgroundColor: [
// //           'rgba(255, 99, 132, 0.5)',
// //           'rgba(54, 162, 235, 0.5)',
// //           // Add more colors as needed.
// //         ],
// //       },
// //     ],
// //   };

// //   return <Pie data={pieChartData} />;
// // }

// // export default PieChart;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Pie } from 'react-chartjs-2';

// function PieChart() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(''); // Replace with your API URL.
//         setData(response.data);
//         console.log(data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       {/* <h1>Pie Charts</h1> */}
//       {data.length > 0 ? (
//         data.map((item, index) => (
//           <div key={index}>
//             <h2>{item.channel}</h2>
//             <PieChartForId data={item} />
//           </div>
//         ))
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// }

// function PieChartForId({ data }) {
//   const categoryLabels = data.categories.map((category) => category.category);
//   const documentCounts = data.categories.map((category) => category.document_count);

//   const pieChartData = {
//     labels: categoryLabels,
//     datasets: [
//       {
//         data: documentCounts,
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.5)',
//           'rgba(54, 162, 235, 0.5)',
//           'rgba(255, 206, 86, 0.5)',
//           'rgba(75, 192, 192, 0.5)',
//           'rgba(153, 102, 255, 0.5)',
//           'rgba(255, 159, 64, 0.5)',
//           'rgba(168, 238, 114, 0.5)',
//           // Add more colors as needed.
//         ],
//       },
//     ],
//   };

//   return <Pie data={pieChartData} />;
// }

// export default PieChart;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Pie } from 'react-chartjs-2';

// function PieChart() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(''); // Replace with your API URL.
//         setData(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h1>Pie Charts</h1>
//       {data.length > 0 ? (
//         data.map((item) => (
//           <div key={item.id}>
//             <h2>Chart ID: {item.id}</h2>
//             <PieChartForId data={item} />
//           </div>
//         ))
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// }

// function PieChartForId({ data }) {
//   const categoryLabels = data.categories.map((category) => category.category);
//   const documentCounts = data.categories.map((category) => category.document_count);

//   const pieChartData = {
//     labels: categoryLabels,
//     datasets: [
//       {
//         data: documentCounts,
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.5)',
//           'rgba(54, 162, 235, 0.5)',
//           // Add more colors as needed.
//         ],
//       },
//     ],
//   };

//   return <Pie data={pieChartData} />;
// }

// export default PieChart;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';

function PieChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/'); // Replace with your API URL.
        setData(response.data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* <h1>Pie Charts</h1> */}
      {data.length > 0 ? (
        data.map((item, index) => (
          <div key={index}>
            <h2>{item.channel}</h2>
            <PieChartForId data={item} />
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

function PieChartForId({ data }) {
  const categoryLabels = data.categories.map((category) => category.category);
  const documentCounts = data.categories.map((category) => category.document_count);

  const pieChartData = {
    labels: categoryLabels,
    datasets: [
      {
        data: documentCounts,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(168, 238, 114, 0.5)',
          // Add more colors as needed.
        ],
      },
    ],
  };

  return <Pie data={pieChartData} />;
}

export default PieChart;
