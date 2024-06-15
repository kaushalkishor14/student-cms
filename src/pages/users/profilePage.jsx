import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator";
import React from "react";

import { Pencil } from "lucide-react";

export default function ProfilePage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold">Student Profile Page</h1>
      <Card className="w-full mt-4 mb-4">
        <CardHeader>{/* You can add any header content here */}</CardHeader>
        <CardContent>
          <div className="flex">
            <div className="w-1/4 flex items-center justify-center ">
            <img
                src="https://github.com/shadcn.png"
                alt="@shadcn"
                className="w-26 h-24 rounded-sm "
              />
            </div>
            <div className="w-3/4 grid items-center gap-4 ml-4 p-1">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" className="text-3xl font-semibold">
                  kaushal kishor
                </Label>
                <h1 className="text-xl ">Course</h1>
                <h2 className="text-lg t">Batch</h2>
              </div>
              
              <Button type='submit' className="gap-2 w-1/6" >
              <Pencil className="h-4 w-4 text-white " />
                Edit Profile
                </Button>
              {/* <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Framework</Label>
                 
                </div> */}
            </div>
          </div>
        </CardContent>
       
      </Card>

      <Separator />


      <Tabs defaultValue="information" className="w-[400px] mt-4 bg-gary-400">
  <TabsList>
    <TabsTrigger value="information">Information</TabsTrigger>
    <TabsTrigger value="Subject">Subject</TabsTrigger>
  </TabsList>
  <TabsContent value="information">See your  account information here.</TabsContent>
  <TabsContent value="Subject">See your subject here.</TabsContent>
</Tabs>

      
    </div>
  );
}
