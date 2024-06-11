import { useContext, createContext, useState } from "react";

const context = createContext();

export default function AuthProvider({children}) {
    const [user, setUser] = useState( ()=>{
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    })

    const [accessToken, setAccessToken] = useState( ()=>{
        const accessToken = localStorage.getItem("accessToken");
        return accessToken ? JSON.parse(accessToken) : null;
    })

    const [refreshToken, setRefreshToken] = useState( ()=>{
        const refreshToken = localStorage.getItem("refreshToken");
        return refreshToken ? JSON.parse(refreshToken) : null;
    })

    const [deleteUserData , setDeleteUserData] = useState(false);


    const [loading, setLoading] = useState(false);

    function login(user) {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
    }

    function logout() {
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUser(null);
    }   

    function setLoding(value){
        setLoading(value);
        return;
    }

    function setAccessTokenFunction(value){
        localStorage.setItem("accessToken", JSON.stringify(value));
        setAccessToken(value);
        return;
    }

    function setRefreshTokenfunction(value){
        localStorage.setItem("refreshToken", JSON.stringify(value));
        setRefreshToken(value);
        return;
    }



    return (
        <context.Provider
            value={{
                user,
                setUser,
                login,
                logout,
                setLoding,
                loading,
                accessToken,
                setAccessTokenFunction,
                refreshToken,
                setRefreshTokenfunction,
                deleteUserData,
                setDeleteUserData
            }}
        >
            {children}
        </context.Provider>
    )
}

export const useAuth = () => useContext(context);