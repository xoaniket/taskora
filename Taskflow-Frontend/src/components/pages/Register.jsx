import { Link } from "react-router-dom";
import React from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Register() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password || !email || !confirmPassword) {
      alert("All fields are required");

      return; //stop function............
    }

    if (password !== confirmPassword) {
      alert("password do not match");
      return;
    }

    try {
      setLoading(true);
      const response = await api.post("/accounts/register/", {
        username,
        email,
        password,
        confirmPassword,
      });

      console.log(response.data);
      setLoading(false);
      alert("Registration Successful!");
      navigate("/");
    } catch (error) {
      console.log(error.response?.data);
      alert("Registration failed");
    }
  };

  return (
    <main
      className="min-h-screen grid lg:grid-cols-2 overflow-hidden
     bg-gradient-to-br from-violet-600 via-purple-500 to-fuchsia-500"
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

      <section className=" flex  items-center justify-center  rounded-t-3xl lg:rounded-t-none">
        <div className="my-1 w-full max-w-md rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-10 shadow-2xl ">
          <p className="text-2xl text-white/90 text-center font-semibold tracking-tighter">
            Sign Up
          </p>
          <p className="text-center text-sm text-white/70 mt-1 mb-6">
            Kudos!!. Please enter your details.
          </p>

          <form className="" onSubmit={handleSubmit}>
            <label className="text-sm text-white/70">Username</label>
            <div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full rounded-xl p-3 mb-4 bg-white/10 border border-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition-all"
              />
              <button
                type="text"
                className=" absolute p-4 translate-y-0.5 left-90 text-white/60 hover:text-white transition text-sm bg-violet-600 rounded-l-none rounded-xl"
              >
                <FaUserCircle />
              </button>
            </div>

            <label className="text-sm text-white/70">Email</label>

            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl p-3 mb-4 bg-white/10 border border-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition-all"
              />

              <button
                type="text"
                className=" absolute p-4 translate-y-0.5 left-90 text-white/60 hover:text-white transition text-sm bg-violet-600 rounded-l-none rounded-xl"
              >
                <MdEmail />
              </button>
            </div>

            <label className="text-sm text-white/70">Password</label>
            <div className="">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(p) => setPassword(p.target.value)}
                placeholder="Password"
                className="w-full rounded-xl p-3 mb-4 bg-white/10 border border-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className=" absolute p-4 translate-y-0.5 left-90 text-white/60 hover:text-white transition text-sm bg-violet-600 rounded-l-none rounded-xl"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <label className="text-sm text-white/70">Confirm Password</label>
            <div className="">
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(p) => setConfirmPassword(p.target.value)}
                placeholder="Password"
                className="w-full rounded-xl p-3 mb-4 bg-white/10 border border-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className=" absolute p-4 translate-y-0.5 left-90 text-white/60 hover:text-white transition text-sm bg-violet-600 rounded-l-none rounded-xl"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl p-3 bg-violet-500 text-white font-medium flex justify-center items-center gap-3 hover:bg-violet-600 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing Up..." : "Sign Up"}
              {loading && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
            </button>
          </form>

          <p className="text-center text-sm text-white/70 mt-6">
            Already registered?{" "}
            <Link
              to="/"
              className="text-violet-300 font-medium hover:text-violet-200  transition"
            >
              {" "}
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
