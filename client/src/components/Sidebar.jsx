import { NavLink } from "react-router-dom";
import { Home, LogOut, ShoppingBag, X } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ openSidebar, setOpenSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
        {},
        { withCredentials: true },
      );

      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {openSidebar && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden"
          onClick={() => setOpenSidebar(false)}
        />
      )}

      <div
        className={`fixed md:static top-0 left-0 h-screen w-60 bg-[#1D222B] text-white z-50 flex flex-col transition-transform duration-300
        ${openSidebar ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        <div>
          <div className="flex justify-end p-4 md:hidden">
            <button onClick={() => setOpenSidebar(false)}>
              <X size={20} />
            </button>
          </div>

          <h1 className="px-6 text-3xl font-bold py-2">Productr</h1>

          <div className="p-4">
            <input
              type="text"
              placeholder="Search"
              className="w-full p-3 rounded-lg bg-[#1F2937] outline-none"
            />
          </div>

          <nav className="mt-6">
            <NavLink
              to="/dashboard"
              onClick={() => setOpenSidebar(false)}
              className={({ isActive }) =>
                `block px-6 py-4 ${isActive ? "bg-[#1F2937]" : ""}`
              }
            >
              <Home size={14} className="inline-block mr-2" />
              Home
            </NavLink>

            <NavLink
              to="/products"
              onClick={() => setOpenSidebar(false)}
              className={({ isActive }) =>
                `block px-6 py-4 ${isActive ? "bg-[#1F2937]" : ""}`
              }
            >
              <ShoppingBag size={14} className="inline-block mr-2" />
              Products
            </NavLink>
          </nav>
        </div>

        <div className="mt-auto border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full text-left px-6 py-4 text-red-400 hover:bg-[#1F2937] flex items-center gap-2"
          >
            <span className="text-md">Logout</span>
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
