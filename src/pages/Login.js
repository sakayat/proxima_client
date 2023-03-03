import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {login,error,loading} = useLogin()

  const handleLogin = async (e) => {
    e.preventDefault();
   await login(email, password)
  };
  return (
    <div className="signup flex flex-col gap-5 py-20 max-w-sm mx-auto">
      <h2 className="text-2xl">Login in your account</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-5">
        <div className="form-control flex flex-col gap-2">
          <label htmlFor="email">Email address</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="outline-none border py-4 px-8 text-black"
            type="email"
            id="email"
            placeholder="azioma@dev"
          />
        </div>
        <div className="form-control flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="outline-none border py-4 px-8 text-black"
            type="password"
            id="password"
            placeholder="password"
          />
        </div>
        {error && (
          <div className="uppercase bg-red-600/30 text-red-400 border border-red-500 p-4">
            {error}
          </div>
        )}
        <button className="uppercase bg-slate-800 text-white py-4">
          login
        </button>
      </form>
    </div>
  );
};

export default Login;
