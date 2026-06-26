import React from "react";
import api from "../services/api";
import { FaEdit, FaTasks } from "react-icons/fa";

import Sidebar from "./Sidebar";
import { NavLink, useNavigate } from "react-router-dom";
import { SiTask } from "react-icons/si";
import BlurText from "../motion/BlurText";

export default function Dashboard() {
  const [profile, setProfile] = React.useState(null);
  const [tasks, setTasks] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [editTask, setEditTask] = React.useState(null);

  const editRef = React.useRef(null);

  //CREATE & EDIT NEW TASK BY USER..........................................
  const createTask = async (e) => {
    e.preventDefault();

    if (editTask) {
      try {
        await api.put(`/tasks/${editTask.id}/`, { title, description }); // storing task details in TASK FIELDS..........

        setTitle("");
        setDescription("");
        setEditTask(null);

        fetchTasks(); //show tasks after adding.........
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await api.post("/tasks/", { title, description }); // storing task details in TASK FIELDS..........

        setTitle("");
        setDescription("");

        fetchTasks(); //show tasks after adding.........
      } catch (error) {
        console.log(error);
      }
    }
  };

  //FILTER TASKS BY SEARCHING.................................................................
  const filteredTask = tasks.filter((task) => {
    return task.title.toLowerCase().includes(
      //lowercase make serach case-insenstive
      search.toLowerCase(),
    );
  });

  const toggleTaskStatus = async (task) => {
    try {
      await api.put(`/tasks/${task.id}/`, { completed: !task.completed });
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  //ALL TASKS RENDER ON SCREEN.............................................................................
  const alltasks = filteredTask.map((task) => (
    <div
      key={task.id}
      className={`bg-white mb-4 rounded-xl p-5 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all border-l-4 ${
        task.completed ? "border-green-500" : "border-yellow-500"
      }`}
    >
      <div className="">
        <h3 className="font-semibold text-lg capitalize mb-2">{task.title}</h3>

        <p className="text-gray-600 mb-3">{task.description}</p>
      </div>

      <div>
        <span
          className={
            task.completed
              ? "inline-block bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm"
              : "inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg text-sm"
          }
        >
          {task.completed ? "Completed" : "Pending"}
        </span>
      </div>

      <div className="flex flex-wrap  mt-3 justify-center ">
        <button
          className=" w-25 bg-red-500 hover:bg-red-600 active:scale-95 text-white font-semibold px-3 py-1 rounded-lg"
          onClick={() => deleteTask(task.id)}
        >
          DELETE
        </button>

        <button
          className=" w-25 bg-blue-400 hover:bg-blue-500 text-white font-semibold active:scale-90 py-1 px-3 ml-3 rounded-lg"
          onClick={() => startEdit(task)}
        >
          Edit
        </button>

        <button
          onClick={() => toggleTaskStatus(task)}
          className=" w-25 bg-green-500 hover:bg-green-600 active:scale-95 font-semibold text-white py-1 px-2 ml-3 rounded-lg"
        >
          {task.completed ? "Pending" : "Completed"}
        </button>
      </div>
    </div>
  ));

  // TOTAL TASKS LENGTH........................................................................................
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter((task) => task.completed).length;

  const pendingTasks = totalTasks - completedTasks;

  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  //FETCH PROFILE..........................................................................................................
  const fetchProfile = async () => {
    try {
      const response = await api.get("/accounts/profile/");
      console.log("fetching");
      setProfile(response.data);
      console.log(response.data, "success");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  //FETCH TASKS..................................................................................................
  const fetchTasks = async () => {
    try {
      const response = await api.get("/tasks/");

      setTasks(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //DELETE A SPECIFIC TASK API REQUEST.............................................................................
  const deleteTask = async (id) => {
    if (window.confirm("Delete this task?")) {
      try {
        await api.delete(`/tasks/${id}/`);

        fetchTasks();
      } catch (error) {
        console.log(error);
      }
    }
  };

  //TASK STORE IN EDITTASK KNOW WHICH TASK IS CURRENTLY EDITING................................
  const startEdit = (task) => {
    setEditTask(task);

    setTitle(task.title);
    setDescription(task.description);

    editRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    navigate("/");
  };

  //FETCH ON EVERY RENDER..........................................
  React.useEffect(() => {
    fetchProfile();
    fetchTasks();
  }, []);

  return (
    <main className="min-h-screen bg-violet-50 ">
      <header className="md:hidden bg-violet-600 text-white p-4 flex flex-wrap justify-between items-center">
        <div className="flex items-center justify-center gap-2 tracking-tighter font-bold text-2xl mb-4">
          <BlurText
            text="TASKORA"
            delay={200}
            animateBy="letter"
            direction="top"
            className="  text-2xl  "
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
            className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </nav>
      </header>

      <Sidebar />

      {/* WELCOME MESSAGE................................................................................... */}
      <section className=" flex-1  p-4 md:p-8 md:ml-64 ">
        <div className="bg-linear-to-r from-violet-500 to-purple-600 text-white p-6 rounded-xl mb-6">
          <h1 className="text-3xl font-bold">
            Welcome back, {profile?.username}
          </h1>
          <p>Let's get things done today 🚀</p>
        </div>

        {/* TASK TRACKER.................................................................... */}
        <div className="grid md:grid-cols-3 gap-3 mb-8">
          <div className="p-5 bg-linear-to-br from-blue-500 to-blue-700 text-white rounded-xl shadow">
            <p>Total Task</p>
            <h2 className="text-3xl font-bold">{totalTasks}</h2>
          </div>
          <div className="p-5 bg-linear-to-br from-green-500 to-emerald-700 text-white  rounded-xl shadow">
            <p>Completed Tasks</p>
            <h2 className="text-3xl font-bold">{completedTasks}</h2>
          </div>
          <div className="p-5 border border-orange-200 bg-linear-to-br from-orange-500 to-amber-700 text-white rounded-xl shadow">
            <p>Pending Tasks</p>
            <h1 className="text-3xl font-bold">{pendingTasks}</h1>
          </div>
          <div className="bg-gray-200 h-3 md:col-span-3  rounded-full">
            <div
              className="bg-green-500 h-3 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* CREATE NEW TASKS.................................................................................. */}
        <div
          ref={editRef}
          className="mx-auto bg-white shadow rounded-lg p-6 mb-10 "
        >
          <h2 className="text-xl font-semibold mb-4 flex justify-center items-center gap-2 ">
            {editTask ? (
              <>
                <FaEdit className="" />
                Edit Task
              </>
            ) : (
              <>
                <FaTasks className="" />
                Create New Task
              </>
            )}
          </h2>

          <form
            onSubmit={createTask}
            className="mx-auto max-w-md space-y-3 mb-6 flex flex-col  "
          >
            <input
              type="text"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border w-full p-3 rounded-lg focus:outline-none focus:ring-2 ring-violet-500 "
            />

            <textarea
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className="border w-full p-3 rounded-lg focus:outline-none focus:ring-2 ring-violet-500"
            />

            <button
              type="submit"
              className="mx-auto border w-full bg-violet-500 hover:bg-violet-600 hover:translate-y-0.5 active:scale-95 transition-all duration-200 ease-in-out text-white px-4 py-2 rounded-lg font-bold "
            >
              {editTask ? "Update" : "ADD"}
            </button>

            {editTask && (
              <button
                className="bg-red-500 hover:bg-red-600 active:scale-95 hover:translate-y-0.5 transition-all duration-200 ease-in-out py-2 rounded-lg text-white"
                type="button"
                onClick={() => {
                  setDescription("");
                  setEditTask(null);
                  setTitle("");
                }}
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        {totalTasks > 0 && (
          <div className="mb-6 bg-white">
            <input
              type="input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className=" shadow bg-amber-100 rounded-lg p-3 w-full"
              placeholder="🔍 Search tasks..."
            />
          </div>
        )}

        <div className="grid md:grid-cols-2 space-x-2">{alltasks}</div>
        {tasks.length === 0 ? (
          <div className="p-8 shadow rounded-xl text-center">
            NO tasks yet. Create your first task!
          </div>
        ) : (
          filteredTask.length === 0 && (
            <div className="bg-white p-6 rounded-lg text-center shadow">
              No matching tasks found.
            </div>
          )
        )}
      </section>
      <footer className=" mt-auto text-center text-black bg-violet-400 text-sm p-4 md:ml-64  ">
        <p>Taskora v1.0</p>
        <p>Organize • Track • Achieve 🚀</p>
      </footer>
    </main>
  );
}
