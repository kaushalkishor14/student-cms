import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  Card,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input"
// import { Modal } from '@shadcn/ui/modal';

const course = () => {
  const [courses, setCourses] = useState(['DSA', 'Web Development', 'Python']);
  const [newCourse, setNewCourse] = useState('');
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const addCourse = () => {
    if (newCourse.trim()) {
      setCourses([...courses, newCourse]);
      setNewCourse('');
      setIsModalOpen(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Course Details</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {courses.map((course, index) => (
          <Card key={index} className="shadow-lg">
            <CardHeader>
              <CardTitle>{course}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Details about the {course} course.</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-4">
        <Button onClick={() => setIsModalOpen(true)}>Add Course</Button>
      </div>

      {/* <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}> */}
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">Add New Course</h2>
          <Input
            placeholder="Course Name"
            value={newCourse}
            onChange={(e) => setNewCourse(e.target.value)}
            className="mb-4"
          />
          <Button onClick={addCourse}>Add</Button>
        </div>
      {/* </Modal> */}
    </div>
  );
};

export default course;
