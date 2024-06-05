import React from "react";
// import { Heading } from "@/components/common/heading";
// import { useRouter } from "react";
// import { useHistory } from 'react-router-dom'; // version 5.2.0
// import { useNavigation } from '@react-navigation/native';

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
// import { DataTable } from "../data-table";
import DataTable from '../data-table';

import { columns } from "./columns";


export const EmployeeClient = ({ data }) => {
  // const history = useNavigation();

  return (
    <>
      <div className="flex items-center justify-between">
        {/* <Heading
          title="Employee (CRUD)"
          description="Manage employee for you business"
        /> */}
        <h1 className="font-bold text-3xl">Teacher Deatils</h1>
        {/* <h3>Manage employee for you business</h3> */}
        <Button
          onClick={() => {
            // history.push("/teacher/new");
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <div>
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
};
