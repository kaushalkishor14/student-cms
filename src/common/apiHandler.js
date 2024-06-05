import { toast } from "react-toastify";
import params from './params.json';
import axios from 'axios';


// function to notify user
const notify = (message, { type }) => {
    if (type) {
        toast.success(message);
        return;
    }
    toast.error(message);
}

// function to check if token is expired
function isTokenExpired(token) {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime;
}

// function call before every api call to check if token is expired
export const checkingTokenExpiry = async () => {
    try{
        const token = JSON.parse(localStorage.getItem('accessToken'));
        if (isTokenExpired(token)){
            const response = await axios.get(`${params?.productionBaseAuthURL}/refreshAccessToken`, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('accessToken')),
                }
            });

            if (response.status === 200) {
                localStorage.setItem('accessToken', JSON.stringify(response?.data?.data?.accessToken));
                localStorage.setItem('refreshToken', JSON.stringify(response?.data?.data?.refreshToken));
                console.log("Token refreshed successfully");
                return response?.data?.data?.accessToken;
            } else{
                navigate('/login');
                toast.error("Token expired, please login again", false);
                throw new Error("Token expired, please login again");
            }
        }
    } catch (error) {
        // toast.error(error.message, false);
        console.log("Error in checkingTokenExpiry : ", error);
        return null;
    }
}

export async function LoginUser(userDetail, setLoading, navigate, login, setAccessToken, setRefreshToken) { 
    //userDetail, setLoading
    try {
        setLoading(true);
        const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        if (!userDetail.email || !passwordRegEx.test(userDetail.password)) {
            if (!userDetail.email) {
                notify("Please enter the email", false);
            } else if (!passwordRegEx.test(userDetail.password)) {
                notify("Password must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters", false);
            } else {
                notify("Please fill all the fields", false);
            }
            setLoading(false);
            return;
        }
        const response = await axios.post(`${params?.productionBaseAuthURL}/login`, { email: userDetail.email, password: userDetail.password }, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('accessToken')),
            }
        });

        if (response.status === 200) {
            if (response?.data?.data) {
                login(response.data.data);
                setAccessToken(response?.data?.data?.accessToken);
                setRefreshToken(response.data?.data?.refreshToken);
                notify(response.data.message, { type: true });
                setLoading(false);
                navigate('/');
                return;
            }
            throw new Error(response.data.message);
        }
        setLoading(false);
    } catch (err) {
        const error = err.response?.data?.message || err.message;
        notify(error, { type: false });
        setLoading(false);
        navigate('/login');
    }
}


export async function RegisterUser(userDetail, setLoading, navigate, selectedFile) {
    setLoading(true);
    console.log("image is here ", selectedFile);
    try {
        if (!userDetail.Name || !userDetail.email || !userDetail.password || !selectedFile) {
            if (!userDetail.Name) {
                notify("Please enter the name", false);
            } else if (!userDetail.email) {
                notify("Please enter the email", false);
            } else if (!userDetail.password) {
                notify("Please enter the password", false);
            } else if (!selectedFile) {
                notify("Please select the profile picture", false);
            } else {
                notify("Please fill all the fields", false);
            }
            setLoading(false);
            return;
        }

        const newform = new FormData();
        newform.append('name', userDetail.name);
        newform.append('email', userDetail.email);
        newform.append('password', userDetail.password);
        newform.append('file', selectedFile);

        const response = await axios.post(`${params?.productionBaseAuthURL}/signup`, newform, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem('accessToken')),
            }
        });
        console.log("User register response : ", response);
        if (response.status === 200) {
            notify(response.data.message, { type: true });
            navigate('/login');
        }
        setLoading(false);
        return;
    } catch (error) {
        toast.error(error.message);
    }
    setLoading(false);
}



export const UserLogout = async (navigate, logoutContextApi, setLoading) => {
    try {
        setLoading(true);
        let token;
        const newToken = await checkingTokenExpiry();
        token = newToken;
        if (!newToken) {
            token = JSON.parse(localStorage.getItem('accessToken'));
        }
        const response = await axios.get(`${params?.productionBaseAuthURL}/logout`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        });
        if (response.status === 200) {
            logoutContextApi();
            toast.success("Logged out successfully", true);
            navigate('/login');
            setLoading(false);
            return;
        }
        setLoading(false);
        throw new Error("Something went wrong");
    }
    catch (error) {
        toast.error(error.message, false);
    }
}


export async function CourseName(courseName, setLoading, navigate) {
    try {
        setLoading(true);
        const response = await axios.post(`${params?.productionBaseURL}/course`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('accessToken')),
            }
        });

        if (response.status === 200) {
            notify(response.data.message, { type: true });
            navigate('/course');
            setLoading(false);
            return;
        }
        setLoading(false);
        throw new Error(response.data.message);
    } catch (error) {
        toast.error(error.message, false);
        setLoading(false);
    }
}
