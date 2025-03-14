import FileDropzone from '@/components/FileDropzone';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react'

export default function Main() {
  return (
    <div className='flex flex-col items-center justify-center'>
        <div className="relative top-[100px] flex flex-col items-center justify-center space-y-7">
          {/* <h1 className="text-[32px] font-bold leading-tight text-center w-[400px]">
            Just Send the Table to LLM
          </h1>
          <div className="text-[14px] text-center text-[#5E5E5E] max-w-[264px]">
            <p>Add your Tabular data below to be analyzed by an LLM</p>
          </div> */}
          <div className="">
            <FileDropzone/>
          </div>
        </div>
    </div>
  );
}

