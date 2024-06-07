import React from "react";

export default function Detail() {
  return (
    <div className="flex flex-wrap justify-between gap-3">
      <section className="flex justify-between gap-3">
        <div className="h-12 w-12 rounded-full bg-gray-100 p-1">
          <img
            width={200}
            height={200}
            src="https://api.dicebear.com/8.x/lorelei/svg?seed=Shadow"
            alt="avatar"
          /> 
        </div>
        <div className="text-sm">
            <p>kaushal kishor</p>
            <div className="text-ellipsis overflow-hidden whitespace-nowrap
            w-[120px] sm:w-auto text-gray-400
            
            ">
                kaushal123@gmail.com
            </div>
          </div>
          
      </section>
      <p>Btach-1</p>
    </div>
  );
}
