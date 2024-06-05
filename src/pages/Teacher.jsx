import React from "react";
// import { api } from "@/utils/api";
// import { Loading } from "@/components/common/loading";/
import { EmployeeClient } from "../components/teacher-page.jsx/button";
// import Loading from '..//components/loading'
import { useEffect } from "react";
import params from "../common/params";
import axios from "axios";

async function getUsers(setData) {
  const response = await axios.get(params?.production + "/users", {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer " + JSON.parse(localStorage.getItem("user"))?.accessToken,
      withCredentials: true,
    },
  });
  setData(response?.data?.data?.users);
}

export default function Teacher() {
  // const { data, isLoading, isError, error } = useQuery();

  // if (isLoading) return <Loading/>;

  // if (isError) return <div>Error: {error.message}</div>;

  const [data, setData] = React.useState([]);
  useEffect(() => {
    getUsers(setData);
  }, []);

  return (
    <div className="flex flex-col w-[100%]">
      <div className="flex-1 space-y-4 md:p-8">
        <EmployeeClient data={data} />
      </div>
    </div>
  );
}
