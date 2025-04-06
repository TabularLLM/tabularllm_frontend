import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button';

import { FaDatabase } from "react-icons/fa6";
import { MdOutlineFormatListNumbered } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";
import { MdDataUsage } from "react-icons/md";

import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation';
import AnalysisChart from '@/components/AnalysisChart';
import DataTable from '@/components/DataTable';
import Chat from '@/components/Chat';



async function page({ params, }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const pageData = await prisma.analysis_insights.findUnique(
    {
        where: {
            id: parseInt(id)
        },
        include: {
          chat_messages: {
            select: {
              message: true,
              type: true
            },
            orderBy: {
              id: 'desc',
            },
          }
        }
    }
  )

  if (!pageData){
    redirect('/upload')
  }

  console.log(pageData)
  const { file_analysis } = pageData
  const parsed_file_analysis: FileAnalysis = JSON.parse(file_analysis)
  const averages_per_numerical_feature_label = Object.keys(parsed_file_analysis.averages_per_numerical_feature)
  const averages_per_numerical_feature_dataset = [{
    label: 'Average',
    data: Object.values(parsed_file_analysis.averages_per_numerical_feature)
  }]

  return (
    <div className='w-full h-full'>
        <Tabs defaultValue="overview" className='space-y-6 h-full flex flex-col'>     
            <section className='flex flex-col px-7 pb-3 space-y-2'>
                <h1 className='font-semibold text-2xl'>{pageData.insight_name} <span className='text-xs font-normal'>{`[${pageData.created_at}]`}</span></h1>
                <h2 className='text-sm text-[#5E5E5E]'>ID: {pageData.file_id}</h2>
            </section>
            <TabsContent value="overview" className='px-7'>
                <div className='flex items-center space-x-10'>
                    <Card className='w-[250px] flex p-4 items-center space-x-5 rounded-lg'>
                        <div>
                            <FaDatabase size={32}/>
                        </div>
                        <div>
                            <p className='text-xs text-[#5E5E5E]'>Count of Records</p>
                            <p className='text-xl font-semibold'>{parsed_file_analysis.count_of_records}</p>
                        </div>
                    </Card>
                    <Card className='w-[250px] flex p-4 items-center space-x-5 rounded-lg'>
                        <div>
                            <MdOutlineFormatListNumbered size={40}/>
                        </div>
                        <div>
                            <p className='text-xs text-[#5E5E5E]'>Numerical features</p>
                            <p className='text-xl font-semibold'>{parsed_file_analysis.number_of_numerical_features}</p>
                        </div>
                    </Card>
                    <Card className='w-[250px] flex p-4 items-center space-x-5 rounded-lg'>
                        <div>
                            <BiSolidCategory size={40}/>
                        </div>
                        <div>
                            <p className='text-xs text-[#5E5E5E]'>Categorical features</p>
                            <p className='text-xl font-semibold'>{parsed_file_analysis.number_of_categorical_features}</p>
                        </div>
                    </Card>
                </div>
            </TabsContent>
            <TabsContent value="insight" className='px-7'>
                <div className='flex items-center space-x-10'>
                    {Object.entries(parsed_file_analysis.data_analyst.single_data_output[0]).map((item, index) => (
                      <Card key={index} className='min-w-[250px] flex p-4 items-center space-x-5 rounded-lg'>
                          <div>
                            <MdDataUsage size={40}/>
                          </div>
                          <div>
                              <p className='text-xs text-[#5E5E5E]'>{item[0]}</p>
                              <p className='text-[1rem] leading-[1.75rem] font-semibold'>{item[1]}</p>
                          </div>
                      </Card>  
                    ))}
                </div>
            </TabsContent>
            <TabsList className='px-7 pt-3 space-x-10 text-sm justify-start'>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="border border-[#BEBEBE] bg-[#F8F9F7] text-[#767676] font-bold text-sm hover:text-white" size={'sm'}>
                    General Analysis
                  </Button>
                </DialogTrigger>
                <DialogContent className='min-w-[800px]'>
                  <DialogHeader>
                    <DialogTitle>General Analysis Description</DialogTitle>
                  </DialogHeader>
                  <div className='text-[#5E5E5E]'>
                    {parsed_file_analysis.general_analysis}
                  </div>
                </DialogContent>
              </Dialog>
              <TabsTrigger value="overview">Data Overview</TabsTrigger>
              <TabsTrigger value="insight">Analysis Insight</TabsTrigger>
              <TabsTrigger value="chat">Chat</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className='w-full px-7 pb-2 pt-5 bg-[#D9D9D9]/30 h-full'>
              <div className='flex flex-1 items-center space-x-5'>
                <Card className='w-[50%] shadow-none h-[370px]'>
                  <CardHeader>
                    <CardTitle className='font-bold'>Averages per Numerical Feature</CardTitle>
                  </CardHeader>
                  <CardContent className='pb-2'>
                    <AnalysisChart type={'bar'} x_labels={averages_per_numerical_feature_label} multiple_dataset={false} dataset={averages_per_numerical_feature_dataset}/>
                  </CardContent>
                </Card>
                <DataTable data={parsed_file_analysis.count_of_unique_fields_per_categorical_feature}/>  
              </div> 
            </TabsContent>
            <TabsContent value="insight" className='w-full px-7 pb-2 pt-5 bg-[#D9D9D9]/30 h-full overflow-x-auto'>
              <div className='flex flex-1 items-center space-x-5'>
                {parsed_file_analysis.data_analyst.graph_data_output.map((graph, index) => (
                  <Card key={index} className={`${graph.Graph_type === "doughnut" ? 'w-[310px]' : 'w-[650px]'} shadow-none h-[370px]`}>
                    <CardHeader>
                      <CardTitle className='font-bold'>{graph.title}</CardTitle>
                    </CardHeader>
                    <CardContent className={`pb-2 w-full ${graph.Graph_type === "doughnut" ? 'h-[250px]': ''}`}>
                      <AnalysisChart type={graph.Graph_type} x_labels={graph.x_labels} multiple_dataset={graph.multiple_dataset} dataset={graph.dataset}/>
                    </CardContent>
                  </Card> 
                ))}
              </div>
            </TabsContent>
            <TabsContent value="chat" className='w-full px-7 pb-2 pt-5 bg-[#D9D9D9]/30 h-full'>
              <div className='flex justify-center'>
                <Chat chat={pageData.chat_messages} insight_id={parseInt(id)}/>  
              </div>
            </TabsContent>
        </Tabs>
    </div>
  )
}

export default page