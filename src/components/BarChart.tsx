import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {

    const data = {
        labels: ["4380", "4311", "4571", "4588", "4557", "4373"],
        productNames: ["GRAY-DARK-GRAY", "CANARY-YELLOW", "PINK-WHITE-GRAY", "SEAFOAM-WHITE-GRAY", "YELLOW-WHITE-GRAY", "WHITE-YELLOW"],
        datasets: [{
          data: [5996, 4605, 1288, 3463, 1537, 152],
          backgroundColor: ["rgba(1,1,235,1)", "rgba(12,87,184,1)", "rgba(85,107,126,1)", "rgba(181,150,65,1)", "rgba(132,66,28,1)", "rgba(49,195,217,1)"],
          borderColor: ["rgba(1,1,235,1)", "rgba(12,87,184,1)", "rgba(85,107,126,1)", "rgba(181,150,65,1)", "rgba(132,66,28,1)", "rgba(49,195,217,1)"]
        }]
      };

    const options = {
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              let i = tooltipItem.index;
              return data.productNames[i] + ': ' + data.datasets[0].data[i];
            }
          }
        }
      }

    return <Bar data={data} options={options} />;
};

export default BarChart;
