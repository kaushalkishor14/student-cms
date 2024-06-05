
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

import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { checkingTokenExpiry } from '../common/apiHandler';

async function getUsers(setData) {
  let token;
    const newToken = await checkingTokenExpiry();
    token = newToken;
    if (!newToken) {
      token = JSON.parse(localStorage.getItem('accessToken'));
    }
    const response = await axios.get(params?.productionBaseAuthURL + '/users', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      withCredentials: true,
    }
  }
  );
  setData(response?.data?.data?.users);
}

export default function Subject() {

  const [data, setData] = useState([]);
  useEffect(() => {
    getUsers(setData)
  }, []);

  return (
    <div className="py-15 w-[100%] mr-10">
      <h1 className="font-bold text-3xl mb-4">DSA Course</h1>
      <div className="flex justify-between">
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
        {/* <Button type="submit">
          <PlusCircle className="items-center mr-1" />Add Batch</Button> */}
        <Sheet>
          <SheetTrigger asChild>
            <Button type="submit">
              <PlusCircle className="items-center mr-1" />
              Add Batch
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value="Pedro Duarte" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" value="@peduarte" className="col-span-3" />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>

      </div>
      <section className="py-15 w-[100%] mr-10 mt-6">
        <div className="component">
          <h1 className="font-bold text-3xl mb-4">All student Details</h1>
          <DataTable columns={columns} data={data} />
        </div>
      </section>

    </div>
  );
}