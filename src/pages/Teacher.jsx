import React from "react";

import { EmployeeClient } from "../components/teacher-page/button";
import { useEffect } from "react";
import params from "../common/params";
import { Link } from "react-router-dom";
import axios from "axios";
import { checkingTokenExpiry } from "../common/apiHandler";

async function getUsers(setData) {
  let token;
  const newToken = await checkingTokenExpiry();
  token = newToken;
  if (!newToken) {
    token = JSON.parse(localStorage.getItem('accessToken'));
  }
  const response = await axios.get(params?.productionBaseAuthURL + '/users', {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer " + token,
      withCredentials: true,
    },
  });
  setData(response?.data?.data?.users);
}

export default function Teacher() {
  
  const [data, setData] = React.useState([]);
  useEffect(() => {
    getUsers(setData);
  }, []);

  return (
    <div className="py-15 w-[100%] mr-10">
      <div className="">
        <EmployeeClient data={data} />
      </div>
    </div>
  );
}
