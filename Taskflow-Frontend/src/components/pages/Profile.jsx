import { NavLink, useNavigate } from "react-router-dom";
import api from "../services/api";
import Sidebar from "./Sidebar";
import React from "react";
import {} from "react";
import { SiTask } from "react-icons/si";
import BlurText from "../motion/BlurText";

export default function Profile() {
  const [username, setUsername] = React.useState(null);
  const [email, setemail] = React.useState(null);
  const [tasks, setTasks] = React.useState([]);

  const quotes = [
    "Every completed task is a step closer to your goal.",
    "Small progress is still progress.",
    "Focus on being productive, not busy.",
    "Done is better than perfect.",
  ];

  const quote = quotes[new Date().getDate() % quotes.length];

  const fetchProfile = async () => {
    try {
      const response = await api.get("/accounts/profile/");
      console.log("fetching");
      setUsername(response.data.username);
      setemail(response.data.email);
      console.log(response.data, "success");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const fetchTask = async () => {
    try {
      const response = await api.get("/tasks/");
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    navigate("/");
  };

  React.useEffect(() => {
    fetchProfile();
    fetchTask();
  }, []);
  return (
    <main className="min-h-screen flex flex-col bg-violet-50 ">
      <header
        data-aos="fade-down"
        data-aos-duration="700"
        className="md:hidden bg-violet-600 text-white p-4 flex flex-wrap  justify-between items-center"
      >
        <div className="  flex items-center justify-center gap-2 tracking-tighter font-bold text-2xl mb-4">
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

      <div className="md:flex md:flex-col flex-1">
        <section className="p-4 flex-1 flex flex-col md:ml-64">
          <div
            data-aos="fade-up"
            data-aos-duration="800"
            className="flex  bg-linear-to-r from-violet-500 to-purple-600 text-white shadow mb-9 p-8 rounded-xl justify-between "
          >
            <div className="w-24 h-24 rounded-full bg-white text-violet-400 flex items-center justify-center text-4xl font-bold">
              {username?.charAt(0).toUpperCase()}
            </div>

            <div className="ml-6 flex-1">
              <h2 className="tracking-tight text-2xl font-bold mb-4">
                My Profile
              </h2>

              <p className="text-xl">
                <strong>Username:</strong> {username}
              </p>
              <p className="text-xl">
                <strong>Email:</strong> {email}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-2 mb-6">
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-duration="700"
              className="p-5 bg-linear-to-br from-blue-500 to-blue-700 text-white rounded-xl shadow"
            >
              <p>Total Task</p>
              <h2 className="text-3xl font-bold">{totalTasks}</h2>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="700"
              className="p-5 bg-linear-to-br from-green-500 to-emerald-700 text-white  rounded-xl shadow"
            >
              <p>Completed Tasks</p>
              <h2 className="text-3xl font-bold">{completedTasks}</h2>
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-duration="700"
              className="p-5 border border-orange-200 bg-linear-to-br from-orange-500 to-amber-700 text-white rounded-xl shadow"
            >
              <p>Pending Tasks</p>
              <h1 className="text-3xl font-bold">{pendingTasks}</h1>
            </div>
          </div>

          <div
            data-aos="fade-up"
            data-aos-duration="900"
            className="  bg-linear-to-br from-violet-600 via-indigo-600 to-blue-600 rounded-2xl p-6 text-white shadow-xl"
          >
            <p className="text-violet-200 text-sm uppercase tracking-wider mb-2">
              Daily Motivation
            </p>

            <h3 className="text-2xl font-semibold leading-relaxed">{quote}</h3>

            <p className="mt-4 text-violet-200 text-sm">
              Keep pushing forward 🚀
            </p>
          </div>
        </section>
        <footer className="mt-auto text-center  bg-violet-400 shadow  text-sm p-4 md:ml-64">
          <p>Taskora v1.0</p>
          <p>Stay Organized 🚀</p>
        </footer>
      </div>
    </main>
  );
}
