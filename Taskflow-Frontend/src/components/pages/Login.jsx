import { Link } from "react-router-dom";
import React from "react";
import api from "../services/api";

import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUserCircle } from "react-icons/fa";
import BlurText from "../motion/BlurText";
import { SiTask } from "react-icons/si";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

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

      navigate("/dashboard");
    } catch (error) {
      console.log(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="min-h-screen grid lg:grid-cols-2 overflow-hidden
     bg-linear-to-br from-violet-600 via-purple-500 to-fuchsia-500"
    >
      <section
        className=" lg:flex flex-col items-center justify-center
       "
      >
        <div className="pt-6 md:pt-3 ">
          <div className="flex items-center justify-center gap-2">
            <BlurText
              text="TASKORA"
              delay={120}
              animateBy="letter"
              direction="top"
              className=" text-white  text-4xl font-bold   "
            />
            <SiTask className="text-2xl text-white" />
          </div>
          <div className=" flex justify-center text-3xl font-semibold mb-4">
            <BlurText
              text="Organized. Track. Deliver."
              delay={180}
              animateBy="words"
              direction="top"
              className=" text-white  text-4xl font-bold   "
            />
          </div>
          <div className="flex justify-center text-lg  text-white/40">
            <BlurText
              text="Manage tasks, collaborate with your team, and stay productive with one powerful workspace."
              delay={200}
              animateBy="word"
              direction="left"
              className="text-center text-lg text-white/40 max-w-md mt-4 leading-7 "
            />
          </div>
        </div>
      </section>

      <section className=" flex  items-center justify-center rounded-t-3xl lg:rounded-none p-2">
        <div className="w-full max-w-md rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-10 shadow-2xl ">
          <p className="text-2xl text-white/90 text-center font-semibold tracking-tighter">
            Sign In
          </p>
          <p className="text-center text-sm text-white/70 mt-1 mb-6">
            Welcome back. Please enter your details.
          </p>

          <form onSubmit={HandleSubmit}>
            <label className="text-sm text-white/70">Username</label>
            <div className="relative mt-1 flex items-center">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full rounded-xl p-3  bg-white/10 border border-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition-all"
              />
              <button
                type="text"
                className=" absolute p-4 right-0   text-white/60 hover:text-white transition text-sm bg-violet-600 rounded-l-none rounded-xl"
              >
                <FaUserCircle />
              </button>
            </div>

            <label className="text-sm text-white/70">Password</label>
            <div className="relative mt-1 flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(p) => setPassword(p.target.value)}
                placeholder="Password"
                className="w-full rounded-xl p-3  bg-white/10 border border-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className=" absolute p-4 right-0 text-white/60 hover:text-white transition text-sm bg-violet-600 rounded-l-none rounded-xl"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl p-3 mt-6 bg-violet-500 text-white font-medium flex justify-center items-center gap-3 hover:bg-violet-600 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing In..." : "Sign In"}
              {loading && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
            </button>
          </form>

          <p className="text-center text-sm text-white/70 mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-violet-300 font-medium hover:text-violet-200  transition"
            >
              {" "}
              sign up
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
