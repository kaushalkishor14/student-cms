

import React, { useState } from "react";

import { ScrollArea } from "@/components/ui/scroll-area"

function Home({children}) {

  return (
    <ScrollArea className="h-[90vh] w-full mt-10 ">
      <div className="Content_part_On_right mt-14 font-bold flex justify-center w-full ">
        {children}
      </div>
      </ScrollArea>
  );
}

export default Home;


     