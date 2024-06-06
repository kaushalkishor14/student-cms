
import AllRoutes from "./common/AllRoutes";
import { Button } from "./components/ui/button";
import Home from "./pages/Home";
import { Toaster } from "./components/ui/toaster";
import { Sidebar } from "lucide-react";
import { SidebarButton } from "./components/sidebar-buttons";
import { useState } from "react";
import { useAuth } from "./common/AuthProvider";

function App() {
  const [activeComponent, setActiveComponent] = useState('home');
  const {user} = useAuth();

  function handleComponentChange() {
    switch (activeComponent) {
      case 'home':
        return <Dashboard />;
      case 'student':
        return <StudentPage />;
      case 'teacher':
        return <Teacher />;
      case 'course':
        return <Course />;
      case 'subject':
        return <Subject />;
      default:
        return <Dashboard />;
    }
  }

  return (

    <div className="">
      <div className=" w-full flex ">
        {
          user &&
          <div className="menubar min-h-screen min-w[80px]" >
            <SidebarButton active={setActiveComponent} value={activeComponent} />
          </div>
        }
        <Home>
          <AllRoutes />
        </Home>
      </div>
      <Toaster />
    </div>

  );
}

export default App;
