

import React, { useState } from "react";

import { ScrollArea } from "@/components/ui/scroll-area"

function Home({children}) {

  return (
    <ScrollArea className="h-[90vh] w-full mt-10 ">
      <div className="p-7">
        {children}
      </div>
      </ScrollArea>
  );
}

export default Home;


     