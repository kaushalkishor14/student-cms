import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { UsersRound } from "lucide-react";

export default function () {
  return (
    <>
    <h1 className="text-2xl">Dashboard</h1>
    <div className="flex  gap-8 w-full  ">
      {/* <h1 className="text-2xl">Dashboard</h1> */}
      <Card className="flex w-[25%]  bg-purple-500  ">
        <div className="flex items-center p-4  ">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="w-full mt-4 p-6 items-center ">
          <p className="text-white">TOTAL STUDENTS</p>
          <h1 className="text-white font-bold ">3000</h1>
          <small className="text-gray-300 font-semibold">80% Increase in 20Days</small>
        </div>
      </Card>

      <Card className="flex w-[25%] bg-orange-500  ">
        <div className="flex items-center p-4  ">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="w-full  mt-4 p-6">
          <p className="text-white">TOTAL COURSE</p>
          <h1 className="text-white font-bold ">30</h1>
          <small className="text-gray-300 font-semibold">76% Increase in 20 Days</small>
        </div>
      </Card>

      <Card className="flex w-[25%] rounded bg-blue-500 ">
        <div className="flex items-center p-4 ">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className=" items-center  mt-4 p-6 ">
          <p className=" text-white">NEW STUDENTS</p>
          <h1 className="text-white font-bold ">245</h1>
          <small className="text-gray-300 font-semibold">40% Increase in 20Days</small>
        </div>
      </Card>
      
      
    </div>
    </>
  );
}
