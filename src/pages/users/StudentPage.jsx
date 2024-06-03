import React from "react";
import {  columns } from "./columns";
import DataTable from '../../components/data-table';
import { useEffect } from "react";
import params from '../../common/params';
import axios from "axios";


async function getUsers(setData) {
  let response = await axios.get(params?.production + '/users', {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      withCredentials: true,
    }
  }
  );
  
  console.log(response)
 
  setData(response);
  
}

function StudentPage() {
  const [ data, setData ] = React.useState([]);
  useEffect(() => {
    getUsers(setData)
  }, []);
  return (
    <section className="py-15 w-[100%] mr-10">
      <div className="component">
        <h1 className="font-bold text-3xl mb-4">All student Details</h1>
        <DataTable  columns={columns} data={data} />
      </div>
    </section>
  );
}

export default StudentPage;
