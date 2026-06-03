import { Menu } from "lucide-react";
import login from "../assets/login.jpg";

const Navbar = ({ setOpenSidebar }) => {
  return (
    <div className="h-16 bg-gradient-to-r from-[#FFE8E680] via-[#FEFFCD40] to-[#9AADF960] border-gray-200 border-b flex justify-between items-center px-4 md:px-8">
      {" "}
      <div className="flex items-center gap-3">
        <button onClick={() => setOpenSidebar(true)} className="md:hidden">
          <Menu size={24} />
        </button>

        <h1 className="font-semibold text-lg">Products</h1>
      </div>
      <img src={login} alt="" className="w-10 h-10 rounded-full" />
    </div>
  );
};

export default Navbar;
