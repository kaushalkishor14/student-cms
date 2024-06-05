import { SidebarButton } from "@/components/sidebar-buttons";
import StudentPage from './users/StudentPage';
import React, { useState } from "react";
import Teacher from "./Teacher";
import Course from "./Course";
import Subject from "./Subject";
import Dashboard from "./Dashboard";


function Home({children}) {

  return (
      <div className="Content_part_On_right mt-14 font-bold flex justify-center w-full">
        {children}
      </div>
  );
}

export default Home;


      {/* <div className="menubar min-h-screen min-w[80px]" >
        <SidebarButton active={setActiveComponent} value={activeComponent} />
      </div> */}