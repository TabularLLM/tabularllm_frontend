import React from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface DataTableProps {
    data: Record<string, Record<string, number>>;
}

const DataTable = ({ data } : DataTableProps) => {
  return (
    <Card className="w-[50%] h-[370px] shadow-none">
        <ScrollArea className="h-[370px] pb-2 rounded-xl" >
            <CardHeader>
                <CardTitle>Categorical Feature Data</CardTitle>
            </CardHeader>
            <CardContent>
                <table className="w-full border-collapse border border-gray-200 text-gray-700 text-sm">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="border border-gray-300 p-2">Feature</th>
                            <th className="border border-gray-300 p-2">Category</th>
                            <th className="border border-gray-300 p-2">Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(data).map(([feature, categories]) => (
                            Object.entries(categories).map(([category, count], index) => (
                            <tr key={`${feature}-${category}`} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                <td className="border border-gray-200 p-2 font-medium text-black text-xs">{index === 0 ? feature : ""}</td>
                                <td className="border border-gray-200 p-2 text-xs">{category}</td>
                                <td className="border border-gray-200 p-2 text-xs">{count}</td>
                            </tr>
                            ))
                        ))}
                    </tbody>
                </table>    
            </CardContent>    
        </ScrollArea>
    </Card>
  );
};

export default DataTable;
