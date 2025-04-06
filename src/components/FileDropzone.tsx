'use client'

import React, { useCallback, useState } from 'react'
import {useDropzone} from 'react-dropzone';
import { toast } from "sonner"
import axios from "axios";
import { useRouter } from 'next/navigation'

import { FiUpload } from "react-icons/fi";
import { timeout } from '@/lib/utils';

export default function FileDropzone() {
    const [processing, setProcessing] = useState<boolean>(false)
    const router = useRouter()
    // Handle file drop
    const onDrop = useCallback((acceptedFiles: File[]) => {
        setProcessing(!processing)

        const formData = new FormData();

        // Append files to FormData
        acceptedFiles.forEach((file) => {
            formData.append("file", file);
        });
        toast.promise(axios.post("https://tabularllm-api-hyf9apbmf0dxc4ef.canadacentral-01.azurewebsites.net/upload-csv/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            }), {
            loading: 'Loading...',
            success: async (data) => {
                console.log("File uploaded successfully:", data.data);
                router.refresh()
                await timeout(1000)
                router.push(`/analysis_insight/${data.data.insight_id}`)
                return 'File has been analyzed'
            },
            error: (error) => {
                console.error("Error uploading file:", error);
                setProcessing(false)
                return 'Error proccessing file'
            }
        });
        
    }, [processing, router]);

    const {getRootProps, getInputProps} = useDropzone({onDrop, accept: { 'text/csv': ['.csv'] }});
    
    return (
      <div>
      <section className="bg-[#D9D9D9]/10 rounded border-2 border-dotted border-[#BEBEBE] w-[500px] h-[300px] cursor-pointer">
        <div {...getRootProps({className: 'dropzone'})} className='h-full w-full flex flex-col items-center justify-center text-[16px] text-[#BEBEBE] space-y-8'>
          <input {...getInputProps()} disabled={processing}/>
          <div className='flex flex-col items-center justify-center space-y-2'>
            <FiUpload size={50}/>
            <p className='text-[16px] text-[#BEBEBE]'>Drag & Drop here</p>
            <p>or</p>
            <p className='font-bold text-[#767676]'>Browse files</p>
          </div>
          <p className='text-xs'>Support: .csv</p>
        </div> 
      </section>
      </div>
    );
}
