import { useState, useEffect } from "react";
import { Nav } from "./ui/nav";
import { UsersRound, Users2, User2, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { CourseNames } from '../common/apiHandler'; // Ensure this path is correct
import { generateLinks } from "@/utlity/dynamic.nav"; // Ensure this path is correct

export function SidebarButton({ active, value }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [courseName, setCourseNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [links, setLinks] = useState([]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const fetchCourseNames = async () => {
    try {
      // setLoading(true);
      await CourseNames(setCourseNames, setLoading);
      // setLoading(false);
    } catch (error) {
      console.error('Failed to fetch course names:', error);
    }
  };

  useEffect(() => {
    fetchCourseNames();
  }, []);

  useEffect(() => {
    if (courseName.length > 0) {
      const generatedLinks = generateLinks(courseName, active);
      setLinks(generatedLinks);
    }
  }, [courseName, active]);


  return (
    <div className="relative border-r min-h-screen pt-24 px-3 pb-10 gap-3 mr-9">
      <div className="absolute right-[-20px] top-8">
        <Button onClick={toggleSidebar} variant="secondary" className="rounded-full p-2 bg-primary text-white">
          <ChevronRight />
        </Button>
      </div>

      <Nav
        isCollapsed={isCollapsed}
        links={[
          {
            title: "Dashboard",
            href: "/",
            label: "",
            icon: UsersRound,
            variant: value === 'home' ? "default" : "ghost",
            onClick: () => active('home')
          },
          {
            title: "Course",
            href: "/course",
            label: "",
            icon: User2,
            subRoute: links,
            variant: value === 'subject' ? "default" : "ghost",
            onClick: () => active('subject')
          },
          {
            title: "Student",
            href: "/student",
            label: "",
            icon: UsersRound,
            variant: value === 'student' ? "default" : "ghost",
            onClick: () => active('student')
          },
          {
            title: "Teacher",
            href: "/teacher",
            label: "",
            icon: UsersRound,
            variant: value === 'teacher' ? "default" : "ghost",
            onClick: () => active('teacher')
          },
        ]}
      />
    </div>
  );
}
