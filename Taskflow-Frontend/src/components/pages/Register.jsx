import { Link } from "react-router-dom";
import React from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [email, setEmail] = React.useState("");

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
      const response = await api.post("/accounts/register/", {
        username,
        email,
        password,
        confirmPassword,
      });

      console.log(response.data);

      alert("Registration Successful!");
      navigate("/");
    } catch (error) {
      console.log(error.response?.data);
      alert("Registration failed");
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
            Sign Up
          </p>

          <form className="mt-1" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border rounded-lg p-3 mb-4 mt-4
               focus:outline-none focus:ring-2 focus:ring-violet-500"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg p-3 mb-4 
               focus:outline-none focus:ring-2 focus:ring-violet-500"
            />

            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />

            <input
              type="password"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border rounded-lg p-3 mb-4 
               focus:outline-none focus:ring-2 focus:ring-violet-500"
            />

            <button className="w-full border rounded-lg p-3 bg-violet-500 text-white">
              Sign Up
            </button>
          </form>

          <p>
            Already registered?{" "}
            <Link to="/" className="text-violet-500 font-medium ">
              {" "}
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
