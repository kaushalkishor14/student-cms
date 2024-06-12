import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Loader2, Trash } from "lucide-react";
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
// import  { useState, useRef } from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { useParams } from "react-router-dom";
import { userById, CourseNames, addNewTeacher } from '../../common/apiHandler';
import { useToast } from "../ui/use-toast";

// Define the schema using Zod
export const teacherFormSchema = z.object({
  firstName: z.string().nonempty({ message: "First name is required" }),
  lastName: z.string().nonempty({ message: "Last name is required" }),
  batch: z.string().nonempty({ message: "Batch is required" }),
  course: z.string().nonempty({ message: "Course is required" }),
});

// import {toa}

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {toast} = useToast();

  const title = initialData ? "Edit Teacher" : "Create Teacher";
  const description = initialData ? "Edit a teacher" : "Create a new teacher";
  const toastMessage = initialData
    ? "Teacher updated successfully"
    : "Teacher created successfully";
  const action = initialData ? "Save Changes" : "Create";

  const form = useForm({
    resolver: zodResolver(teacherFormSchema),
    defaultValues: initialData || {
      firstName: "",
      lastName: "",
      batch: "",
      course: "",
    },
  });


  // State to store the avatar image URL
  const [avatarUrl, setAvatarUrl] = useState('https://github.com/shadcn.png');
  const [file, setFile] = useState(null);
  // Reference to the hidden file input element
  const fileInputRef = useRef(null);

  // Handle avatar click to trigger file input click
  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  // Handle file input change to update the avatar image
  const handleFileChange = (event) => {
    setFile( event.target.files[0]);
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const createTeacher = async (data) => {
    try {
      setIsSubmitting(true);
      await addNewTeacher(data, file, toast);
      setFile(null);
      setAvatarUrl('https://github.com/shadcn.png'); // Reset the avatar image
      form.setValue("course", "");
      form.setValue("batch", "");
      form.setValue("firstName", "");
      form.setValue("lastName", "");
      form.setValue("email", "");
      form.reset();
      setIsSubmitting(false);
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
    if (isNaN(Number(id)) === false) {
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
      {/* image tag  */}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          {/* Image uploader Start  */}

          <div className="grid-cols-4 gap-8 md:grid">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="m-auto">Upload Profile Picture</FormLabel>
                  <FormControl>
                    <div className="flex items-center l">
                      <Avatar
                        className="w-12 h-12 border-gray-300 border-2 rounded-ful"
                        onClick={handleAvatarClick} style={{ cursor: 'pointer' }}>
                        <AvatarImage src={avatarUrl} alt="Avatar" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <Input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                        accept="image/*"
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Image uploader End  */}
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
                      onValueChange={(e) => {
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
                          selectCourse ?
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
              disabled={isSubmitting}
              className="ml-auto"
              type="submit"
              onClick={() => onSubmit(form.getValues())}
            >
              {
                isSubmitting ? 
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
                : action
              }
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
