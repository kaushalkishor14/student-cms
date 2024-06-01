import { useState } from "react";
import { Nav } from "./ui/nav";
import { UsersRound, Users2, User2, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
export function SidebarButton() {
  const [isCollapsed, setIsCollapsed] = useState(false);


  function toggleSidebar(){
setIsCollapsed(!isCollapsed)
  }



  return (
    <>
    <div className="absolute right-[-20px] top-8">
    <Button onClick={toggleSidebar} variant="secondary" className="rounded-full p-2 bg-gray-200 text-black">
        <ChevronRight />
      </Button>
    </div>
      

      <Nav
        isCollapsed={isCollapsed}
        links={[
          {
            title: "Student",
            herf: "/",
            label: "128",
            icon: UsersRound,
            variant: "default",
          },
          {
            title: "Teacher",
            label: "9",
            icon: UsersRound,
            variant: "ghost",
          },
          {
            title: "Course",
            label: "",
            icon: User2,
            variant: "ghost",
          },
        ]}
      />
    </>
  );
}
