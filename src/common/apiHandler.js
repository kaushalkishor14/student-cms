import { toast } from "react-toastify";
import params from './params.json';
import axios from 'axios';
import * as generator from 'generate-password';
import course from "@/pages/Course";
import imgageFromPublic from "@/assets/user.png";

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
    try {
        const token = JSON.parse(localStorage.getItem('accessToken'));
        if (isTokenExpired(token)) {
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
            } else {
                // navigate('/login');
                toast.error(response.data.message, false);
                throw new Error(response.data.message);
            }
        }
        return token;
    } catch (error) {
        toast.error("Token expired, please login again", false);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        toast.error("Token expired, please login again", false);
        console.log("Error in checkingTokenExpiry : ", error.message);
        window.location.href = '/login';
        return null;
    }
}

export async function LoginUser(userDetail, setLoading, navigate, login, setAccessToken, setRefreshToken,toast) {
    //userDetail, setLoading
    try {
        setLoading(true);
        const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        if (!userDetail.email || !passwordRegEx.test(userDetail.password)) {
            if (!userDetail.email) {
                // notify("Please enter the email", false);
                toast({
                    title:"Please enter the email"
                })
            } else if (!passwordRegEx.test(userDetail.password)) {
                // notify("Password must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters", false);
                toast({
                    title:"Password error",
                    description:"Password must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters"
                })
            } else {
                // notify("Please fill all the fields", false);
                toast({
                    title:"Please fill all the fields"
                })
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

            if (response?.data?.data && response?.data?.data.user?.role === ('admin' || 'teacher')) {
                console.log("You are authorized to login");
                login(response.data.data);
                setAccessToken(response?.data?.data?.accessToken);
                setRefreshToken(response.data?.data?.refreshToken);
                // notify(response.data.message, { type: true });
                toast({
                    title:response.data.message
                });
                setLoading(false);
                navigate('/');
                return;
            }

            if(response?.data?.data && response?.data?.data.user?.role === 'student') {
                notify("You are not authorized to login", { type: false });
                console.log("You are not authorized to login");
                setLoading(false);
                return;
            }
            throw new Error(response.data.message);
        }
        setLoading(false);
    } catch (err) {
        const error = err.response?.data?.message || err.message;
        // notify(error, { type: false });
        toast({
            title:error
        })
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        console.log("Please login again");
        setLoading(false);
        navigate('/login');
    }
}


export async function RegisterUser(userDetail, setLoading, navigate, selectedFile) {
    setLoading(true);
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
        let token = await checkingTokenExpiry();
        if (!token) {
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
        const errorMessage = error.response?.data?.message || error.message;
        console.log("Error in UserLogout : ", errorMessage);
        toast.error(error.message, false);
    }
}


export async function CourseNames(setCourseName, setLoading) {
    try {
        setLoading(true);
        let newToken = await checkingTokenExpiry();

        if (!newToken) {
            newToken = JSON.parse(localStorage.getItem('accessToken'));
        }

        const response = await axios.get(`${params?.CourseURL}/getCourse`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + newToken,
            }
        });

        if (response.status === 200) {
            notify(response.data.message, { type: true });
            setCourseName(response.data.data);
            setLoading(false);
            return response.data.data;
        }
        setLoading(false);
        throw new Error(response.data.message);
    } catch (error) {
        toast.error(error.message, false);
        setLoading(false);
    }
}


export async function AddCourse(courseDetail, setLoading, navigate) {
    try {
        setLoading(true);
        let newToken = await checkingTokenExpiry();
        if (!newToken) {
            newToken = JSON.parse(localStorage.getItem('accessToken'));
        }

        const response = await axios.post(`${params?.CourseURL}/addCourse`, courseDetail, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + newToken,
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


export async function getBatchById(id) {
    try {
        let newToken = await checkingTokenExpiry();
        if (!newToken) {
            newToken = JSON.parse(localStorage.getItem('accessToken'));
        }
        // const response = await axios.get(`${params?.BatchURL}/getBatchById/${id}`, {
        const response = await axios.get(`${params?.LocalBaseURL}/batch/getBatchById/${id}`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + newToken,
            }
        });
        if (response.status === 200) {
            notify(response.data.message, { type: true });
            return response.data.data;
        }
        throw new Error(response.data.message);
    } catch (error) {
        toast.error(error.message, false);
    }
}

export async function getCourseById(id) {

    try {
        let newToken = await checkingTokenExpiry();
        if (!newToken) {
            newToken = JSON.parse(localStorage.getItem('accessToken'));
        }
        const response = await axios.get(`${params.CourseURL}/getCourseById/${id}`, {
            // const response = await axios.get(`${params.LocalBaseURL}/course/getCourseById/${id}`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + newToken,
            }
        });


        if (response.status === 200) {
            notify(response.data.message, { type: true });
            return response.data.data;
        }
        throw new Error(response.data.message);
    } catch (error) {
        console.log("Error in getCourseById : ", error);
        console.log("Error in getCourseById : ", error.message);
        toast.error(error.message, false);
    }
}


export async function addNewBatch(batchDetail, courseId, setNewBatchs) {
    try {
        let newToken = await checkingTokenExpiry();
        if (!newToken) {
            newToken = JSON.parse(localStorage.getItem('accessToken'));
        }

        const batchData = {
            batchName: batchDetail.batchName,
            startDate: batchDetail.startDate,
            courseId: courseId
        }
        const response = await axios.post(`${params?.BatchURL}/addBatch/`, batchData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + newToken,
            }
        });

        if (response.status === 200) {
            notify(response.data.message, { type: true });
            console.log("Batch added successfully");
            setNewBatchs(response.data.data);
            return;
        }
        if (response.status === 201) {
            notify(response.data.message, { type: true });
            console.log("Batch added successfully");
            setNewBatchs(response.data.data);
            return response.data.data;
        }
        throw new Error(response.data.message);
    } catch (error) {

        console.log("Error in addNewBatch : ", error.message);
        toast.error(error.message, false);
    }

}


export async function userById(id) {
    try {
        let newToken = await checkingTokenExpiry();

        const response = await axios.get(`${params?.productionBaseAuthURL}/userById/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + newToken,
            },
            withCredentials: true
        });
        if (response.status === 200) {
            toast(response.data.message, { type: true });
            return response?.data?.data;
        }
        throw new Error(response.data.message);
    } catch (error) {
        toast.error(error.message, false);
    }
}


export async function getUsers(setData) {
    try {
        const newToken = await checkingTokenExpiry();

        const response = await axios.get(params?.productionBaseAuthURL + '/users', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + newToken,
            },
            withCredentials: true,
        });
        if(response.status === 200) {
            setData(response?.data?.data?.users);
            return response?.data?.data?.users;
        }
        throw new Error(response.data.message);
    } catch (error) {
        console.log("Error in getUsers : ", error);
        toast.error(error.message, false);
    }
}

export async function deleteUserById(id){
    try {
        let token = await checkingTokenExpiry();
        console.log("Token in deleteUserById : ", token);
        
        const response = await axios.delete(`${params?.productionBaseAuthURL}/deleteUserById/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            withCredentials: true,
        });
        if (response.status === 200) {
            console.log("User deleted successfully ", response.data?.message);
            return response.data;
        }
        throw new Error(response.data.message);
    } catch (error) {
        console.log("Error in deleteUserById : ", error.message);
        toast.error(error?.response?.data?.message || error.message, false);
    }
}


export async function addNewTeacher(teacherDetail) {
    try {

        password = generator.generate({
            length: 8,
            numbers: true,
            symbols: true,
            uppercase: true,
            lowercase: true,
            excludeSimilarCharacters: true,
          });
        
        const teacherInfo = {
            name: teacherDetail.firstName,
            email: teacherDetail.email,
            password: password,
            role: 'teacher',
            file: imgageFromPublic,
            courseId: teacherDetail.course,
            batchId: teacherDetail.batch
        }



        console.log("Teacher Info :  ===========   ", teacherInfo);


        // let token = await checkingTokenExpiry();
        // const response = await axios.post(`${params?.productionBaseAuthURL}/addTeacher`, teacherDetail, {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': 'Bearer ' + token,
        //     },
        //     withCredentials: true,
        // });
        // if (response.status === 200) {
        //     console.log("Teacher added successfully");
        //     notify(response.data.message, { type: true });
        //     // setNewTeacher(response.data.data);
        //     return response.data.data;
        // }
        // throw new Error(response.data.message);
        throw new Error("Error in addNewTeacher");
    } catch (error) {
        console.log("Error in addNewTeacher err :");
        // toast.error(error.message, false);
    }
}