import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  Card,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { userById, CourseNames ,AddCourse} from "../common/apiHandler";
import AddCourseModal from "../components/AddCourseModal"; 
const invoices = [
  {
    title: "Dsa",
    tags: "C++",
    Batches: "8",
  },
  {
    title: "Pythan",
    tags: "pythan",
    Batches: "$150.00",
  },
  {
    title: "Web-D",
    tags: "html, css , javascripts",
    Batches: "$350.00",
  },
];

const course = () => {
  const [courses, setCourses] = useState(["DSA", "Web Development", "Python"]);
  const [newCourse, setNewCourse] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  //get data
  const [addCourses, setAddCourse] = useState([]);

  useEffect(() => {
    CourseNames(setAddCourse, setLoading).then((data) => {
      setAddCourse(data);
    });
  }, []);

  const addCourse = async(course) => {
    
    if (newCourse.trim()) {
      setCourses([...courses, newCourse]);
      const newCourse = await AddCourse(course); // Call the AddCourse API function
      setNewCourse("");
      setIsModalOpen(false);
      setAddCourse([...addCourses, course]); 
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Course Details</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-2">
        {courses.map((course, index) => (
          <Card key={index} className="">
            <CardHeader>
              <CardTitle>{course}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Details about the {course} course.</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-4 mb-2">
        <Button onClick={() => setIsModalOpen(true)}>Add Course</Button>
      </div>
      <Separator />

      <div className="p-4 ">
        <h2 className="text-xl font-bold mb-2">Number of Courses</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Tiles</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {addCourses.map((data, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{data.title}</TableCell>
                
                <TableCell key={index} className="flex gap-3"> 
                {data.tags.map((tag, index) => (
                  
                  <p key={index}> {tag} </p>
                ))}
                </TableCell>


                <TableCell>{data.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <AddCourseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={addCourse}
      />
    </div>
  );
};

export default course;
