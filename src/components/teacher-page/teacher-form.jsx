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
import { userById, CourseNames } from '../../common/apiHandler';

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

  console.log("This is teacher-form and id is ", id);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Teacher" : "Create Teacher";
  const description = initialData ? "Edit a teacher" : "Create a new teacher";
  const toastMessage = initialData
    ? "Teacher updated successfully"
    : "Teacher created successfully";
  const action = initialData ? "Create" : "Save Changes";;

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
      // Replace with your create teacher API call
      await api.teacher.create(data);
      toast.success(toastMessage);
      // Redirect or update the state to show the list of teachers
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
  const [coursenaam, setCourseNames] = useState([]);

  useEffect(() => {
    CourseNames(setCourseNames, setLoading).then((data) => {
      setCourseNames(data);
    }
    );
  }, []);


  useEffect(() => {
    if (id) {
      userById(id).then((data) => {
        form.setValue("firstName", data.name);
        form.setValue("email", data.email);
        form.setValue("batch", data.batchId);
        form.setValue("course", data.courseId);
      });
    }
  }
    , []);

  // console.log("Course Names are ", coursenaam)

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
                  <FormLabel> Name</FormLabel>
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


            <div>

              <FormField
                control={form.control}
                name="batch"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Batch</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value.batchName}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value.batchName}
                            placeholder="Batch"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Batch 1</SelectItem>
                        <SelectItem value="2">Batch 2</SelectItem>
                        <SelectItem value="3">Batch 3</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="course"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Course"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="math">Math</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="history">History</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="space-x-4">
            <Button disabled={loading} className="ml-auto" type="submit">
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
