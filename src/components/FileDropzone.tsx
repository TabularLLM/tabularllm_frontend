'use client'

import React, { use, useCallback, useEffect, useState } from 'react'
import {useDropzone} from 'react-dropzone';
import { toast } from "sonner"
import axios from "axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { FiUpload } from "react-icons/fi";
import { error } from 'console';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors
);

export const options = {
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
  }
};

export const plugins = [{
  beforeInit: chart => {      
    let dataset = chart.config.data.datasets[0];
    chart.config.data.datasets = chart.config.data.labels.map((l, i) => ({
      label: l,
      data: [{ x: i + 1, y: dataset.data[i] }],
      // backgroundColor: dataset.backgroundColor[i],
      categoryPercentage: 1
    }));
    chart.config.data.labels = undefined;
  },
  beforeLayout: chart => chart.options.scales.x1.labels = chart.config.data.datasets.filter((ds, i) => !chart.getDatasetMeta(i).hidden).map(ds => ds.label)
}]

export default function FileDropzone() {
    const fakedata = {
      "count_of_records": 1000,
      "number_of_numerical_features": 5,
      "number_of_categorical_features": 13,
      "general_analysis": "The dataset contains 1000 records with 5 numerical and 13 categorical features related to credit risk assessment. The numerical features include 'Duration of Credit (month)', 'Credit Amount', 'Instalment per cent', 'Age (years)', and 'No of dependents'. The categorical features provide information about account balance, credit history, purpose of the loan, savings/stocks, employment length, sex & marital status, guarantors, duration in current address, most valuable asset, type of apartment, occupation, foreign worker and creditability.",
      "averages_per_numerical_feature": {
        "Duration of Credit (month)": 20.903,
        "Credit Amount": 120.258,
        "Instalment per cent": 2.973,
        "Age (years)": 35.546,
        "No of dependents": 1.155
      },
      "count_of_unique_fields_per_categorical_feature": {
        "Creditability": {
          "0": 300,
          "1": 700
        },
        "Account Balance": {
          "< 0 DM": 269,
          "0 < Balance < 200 DM": 269,
          "No Checking Account": 394,
          "> 200 DM": 63
        },
        "Payment Status of Previous Credit": {
          "Critical account": 293,
          "All Credits at this Bank Paid Back Duly": 49,
          "Delay in paying off in the past": 88,
          "Existing Credits Paid Back Duly till Now": 40,
          "No Credits Taken": 188
        },
        "Purpose": {
          "Furniture/Equipment": 181,
          "New car": 234,
          "Business": 97,
          "Radio/Television": 280,
          "Used car": 103,
          "Repairs": 22,
          "Domestic Appliances": 12,
          "Others": 12,
          "Retraining": 9,
          "Education": 59
        },
        "Value Savings/Stocks": {
          "< 100 DM": 603,
          "100 <= ... < 500 DM": 103,
          "500 <= ... < 1000 DM": 63,
          ">= 1000 DM": 48,
          "Unknown / No savings account": 181
        },
        "Length of current employment": {
          "< 1 year": 172,
          "1 <= ... < 4 years": 339,
          "4 <= ... < 7 years": 174,
          ">= 7 years": 253,
          "Unemployed": 62
        },
        "Sex & Marital Status": {
          "Female: Divorced/Separated/Married": 310,
          "Male: Single": 548,
          "Male: Married/Widowed": 92,
          "Male: Divorced/Separated": 50
        },
        "Guarantors": {
          "None": 907,
          "Co-applicant": 41,
          "Guarantor": 52
        },
        "Duration in Current Address": {
          "> 3 years": 629,
          "1 < ... <= 2 years": 139,
          "2 < ... <= 3 years": 156,
          "<= 1 year": 76
        },
        "Most Valuable Asset": {
          "Savings agreement/Life insurance": 232,
          "Real estate": 332,
          "Car or other": 282,
          "Unknown / No property": 154
        },
        "Type of Apartment ": {
          "Rent": 179,
          "Own": 713,
          "For free": 108
        },
        "Occupation": {
          "Skilled Employee/Official": 630,
          "Unskilled - Resident": 200,
          "Management/Self-employed/Highly Qualified Employee/Officer": 148,
          "Unemployed/Unskilled - Non-resident": 22
        },
        "Foreign Worker": {
          "Yes": 963,
          "No": 37
        }
      }
    }
    const [responseData, setResponseData] = useState(fakedata)
    const [check, setCheck] = useState(false)
    const [data1, setData1] = useState({})

    // Handle file drop
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const formData = new FormData();

        // Append files to FormData
        acceptedFiles.forEach((file) => {
            formData.append("file", file);
        });

        // Send to API
        // Send FormData to API with Axios
        // axios.post("https://tabularllm-backend.onrender.com/upload-csv/", formData, {
        //     headers: {
        //         "Content-Type": "multipart/form-data",
        //     },
        // })
        // .then((response) => {
        //     console.log("File uploaded successfully:", response.data);
        //     setResponseData(response.data.summary)
        // })
        // .catch((error) => {
        //     console.error("Error uploading file:", error);
        // });
        toast.promise(axios.post("https://tabularllm-backend.onrender.com/upload-csv/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            }), {
            loading: 'Loading...',
            success: (data) => {
                console.log("File uploaded successfully:", data.data);
                setResponseData(data.data)
                return 'File has been analyzed'
            },
            error: (error) => {
                console.error("Error uploading file:", error);
            }
        });
        
    }, []);

    useEffect(() => {
      if (responseData) {
        const average = []

        for (const [feature, value] of Object.entries(responseData.averages_per_numerical_feature)) {
          // console.log([feature, value])
          average.push({label: feature, value: value})
        }

        setData1({
          labels: average.map((item) => item.label),
          datasets: [{
            data: average.map((item) => item.value),
          }],
        })  
        setCheck(true)
      }
    }, [responseData])
    

    const {getRootProps, getInputProps} = useDropzone({onDrop, accept: { 'text/csv': ['.csv'] }});
    
    return (
      <div>
      {!check ?
      <section className="bg-[#D9D9D9]/10 rounded border-2 border-dotted border-[#BEBEBE] w-[500px] h-[300px] cursor-pointer">
        <div {...getRootProps({className: 'dropzone'})} className='h-full w-full flex flex-col items-center justify-center text-[16px] text-[#BEBEBE] space-y-8'>
          <input {...getInputProps()} />
          <div className='flex flex-col items-center justify-center space-y-2'>
            <FiUpload size={50}/>
            <p className='text-[16px] text-[#BEBEBE]'>Drag & Drop here</p>
            <p>or</p>
            <p className='font-bold text-[#767676]'>Browse files</p>
          </div>
          <p className='text-xs'>Support: .xlxs or .csv</p>
        </div> 
      </section> :
      <section className='space-y-5'>
        <Card className='w-[800px]'>
          <CardHeader>
            <CardTitle className='font-bold'>Dataset Overview</CardTitle>
          </CardHeader>
          <CardContent className='flex items-center justify-between'>
            <div className='flex flex-col'>
              <p className='font-medium '>Record Count</p>
              <p className='text-sm text-[#5E5E5E]'>{responseData.count_of_records}</p>
            </div>
            <div className='flex flex-col'>
              <p className='font-medium'>Number of Numerical Features</p>
              <p className='text-sm text-[#5E5E5E]'>{responseData.number_of_numerical_features}</p>
            </div>
            <div className='flex flex-col'>
              <p className='font-medium'>Number of Categorical Features</p>
              <p className='text-sm text-[#5E5E5E]'>{responseData.number_of_categorical_features}</p>
            </div>
          </CardContent>
        </Card>
        <Card className='w-[800px]'>
          <CardHeader>
            <CardTitle className='font-bold'>Averages per Numerical Feature</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar options={options} data={data1} plugins={plugins}/>
          </CardContent>
        </Card>
      </section>
      }
      </div>
    );
}
