import AllRoutes from "./common/AllRoutes";
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import { Toaster } from "./components/ui/toaster";
import { Sidebar } from "lucide-react";
import Home from "./pages/Home";

function App() {
  return (

      <div className="">
        <Sidebar />
        <AllRoutes />
        {/* <Home/> */}
        <Toaster />
        <ToastContainer />
      </div>
    
  );
}

export default App;
