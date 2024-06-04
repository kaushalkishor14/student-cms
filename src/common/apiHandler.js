import { toast } from "react-toastify";
import params from './params.json';
import axios from 'axios';
// import { useToast } from "@/components/ui/use-toast";

const notify = (message, { type }) => {
    if (type) {
        toast.success(message);
        return;
    }
    toast.error(message);
}

export async function LoginUser(userDeatil, setLoading, navigate, login) { //userDeatil, setLoading
    try {
        setLoading(true);
        const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        if (!userDeatil.email || !passwordRegEx.test(userDeatil.password)) {
            if (!userDeatil.email) {
                notify("Please enter the email", false);
            } else if (!passwordRegEx.test(userDeatil.password)) {
                notify("Password must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters", false);
            } else {
                notify("Please fill all the fields", false);
            }
            setLoading(false);
            return;
        }
        const response = await axios.post(`${params ?.production}/login`, { email: userDeatil.email, password: userDeatil.password }, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.user?.accessToken,
            }
        });

        if (response.status === 200) {
            if (response?.data?.data) {
                login(response.data.data);
                notify(response.data.message, { type: true });
                setLoading(false);
                navigate('/');
                return;
            }
            throw new Error(response.data.message);
        }

        // navigate('/login');
        setLoading(false);
    } catch (err) {
        const error = err.response?.data?.message || err.message;
        notify(error, {type : false} );
        setLoading(false);
        navigate('/login');
    }
}


// export async function RegisterUser(userDetail, setLoading, navigate) {
//     setLoading(true);
//     try {
//         if (!userDetail.Name || !userDetail.email || !userDetail.password || !selectedFile) {
//             if (!userDetail.Name) {
//                 notify("Please enter the name", false);
//             } else if (!userDetail.email) {
//                 notify("Please enter the email", false);
//             } else if (!userDetail.password) {
//                 notify("Please enter the password", false);
//             } else if (!selectedFile) {
//                 notify("Please select the profile picture", false);
//             } else {
//                 notify("Please fill all the fields", false);
//             }
//             setLoading(false);
//             return;
//         }

//         const newform = new FormData();
//         newform.append('name', userDetail.name);
//         newform.append('email', userDetail.email);
//         newform.append('password', userDetail.password);
//         newform.append('file', selectedFile);

//         const response = await register(newform)
//         if (response) {
//             login(response);
//             navigate('/');
//         }
//         setLoading(false);
//         return;
//     } catch (error) {
//         toast.error(error.message);
//     }
//     setLoading(false);
// }


export const UserLogout = async (navigate, logoutContextApi, setLoading) => {
    try {
        setLoading(true);
        const response = await axios.get(`${params?.production}/logout`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+JSON.parse(localStorage.getItem('user'))?.accessToken,
            }
        });
        if (response.status === 200) {
            logoutContextApi();
            toast.success("Logged out successfully", true);
            setLoading(false);
            navigate('/login');
            return;
        }
        // logoutContextApi();
        throw new Error("Something went wrong");
    }
    catch (error) {
        setLoading(false);
        toast.error(error.message , false);
    }
}