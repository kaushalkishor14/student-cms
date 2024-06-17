import React, { useEffect, useState, useCallback } from "react";
import { columns } from "./columns";
import DataTable from '../../components/data-table';
import params from '../../common/params';
import axios from "axios";
import { checkingTokenExpiry } from '../../common/apiHandler';

async function getUsers(setData) {
  try {
    let token;
    const newToken = await checkingTokenExpiry();
    token = newToken;
    if (!newToken) {
      token = JSON.parse(localStorage.getItem('accessToken'));
    }
    const response = await axios.get(params?.productionBaseAuthURL + '/users', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      withCredentials: true,
    });

    const users = response?.data?.data?.users;
    setData(users);

    // Store the data in localStorage
    localStorage.setItem('cachedUsers', JSON.stringify(users));
    // Set the timestamp
    localStorage.setItem('cacheTimestamp', Date.now());
  } catch (error) {
    console.log(error);
  }
}

function StudentPage() {
  const [data, setData] = useState([]);
  
  // Define a function to fetch data using useCallback to avoid redefining it
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
  }, [fetchData]);

  return (
    <section className="py-15 w-[100%] mr-10">
      <div className="component">
        <h1 className="font-bold text-3xl mb-4">All student Details</h1>
        <DataTable columns={columns} data={data} tableType={'student'} />
      </div>
    </section>
  );
}

export default StudentPage;
