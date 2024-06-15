// AddCourseModal.jsx
import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Input } from "@/components/ui/input"
  import { Textarea } from "./ui/textarea";
  import { Button } from "@/components/ui/button";
  import { AddCourse } from "../common/apiHandler";
  import { Loader2 } from "lucide-react";
  import { useToast } from "./ui/use-toast";
  import { useAuth } from "@/common/AuthProvider";
import { set } from "date-fns";

const AddCourseModal = ({ isOpen, onClose}) => {
  const {toast} = useToast();
  const { setLoding } = useAuth();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [responseData, setResponseData] = useState({});

  const handleSave = async() => {
    if (title && tags && description) {
      setLoding(true);loading
      setLoading
      setResponseData(await AddCourse({ title, tags: tags.split(", "), description }, toast));
      setTitle("");
      setTags("");
      setDescription("");
      setLoding(false);
      setLoading(false);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>Add New Course</DialogTitle>
        <DialogDescription>Enter the course details below.</DialogDescription>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Tags</label>
          <Input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="mt-1 block w-full"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full"
          />
        </div>
        <DialogFooter className="flex justify-end mt-4">
          <Button variant="outline" onClick={onClose} className="mr-2">Cancel</Button>
          <Button
            loading={loading}
            disabled={loading} 
            onClick={handleSave} className="bg-primary text-white px-4 py-2 rounded">
            {loading ? 
              <>
                <Loader2 className="w-6 h-6 animate-spin" /> Saving...
              </>
            : "Save"}
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCourseModal;
