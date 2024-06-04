import { useState } from "react";
import { Nav } from "./ui/nav";
import { UsersRound, Users2, User2, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

export function SidebarButton({active, value}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
 

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div className=" relative border-r min-h-screen   pt-24 px-3 pb-10   gap-3 mr-9">
      <div className="absolute right-[-20px] top-8">
        <Button onClick={toggleSidebar} variant="secondary" className="rounded-full p-2 bg-gray-200 text-black">
          <ChevronRight />
        </Button>
      </div>


      <Nav
        isCollapsed={isCollapsed}
        links={[
          {
            title: "Course",
            href: "/course",
            label: "",
            icon: User2,
            variant: value === 'subject' ? "default" : "ghost",
            onClick: () => active('subject')
          },
          {
            title: "Student",
            href: "/student",
            label: "",
            icon: UsersRound,
            variant: value === 'home' ? "default" : "ghost",
            onClick: () => active('home')
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
