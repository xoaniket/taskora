import { SiTask } from "react-icons/si";
import { NavLink, useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    navigate("/");
  };
  return (
    <aside className="hidden md:flex w-64 bg-violet-600  flex-col min-h-screen fixed top-0 left-0 ">
      <h1 className="flex items-center gap-2 text-3xl font-bold text-white p-6">
        TASKORA <SiTask />
      </h1>
      <nav className="flex flex-col px-6 gap-4 text-white ">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "bg-white text-violet-600 px-3 py-2 rounded-lg"
              : "px-3 py-2"
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive
              ? "bg-white text-violet-600 px-3 py-2 rounded-lg"
              : "px-3 py-2"
          }
        >
          Profile
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "bg-white text-violet-600 px-3 py-2 rounded-lg"
              : "px-2 py-2"
          }
        >
          About
        </NavLink>
      </nav>
      <button
        onClick={logout}
        className="mt-auto mx-6 mb-6 bg-white text-violet-600 hover:bg-violet-500 hover:text-white py-1 px-4 rounded-2xl"
      >
        Logout
      </button>
    </aside>
  );
}
