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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader2, Pencil, Trash2 } from "lucide-react";

import { CourseNames, AddCourse, deleteCourseById } from "../common/apiHandler";
import AddCourseModal from "../components/AddCourseModal";
import { useAuth } from "@/common/AuthProvider";
import { useToast } from "../components/ui/use-toast";


// Import Statement end here ================================================================


const DeleteRecord = async (id, setDeleted, toast,setDelLoading, setLoding) => {
  setLoding(true);
  setDelLoading(true);
  const response = await deleteCourseById(id, toast);
  setDeleted(response);
  setDelLoading(false);
  setLoding(false);
};

export default function Course(){
  const { toast } = useToast();
  const [courses, setCourses] = useState(["DSA", "Web Development", "Python"]);
  const [newCourse, setNewCourse] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [load, setLoading] = useState(false);
  const { loading , setLoding} = useAuth();
  const [deleted, setDeleted] = useState(false);
  const [delLoading, setDelLoading] = useState(false);
  const [courseID, setCourseID] = useState(null);
  const [addCourses, setAddCourse] = useState([]);

  useEffect(() => {
    CourseNames(setAddCourse, setLoading).then((data) => {
      setAddCourse(data);
    });
  }, [loading, deleted]);

  const addCourse = async (course) => {
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
        {addCourses.map((course, index) => (
          <Card key={index} className="">
            <CardHeader>
              <CardTitle>{course?.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Details about the {course?.title} course.</p>
              <p>Number of Student in the course is <span className="text-2xl text-blue-400"> {course?.batches.length} </span> Students.</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-4 mb-2">
        <Button onClick={() => {
          setIsModalOpen(true)
          setCourseID(null)  
        }}>Add Course</Button>
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
            {addCourses?.map((data, index) => (
              <TableRow key={index} >
                <TableCell className="font-medium text-center">{data?.title}</TableCell>
                
                  <TableCell key={index} className="flex gap-2 m-auto">
                    {data?.tags?.map((tag, index) => (
                      // <p key={index}> {tag} </p>
                      <span key={index} className="bg-gray-200 text-gray-700 px-3 py-2 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </TableCell>

                <TableCell>{data?.description}</TableCell>

                <TableCell>
                  <span className="flex gap-2">
                    <Button size="icon" variant="ghost"  onClick={() => {
                        setIsModalOpen(true)
                        setCourseID(data?._id)
                    }}>  
                      <Pencil  className="h-4 w-4 "/></Button>
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Button
                          variant="ghost"
                          size="icon"
                          type="submit"
                        >
                          <Trash2 className="h-4 w-4 " />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete
                            your record and remove your data from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            disabled={delLoading}
                            onClick={() => DeleteRecord(data._id, setDeleted, toast, setDelLoading, setLoding)}>
                              {
                                delLoading ? 
                                  <>
                                    <Loader2 className="w-6 h-6 animate-spin" /> Deleting...
                                  </>
                                : "Delete"
                              }

                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <AddCourseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        addCourses={courseID? addCourses?.filter((course) => course._id === courseID).pop() : null}
      />
    </div>
  );
};
