import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React, { useState, useEffect } from "react";
import { userById } from "../../common/apiHandler";
import { Pencil } from "lucide-react";
import { useParams } from "react-router-dom";

export const courses = [
  {
    id: 1,
    name: "Introduction to Programming",
    code: "COMP101",
    instructor: "Prof. Smith",
    schedule: "Mon/Wed/Fri 9-10am",
    status: "In Progress",
  },
  // Add more courses as needed
];

export const results = [
  {
    courseId: 1,
    courseName: "Introduction to Programming",
    grade: "B+",
    dateCompleted: "May 2023",
  },
  {
    courseId: 2,
    courseName: "Daa",
    grade: "B",
    dateCompleted: "May 2023",
  },
  // Add more results as needed
];
const getUserByid = async (id, setdata) => {
  const response = await userById(id);
  setdata(response);
};

export default function ProfilePage() {
  const { id } = useParams();
  // cll data through api

  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(false);
  // const [courses, setCourses] = useState([]);
  // const [results, setResults] = useState([]);

  useEffect(() => {
    setLoading(true);
    getUserByid(id, setStudent);
    setLoading(false);
  }, []);

  console.log(student, "idsn");
  return (
    <div>
      <h1 className="text-3xl font-semibold">Student Profile Page</h1>
      <Card className="w-full mt-4 mb-4">
        <CardContent>
          <div className="flex">
            <div className="w-1/4 flex items-center justify-center ">
              <img
                src={student?.profilePicture || "https://github.com/shadcn.png"}
                alt="@shadcn"
                className="w-26 h-24 rounded-sm "
              />
            </div>
            <div className="w-3/4 grid items-center gap-4 ml-4 p-1">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" className="text-3xl font-semibold">
                  {student?.name}
                </Label>
                <h1 className="text-xl ">{student?.courseId?.title}</h1>
                <h2 className="text-lg t">{student?.batchId?.batchName}</h2>
              </div>

              <Button type="submit" className="gap-2 w-1/6">
                <Pencil className="h-4 w-4 text-white " />
                Edit Profile 
              </Button>
              
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      <Tabs defaultValue="information" className=" mt-4 bg-gary-400">
        <TabsList>
          <TabsTrigger value="information">Information</TabsTrigger>
          <TabsTrigger value="Subject">Subject</TabsTrigger>
          <TabsTrigger value="result">Results</TabsTrigger>
        </TabsList>
        <TabsContent className="w-full" value="information">
          <section className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">Personal Details</h2>
            <p className="">
              <strong>Name:</strong> {student?.name}
            </p>
            <p>
              <strong>ID:</strong> {student?._id}
            </p>
            <p>
              <strong>Email:</strong> {student?.email}
            </p>
            <p>
              <strong>isApproved:</strong> {student?.isApproved ?  "Yes" : "No"}
            </p>
          </section>
        </TabsContent>

        <TabsContent className="w-full" value="result">
          <section className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">Student Results</h2>
            <table className="w-full border-collapse border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-200 px-4 py-2">Course</th>
                  <th className="border border-gray-200 px-4 py-2">Grade</th>
                  <th className="border border-gray-200 px-4 py-2">
                    Date Completed
                  </th>
                </tr>
              </thead>
              <tbody>
                {results.map((result) => (
                  <tr key={result.courseId}>
                    <td className="border border-gray-200 px-4 py-2">
                      {result.courseName}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {result.grade}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {result.dateCompleted}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </TabsContent>

        <TabsContent className=" w-full" value="Subject">
          {" "}
          <section className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">Courses Enrolled</h2>
            <ul>
              {courses.map((course) => (
                <li key={course.id} className="mb-4">
                  <h3 className="text-xl font-bold">{course.name}</h3>
                  <p>
                    <strong>Course Code:</strong> {course.code}
                  </p>
                  <p>
                    <strong>Instructor:</strong> {course.instructor}
                  </p>
                  <p>
                    <strong>Schedule:</strong> {course.schedule}
                  </p>
                  <p>
                    <strong>Status:</strong> {course.status}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
}
