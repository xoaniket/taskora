import { NavLink, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { SiNamecheap, SiTask } from "react-icons/si";
import BlurText from "../motion/BlurText";

export default function About() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    navigate("/");
  };
  return (
    <main className="min-h-screen  flex flex-col bg-violet-50">
      <header
        data-aos="fade-down"
        data-aos-duration="700"
        className="md:hidden bg-violet-600 text-white p-4 flex flex-wrap  justify-between items-center"
      >
        <div className=" mt-4 flex items-center justify-center gap-2 tracking-tighter font-bold text-2xl mb-4">
          <BlurText
            text="TASKORA"
            delay={200}
            animateBy="letter"
            direction="top"
            className="  text-2xl text-white  "
          />
          <SiTask className="text-2xl text-white" />
        </div>

        <nav className="flex  gap-4">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "bg-white text-violet-600 px-3 py-2 rounded-lg"
                : "px-2 py-2"
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive
                ? "bg-white text-violet-600 px-3 py-2 rounded-lg"
                : "px-2 py-2"
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
          <button
            onClick={logout}
            className=" border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </nav>
      </header>
      <Sidebar />

      <section className="md:ml-64 p-6 md:p-8 space-y-6">
        <div
          data-aos="fade-up"
          data-aos-delay="150"
          data-aos-duration="800"
          className="bg-white p-6 rounded-xl shadow"
        >
          <h1 className=" flex items-center gap-2 text-4xl font-bold mb-3 text-violet-600">
            About Taskora <SiTask />
          </h1>

          <p className="text-gray-700 mb-4">
            Taskora is a modern task management application that helps users
            organize and manage their daily tasks efficiently.
          </p>

          <h2 className="text-xl font-semibold text-violet-600 mb-2">
            Technologies Used
          </h2>

          <p className="text-gray-700 mb-4">
            React.js, Tailwind CSS, Django REST Framework, Axios, JWT
            Authentication, and SQLite.
          </p>

          <h2 className="text-xl font-semibold text-violet-600 mb-2">
            Contact
          </h2>

          <p className="flex items-center gap-2">
            <SiNamecheap className="text-violet-300" />
            Developed by Aniket Chauhan.
          </p>
          <p className="flex items-center gap-2">
            <MdEmail className="text-violet-300 " /> Email:
            fiftyaniket2000@gmail.com
          </p>

          <p className="flex items-center gap-2">
            <FaPhone className="text-violet-300" />
            Contact: 8851776070
          </p>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay="150"
          data-aos-duration="800"
          className="bg-white p-6 rounded-xl shadow"
        >
          <h2 className="text-2xl font-bold mb-4 text-violet-600">
            Concepts Used
          </h2>

          <div className="grid md:grid-cols-2 gap-2">
            <p>• React Hooks</p>
            <p>• useState & useEffect</p>
            <p>• CRUD Operations</p>
            <p>• API Integration</p>
            <p>• Axios</p>
            <p>• JWT Authentication</p>
            <p>• Protected Routes</p>
            <p>• Local Storage</p>
            <p>• Conditional Rendering</p>
            <p>• Responsive UI Design</p>
          </div>
        </div>
      </section>

      <footer
        data-aos="fade-up"
        data-aos-duration="600"
        className="mt-auto text-center text-black bg-violet-400 border-t text-sm p-4 md:ml-64"
      >
        <p>Taskora v1.0</p>
        <p>Stay Organized 🚀</p>
      </footer>
    </main>
  );
}
