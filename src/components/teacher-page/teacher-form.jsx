/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams } from "react-router-dom";
import { userById, CourseNames , addNewTeacher } from '../../common/apiHandler';

// Define the schema using Zod
export const teacherFormSchema = z.object({
  firstName: z.string().nonempty({ message: "First name is required" }),
  lastName: z.string().nonempty({ message: "Last name is required" }),
  batch: z.string().nonempty({ message: "Batch is required" }),
  course: z.string().nonempty({ message: "Course is required" }),
});

// AlertModal Component
const AlertModal = ({ title, description, name, isOpen, onClose, onConfirm, loading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="mt-4">{description}</p>
        <p className="mt-2 font-bold">{name}</p>
        <div className="mt-6 flex justify-end space-x-4">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm} disabled={loading}>
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
};

// Heading Component
const Heading = ({ title, description }) => (
  <div>
    <h1 className="text-2xl font-bold">{title}</h1>
    <p className="mt-2 text-gray-600">{description}</p>
  </div>
);

// TeacherForm Component
export const TeacherForm = ({ initialData }) => {
  const { id } = useParams();
  const [coursenaam, setCourseNames] = useState([]);
  const [selectCourse, setSelectCourse] = useState(null);
  const [selectBatch, setSelectBatch] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Teacher" : "Create Teacher";
  const description = initialData ? "Edit a teacher" : "Create a new teacher";
  const toastMessage = initialData
    ? "Teacher updated successfully"
    : "Teacher created successfully";
  const action = initialData ?  "Save Changes" : "Create";

  const form = useForm({
    resolver: zodResolver(teacherFormSchema),
    defaultValues: initialData || {
      firstName: "",
      lastName: "",
      batch: "",
      course: "",
    },
  });

  const createTeacher = async (data) => {
    try {
      // console.log("data from the form create teacher ", data);
      // Redirect or update the state to show the list of teachers
      await addNewTeacher(data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const updateTeacher = async (data) => {
    try {
      // Replace with your update teacher API call
      await api.teacher.update({ ...data, id: initialData.id });
      toast.success(toastMessage);
      // Redirect or update the state to show the list of teachers
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deleteTeacher = async (id) => {
    try {
      // Replace with your delete teacher API call
      await api.teacher.delete(id);
      toast.success("Teacher deleted successfully");
      // Redirect or update the state to show the list of teachers
    } catch (err) {
      toast.error(err.message);
    }
  };

  const onSubmit = (values) => {
    console.log('submit button clicked');
    setLoading(true);
    if (initialData) {
      updateTeacher({ ...values, id: initialData.id });
    } else {
      createTeacher(values);
    }
    setLoading(false);
  };

  const onDelete = () => {
    deleteTeacher(initialData?.id);
  };

  // const [loading, setLoading] = useState(false);
 


  useEffect(() => {
    CourseNames(setCourseNames, setLoading).then((data) => {
      setCourseNames(data);
    }
    );
  }, []);

  useEffect(() => {
    if (isNaN(Number(id)) === false){
      userById(id).then((data) => {
        form.setValue("firstName", data?.name);
        form.setValue("email", data?.email);
        form.setValue("batch", data?.batchId);
        form.setValue("course", data?.courseId);
      });
    }
  }, []);


  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="grid-cols-3 gap-8 md:grid">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Name"
                      disabled={loading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Email"
                      disabled={loading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex flex-col flex-wrap">
              <FormField
                control={form.control}
                name="course"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course</FormLabel>
                    <Select
                      {...field}
                      disabled={loading}
                      onValueChange={(e) => {
                        field.onChange(e);
                        setSelectCourse(e);
                      }}
                      value={field?.value}
                      defaultValue={field?.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field?.value}
                            placeholder="Course"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent >
                        {
                          coursenaam?.map((course) =>
                            <SelectItem
                              key={course?._id}
                              value={course?._id}>{course?.title}
                            </SelectItem>
                          )
                        }
                      </SelectContent>

                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="batch"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Batch</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={(e)=>{
                        field.onChange(e);
                        setSelectBatch(e);
                      }}
                      value={field?.value?.batchName}
                      defaultValue={field?.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field?.value?.batchName}
                            placeholder="Batch"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {
                         selectCourse? 
                          coursenaam.map((course) =>
                            course.batches.map((batch) =>
                              <SelectItem
                                key={batch?._id}
                                value={batch?._id}>{batch?.batchName}
                              </SelectItem>
                            )
                          ) 
                          :
                          <SelectItem> no Options</SelectItem>
                        }
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </div>
          </div>
          <div className="space-x-4">
            <Button 
              disabled={loading} 
              className="ml-auto" 
              type="submit"
              onClick={()=>onSubmit(form.getValues())}
            >
              {action}
            </Button>
            <Button
              disabled={loading}
              className="ml-auto"
              type="button"
              onClick={() => {
                // Logic to go back to the previous page
                window.history.back();
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
      <AlertModal
        title="Are you sure?"
        description="This action cannot be undone."
        name={initialData?.firstName}
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
      // loading={deleteTeacherIsLoading}
      />
    </>
  );
};
