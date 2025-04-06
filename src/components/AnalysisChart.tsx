// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
'use client'

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Colors,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Colors
  );
  
export const defaultOptions = {
  responsive: true,
  interaction: {
      intersect: true,
      mode: 'nearest'
  },
  plugins: {
      legend: {
      position: 'top' as const,
      },
  },
  scales: {
      x: {
        display: false
      },
      x1: {
        offset: true,
        gridLines: {
            display: false
        }
      }
  },
};

export const doughnutOptions = {
  maintainAspectRatio: false,
  responsive: true,
  interaction: {
      intersect: true,
      mode: 'nearest'
  },
  plugins: {
      legend: {
      position: 'top' as const,
      },
  },
  scales: {
    x: {
        display: false, // Hides x-axis gridlines
        grid: {
            drawBorder: false,
            display: false
        }
    },
    y: {
        display: false, // Hides y-axis gridlines
        grid: {
            drawBorder: false,
            display: false
        }
    }
}
}
  
export const plugins = [{
  beforeInit: chart => {      
      const dataset = chart.config.data.datasets[0];
      chart.config.data.datasets = chart.config.data.labels.map((l, i) => ({
        label: l,
        data: [{ x: i + 1, y: dataset.data[i] }],
        categoryPercentage: 1
      }));
      chart.config.data.labels = [dataset.label];
  },
  beforeLayout: chart => chart.options.scales.x1.labels = chart.config.data.datasets.filter((ds, i) => !chart.getDatasetMeta(i).hidden).map(ds => ds.label)
}]

interface ChartProps {
    type: string;
    x_labels: string[];
    multiple_dataset: boolean;
    dataset: DatasetEntry[];
}

const AnalysisChart = ({ type, x_labels, multiple_dataset, dataset } : ChartProps) => {

    if (typeof multiple_dataset === 'string'){
        multiple_dataset = (multiple_dataset.toLowerCase() === "true"); 
        console.log("entered")
    }

    if (!type) {
        type = 'bar'
    }

    const reduceOpacityPlugin = {
        beforeLayout : (chart) => {
            const dataset = chart.config.data.datasets[0]
            chart.config.data.datasets[0].backgroundColor = dataset.backgroundColor.map((color) => {
              const rgba = parseRgbToRgba(color);
              if (rgba) {
                // Reduce the alpha value (opacity) by 50% (e.g., change 0.8 to 0.4)
                rgba[3] = Math.max(0, rgba[3] * 0.6); // You can adjust the factor (0.5) as needed
                return `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]})`;
              }
              return color;
            });
        }
      }
      
    function parseRgbToRgba(color: string) {
        const result = /^rgb\((\d+), (\d+), (\d+)\)$/.exec(color);
        if (result) {
            return [parseInt(result[1]), parseInt(result[2]), parseInt(result[3]), 1]; // default alpha = 1 (fully opaque)
        }
        return null;
    }

    const graphData = {
        labels: x_labels,
        datasets: dataset,
    }

    const ChartComponent = type === "line" ? Line : type === "doughnut" ? Doughnut : Bar;

    const chartPlugins = type === "bar" && !multiple_dataset ? plugins : type === 'doughnut' ? [reduceOpacityPlugin] : [];

    const chartOptions = type === "doughnut" ? doughnutOptions : defaultOptions
    
    return <ChartComponent data={graphData} options={chartOptions} plugins={chartPlugins} redraw={true} updateMode="resize"/>;
};

export default AnalysisChart;
