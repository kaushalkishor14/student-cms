
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import DataTable from '../components/data-table';
import { columns } from "../pages/users/columns";
import params from '../common/params';
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { checkingTokenExpiry, getCourseById, addNewBatch , getBatchById} from '../common/apiHandler';

import { buttonVariants } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";

async function getUsers(setData, id) {
  setData(await getBatchById(id));
}


export default function Subject() {
  const { name } = useParams();
  const [data, setData] = useState([]);
  const [batchs, setBatchs] = useState([]);
  const [newBatchs, setNewBatchs] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);

  const [newBatch, setBatch] = useState(
    {
      batchName: "",
      startDate: "",
      courseId: ""
    }
  );


  function handelInputChange(e) {
    const { name, value } = e.target;
    setBatch({
      ...newBatch,
      [name]: value
    });
  }


  async function addNewbatchTotheCourse() {
    await addNewBatch(newBatch, name, setNewBatchs);
  }

  useEffect(() => {
    getCourseById(name).then((data) => {
      setBatchs(data);
    });

  }, [newBatchs]);

  useEffect(() => {
    if (selectedBatch) {
      getUsers(setData, selectedBatch);
    }
  },[selectedBatch]);

  return (
    <div className="py-15 w-[100%] mr-10">
      <h1 className="font-bold text-3xl mb-4">DSA Course</h1>
      <div className="flex justify-between">
        <div className="flex flex-col w-[30%]  space-y-1.5">
          <Label className="text-2xl" htmlFor="framework">Batch</Label>
          <Select
            onValueChange={(value) => {
              setSelectedBatch(value);}
            }
          >
            <SelectTrigger id="framework">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              {batchs?.batches?.map((batch) => (
                <SelectItem
                  key={batch._id}
                  value={batch._id}
                >
                  {batch.batchName}
                </SelectItem>
              ))}
              
            </SelectContent>
          </Select>
        </div>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button type="submit">
              <PlusCircle className="items-center mr-1" />
              Add Batch
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add New Batch</SheetTitle>
              <SheetDescription>
                Add new Batch your Database here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Batch Name
                </Label>
                <Input
                  name="batchName"
                  id="batch-Name"
                  value={newBatch?.batchName}
                  onChange={handelInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Start Date
                </Label>
                <Input
                  type="date"
                  name="startDate"
                  id="username"
                  required
                  // value="" 
                  className="col-span-3"
                  onChange={handelInputChange}
                />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit"
                  onClick={addNewbatchTotheCourse}
                >Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>

      </div>
      <section className="py-15 w-[100%] mr-10 mt-6">
        <div className="component">
          <h1 className="font-bold text-3xl mb-4">All student Details</h1>
          <DataTable columns={columns} data={data?.userId} tableType={'student'} />
        </div>
      </section>
    </div>
  );
}