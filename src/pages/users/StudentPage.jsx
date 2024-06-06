import React from "react";
import { columns } from "./columns";
import DataTable from '../../components/data-table';
import { useEffect } from "react";
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
        'Authorization': 'Bearer '+token,
        
      },
      withCredentials: true,
    }
    );
    setData(response?.data?.data?.users);
  } catch (error) {
    console.log(error);
  }
}

function StudentPage() {
  const [data, setData] = React.useState([]);
  useEffect(() => {
    getUsers(setData)
  }, []);
  return (
    <section className="py-15 w-[100%] mr-10">
      <div className="component">
        <h1 className="font-bold text-3xl mb-4">All student Details</h1>
        <DataTable columns={columns} data={data} />
      </div>
    </section>
  );
}

export default StudentPage;
