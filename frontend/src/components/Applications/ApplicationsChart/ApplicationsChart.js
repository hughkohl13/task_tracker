import React from 'react';
import { Bar as BarChart } from 'react-chartjs';

const APPLICATIONS_BUCKETS = {
  Cheap: {
    min: 0,
    max: 100
  },
  Normal: {
    min: 100,
    max: 200
  },
  Expensive: {
    min: 200,
    max: 10000000
  }
};

const applicationsChart = props => {
  const chartData = { labels: [], datasets: [] };
  let values = [];
  for (const bucket in APPLICATIONS_BUCKETS) {
    const filteredApplicationsCount = props.applications.reduce((prev, current) => {
      if (
        current.job.role > APPLICATIONS_BUCKETS[bucket].min &&
        current.job.role < APPLICATIONS_BUCKETS[bucket].max
      ) {
        return prev + 1;
      } else {
        return prev;
      }
    }, 0);
    values.push(filteredApplicationsCount);
    chartData.labels.push(bucket);
    chartData.datasets.push({
      // label: "My First dataset",
      fillColor: 'rgba(220,220,220,0.5)',
      strokeColor: 'rgba(220,220,220,0.8)',
      highlightFill: 'rgba(220,220,220,0.75)',
      highlightStroke: 'rgba(220,220,220,1)',
      data: values
    });
    values = [...values];
    values[values.length - 1] = 0;
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <BarChart data={chartData} />
    </div>
  );
};

export default applicationsChart;