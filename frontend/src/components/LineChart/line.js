import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import generalFetch from '../../utilities/generalFetch';

function LineChart() {
  // const [labelData, setLabelData] = useState('');
  // const [xpData, setXpData] = useState('');

  const getDuration = (starting, closing) => {
    const startingTime = starting.slice(0, 10);
    const startingDate = new Date(startingTime);
    const closingTime = closing.slice(0, 10);
    const closingDate = new Date(closingTime);
    const differenceInTime = closingDate.getTime() - startingDate.getTime();
    const duration = differenceInTime / (1000 * 3600 * 24) + 1;
    return duration;
  };

  useEffect(() => {
    const getLabelData = async () => {
      try {
        const response = await generalFetch('challenge', 'GET');
        if (response.status === 200) {
          const { startingDate } = response.response.results[0];
          const { closingDate } = response.response.results[0];
          console.log(response.response.results[0]);
          const duration = getDuration(startingDate, closingDate);
          console.log(duration);
          const labelArray = [];
          for (let i = 0; i <= duration; i + 1) {
            labelArray.push(i);
          }
          console.log(labelArray);
        }
      } catch (err) {
        console.log('something went wrong');
      }
    };
    getLabelData();
  }, []);

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Dataset of Months',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  };

  return (
    <div>
      <h2>Line Chart</h2>
      <Line data={data} />
    </div>
  );
}
export default LineChart;
