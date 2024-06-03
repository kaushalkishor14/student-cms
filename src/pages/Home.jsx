import { SidebarButton } from "@/components/sidebar-buttons";
import StudentPage from './users/StudentPage';
import React, { useState } from "react";
import Teacher from "./Teacher";
import Course from "./Course";
import Subject from "./Subject";

function Home() {
  const [activeComponent, setActiveComponent] = useState('home');

  function handleComponentChange() {
    switch (activeComponent) {
      case 'home':
        return <StudentPage />;
      case 'teacher':
        return <Teacher />;
      case 'course':
        return <Course />;
      case 'subject':
        return <Subject />;
      default:
        return <StudentPage />;
    }
  }
  return (
    <div className=" w-full flex ">
      <div className="menubar min-h-screen min-w[80px]" >
        <SidebarButton active={setActiveComponent} value={activeComponent} />
      </div>
      <div className="Content_part_On_right mt-14 font-bold flex justify-center w-full">
        {handleComponentChange()}
      </div>
    </div>

  );
}

export default Home;
