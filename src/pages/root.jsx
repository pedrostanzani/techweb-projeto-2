import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/navbar";

const Root = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Toaster />
    </div>
  );
};

export default Root;
