import React from "react";

import { EmployeeClient } from "../components/teacher-page/button";
import { useEffect , useCallback} from "react";
import params from "../common/params";
import { Link } from "react-router-dom";
import axios from "axios";
import { checkingTokenExpiry } from "../common/apiHandler";
import { useAuth } from "@/common/AuthProvider";

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
  // // Store the data in localStorage
  // localStorage.setItem('cachedUsers', JSON.stringify(users));
  // // Set the timestamp
  // localStorage.setItem('cacheTimestamp', Date.now());
}

export default function Teacher() {
  const {deleteUserData} = useAuth();
  
  const [data, setData] = React.useState([]);


  const fetchData = useCallback(() => {
    const cachedUsers = JSON.parse(localStorage.getItem('cachedUsers'));
    const cacheTimestamp = localStorage.getItem('cacheTimestamp');
    const cacheDuration = 1000 * 60 * 10; // 10 minutes

    if (cachedUsers && cacheTimestamp && (Date.now() - cacheTimestamp < cacheDuration)) {
      setData(cachedUsers);
    } else {
      getUsers(setData);
    }
  }, []);


  useEffect(() => {
    fetchData();
  }, [deleteUserData, fetchData]);

  return (
    <div className="py-15 w-[100%] mr-10">
      <div className="">
        <EmployeeClient data={data} />
      </div>
    </div>
  );
}
