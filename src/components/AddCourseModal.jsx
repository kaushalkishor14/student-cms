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
  import { Button } from "@/components/ui/button";

const AddCourseModal = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    if (title && tags && description) {
      onSave({ title, tags: tags.split(", "), description });
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
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full"
          />
        </div>
        <DialogFooter className="flex justify-end mt-4">
          <Button variant="outline" onClick={onClose} className="mr-2">Cancel</Button>
          <Button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCourseModal;
