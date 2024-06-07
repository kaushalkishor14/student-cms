import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
import { AlertModal } from "@/components/alert-modal";


export const EmployeeForm = ({ initialData }) => {
  // const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit employee" : "Create employee";
  const description = initialData ? "Edit a employee" : "Create a new employee";
  const toastMessage = initialData
    ? "Employee updated successfully"
    : "Employee created successfully";
  const action = initialData ? "Save Changes" : "Create";

  const form = useForm();

  function deleteEmployeeIsLoading() {
    console.log("deleteEmployeeIsLoading");
  }
  

  const onSubmit = (values) => {
    setLoading(true);
    if (initialData) {
      updateEmployee({ ...values, id: initialData.id });
    } else {
      createEmployee(values);
    }
    setLoading(false);
  };

  const onDelete = () => {
    deleteEmployee(initialData?.id);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        {/* <Heading title={title} description={description} /> */}
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
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="First Name"
                      disabled={loading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Last Name"
                      disabled={loading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
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
                          placeholder="Gender"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="">
            <Button disabled={loading} className="ml-auto" type="submit">
              {action}
            </Button>

            <Button
              disabled={loading}
              className="ml-auto"
              type="button"
              onClick={() => {
                router.back();
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
        name={initialData?.name}
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={deleteEmployeeIsLoading}
      />
    </>
  );
};
