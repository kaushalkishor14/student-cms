import React from "react";
import { Avatar } from "../ui/avatar";
export default function Detail({ user }) {
  return (
    <div className="flex flex-wrap justify-between gap-3">
      <section className="flex justify-between gap-3">
        <div className="h-12 w-12 rounded-full bg-gray-100 p-1">
          <Avatar
            width={200}
            height={200}
            className="hover:opacity-80 transition duration-300 ease-in-out border-2"
            borderColor="border-gray-400"
          >
            <img src={user.profilePicture} alt="avatar" />
          </Avatar>
        </div>
        <div className="text-sm">
          <p>{user.name}</p>
          <div className="text-ellipsis overflow-hidden whitespace-nowrap
            w-[120px] sm:w-auto text-gray-400
            
            ">
            {user.email}
          </div>
        </div>
      </section>
      <div className="lowercase flex gap-4">
        <p> {user.courseId.title} </p>
        <p> {user.batchId.batchName} </p>
      </div>
    </div>
  );
}
