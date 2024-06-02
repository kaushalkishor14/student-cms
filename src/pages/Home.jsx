import { SidebarButton } from "@/components/sidebar-buttons";
import { SidebarDesktop } from "@/components/sidebar-desktop";
import StudentPage from './users/StudentPage';
import React from "react";

function Home() {
  return (
    <div className=" w-full flex ">
      <div className="min-h-screen min-w[80px]" >
        <SidebarButton />
      </div>
      <div className="mt-14 font-bold flex justify-center w-full">
        <StudentPage/>
      </div>
    </div>

  );
}

export default Home;
