import { Link } from "react-router-dom";
import React from "react";
import api from "../services/api";

import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  //Handle logon credentianls..............................................
  const HandleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("All fields are required");
      return; //stop function............
    }

    try {
      setLoading(true);
      //djnago API call..................................
      const response = await api.post("/accounts/login/", {
        username: username,
        password,
      });

      localStorage.setItem("accessToken", response.data.access);

      localStorage.setItem("refreshToken", response.data.refresh);

      console.log("Login Successful", response.data, response.data.access);
      navigate("/dashboard");
    } catch (error) {
      console.log(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="min-h-screen grid lg:grid-cols-2 
     bg-violet-500"
    >
      <section
        className=" lg:flex flex-col items-center justify-center
       "
      >
        <h1 className="text-center text-5xl font-bold mb-6 text-amber-200">
          Taskora
        </h1>
        <h2 className=" text-center text-3xl font-semibold mb-4">
          Organized. Track. Deliver.
        </h2>
        <p className="text-center text-lg  text-white/40">
          Manage tasks, collaborate with your team, and stay productive with one
          powerful workspace.
        </p>
      </section>

      <section className=" flex  items-center justify-center bg-fuchsia-100 rounded-t-3xl lg:rounded-t-none">
        <div className=" w-full max-w-md  rounded-3xl bg p-8 shadow-2xl bg-white/20 backdrop-blur-3xl">
          <p className="text-3xl text-violet-500 text-center font-semibold tracking-tighter">
            Sign In
          </p>

          <form onSubmit={HandleSubmit}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full border rounded-lg p-3 mb-4 mt-4
               focus:outline-none focus:ring-2 focus:ring-violet-500"
            />

            <input
              type="password"
              value={password}
              onChange={(p) => setPassword(p.target.value)}
              placeholder="Password"
              className="w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full border rounded-lg p-3 bg-violet-500 text-white flex justify-center items-center gap-2"
            >
              {loading ? "Signing In..." : "Sign In"}
              {loading && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
            </button>
          </form>

          <p>
            Don't have an acount?{" "}
            <Link to="/register" className="text-violet-500 font-medium">
              {" "}
              sign up
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
