import React from "react";


import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from 'react-router-dom';
import DataTable from '../data-table';

import { columns } from "./columns";


export const EmployeeClient = ({ data }) => {
  const navigate = useNavigate();

  return (
   
    <>
      <div className="flex items-center justify-between mb-2">
    
        <h1 className="font-bold  text-3xl">Teacher Deatils</h1>
        
        <Button
         onClick={() => navigate('/teacher-form/create')}
              
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <div>
        <DataTable columns={columns} data={data} tableType={'teacher'} />
      </div>
    </>
  );
};
