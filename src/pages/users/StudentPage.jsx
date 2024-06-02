import React from "react";
import { User, columns } from "./columns";
import DataTable from '/src/components/data-table.jsx';


async function getData() {
  const res = await fetch("");
  const data = await res.json();
  return data;
}

async function StudentPage() {
  const data = await getUsers();
  return (
    <section className="py-24 ml-24">
      <div className="conatainer">
        <h1 className={"font-bold text-3xl"}>All student Details</h1>
        <DataTable columns={columns} data={data} />
      </div>
    </section>
  );
}

export default StudentPage;
