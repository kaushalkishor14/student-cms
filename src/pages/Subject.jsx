
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { Label } from "@/components/ui/label"
  import DataTable from '../components/data-table';
  import {  columns } from "../pages/users/columns";
  import params from '../common/params';
  import axios from "axios";
  import { useState,useEffect } from "react";

  
async function getUsers(setData) {
    const response = await axios.get(params?.production + '/users', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.accessToken,
        withCredentials: true,
      }
    }
    );
    setData(response?.data?.data?.users);
  }

export default function Subject() {

    const [ data, setData ] = useState([]);
  useEffect(() => {
    getUsers(setData)
  }, []);

    return (
        <div className="py-15 w-[100%] mr-10">
        <h1 className="font-bold text-3xl mb-4">DSA Course</h1>
     
        <div className="flex flex-col w-[30%]  space-y-1.5">
              <Label className="text-2xl" htmlFor="framework">Batch</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Batch-1</SelectItem>
                  <SelectItem value="sveltekit">Batch-2</SelectItem>
                  <SelectItem value="astro">Batch-3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <section className="py-15 w-[100%] mr-10 mt-6">
      <div className="component">
        <h1 className="font-bold text-3xl mb-4">All student Details</h1>
        <DataTable  columns={columns} data={data} />
      </div>
    </section>
  
        </div>
    );
}