
import AllRoutes from "./common/AllRoutes";
import { Button } from "./components/ui/button";
import Home from "./pages/Home";
import { ToastContainer, } from "react-toastify";
import { Toaster } from "./components/ui/toaster";
import { Sidebar } from "lucide-react";

function App() {
  return (
    <>
      <div className="">
      
        <AllRoutes />
      </div>
    </>
  );
}

export default App;
