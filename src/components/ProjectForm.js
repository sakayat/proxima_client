import React, { useState } from "react";
import { useProjectContext } from "../hooks/useProjectContext";

const ProjectForm = () => {
  const [title, setTitle] = useState("");
  const [tech, setTech] = useState("");
  const [budget, setBudget] = useState("");
  const [duration, setDuration] = useState("");
  const [manager, setManager] = useState("");
  const [dev, setDev] = useState("");
  const [error, setError] = useState(null);
  const [emptyFileds, setEmptyFileds] = useState([]);

  const { dispatch } = useProjectContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const projectObj = { title, tech, budget, duration, manager, dev };

    const res = await fetch("http://localhost:5000/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectObj),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      setEmptyFileds(data.emptyFileds);
    }

    console.log(emptyFileds);

    if (res.ok) {
      setTitle("");
      setTech("");
      setBudget("");
      setDuration("");
      setManager("");
      setDev("");
      //setError(null);
      dispatch({
        type: "CREATE_PROJECT",
        payload: data,
      });
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-2xl font-bold">Add a New Projects</h3>
      <form
        onSubmit={handleSubmit}
        className="project-form flex flex-col gap-5"
      >
        <div className="form-control flex flex-col gap-2">
          <label htmlFor="title" className="cursor-pointer">
            Project Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="eg: e-commerce website"
            id="title"
            className={`bg-transparent outline-none border py-4 px-8 ${
              emptyFileds.includes("title") ? "bg-rose-500/25" : "bg-transparent"
            }`}
          />
        </div>
        <div className="form-control flex flex-col gap-2">
          <label htmlFor="tech" className="cursor-pointer">
            Technologies
          </label>
          <input
            value={tech}
            onChange={(e) => setTech(e.target.value)}
            type="text"
            placeholder="eg: nodejs,react,redux etc"
            id="tech"
            className={`bg-transparent outline-none border py-4 px-8 ${
              emptyFileds.includes("tech") ? "bg-rose-500/25" : "bg-transparent"
            }`}
          />
        </div>
        <div className="form-control flex flex-col gap-2">
          <label htmlFor="budget" className="cursor-pointer">
            Budget USD
          </label>
          <input
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            type="number"
            placeholder="eg: 500 USD"
            id="budget"
            className={`bg-transparent outline-none border py-4 px-8 ${
              emptyFileds.includes("budget") ? "bg-rose-500/25" : "bg-transparent"
            }`}
          />
        </div>
        <div className="form-control flex flex-col gap-2">
          <label htmlFor="duration" className="cursor-pointer">
            Duration (in weeks)
          </label>
          <input
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            type="number"
            placeholder="eg: 2 weeks"
            id="duration"
            className={`bg-transparent outline-none border py-4 px-8 ${
              emptyFileds.includes("duration") ? "bg-rose-500/25" : "bg-transparent"
            }`}
          />
        </div>
        <div className="form-control flex flex-col gap-2">
          <label htmlFor="manager" className="cursor-pointer">
            Manager
          </label>
          <input
            value={manager}
            onChange={(e) => setManager(e.target.value)}
            type="text"
            placeholder="eg: arunita"
            id="manager"
            className={`bg-transparent outline-none border py-4 px-8 ${
              emptyFileds.includes("manager") ? "bg-rose-500/25" : "bg-transparent"
            }`}
          />
        </div>
        <div className="form-control flex flex-col gap-2">
          <label htmlFor="developers" className="cursor-pointer">
            Developers
          </label>
          <input
            value={dev}
            onChange={(e) => setDev(e.target.value)}
            type="number"
            placeholder="eg: 5 developers"
            id="developers"
            className={`bg-transparent outline-none border py-4 px-8 ${
              emptyFileds.includes("dev") ? "bg-rose-500/25" : "bg-transparent"
            }`}
          />
        </div>
        <button className="uppercase bg-slate-800 text-white py-4">
          Add a project
        </button>
        {error && (
          <div className="uppercase bg-red-600/30 text-red-400 border border-red-500 p-4">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default ProjectForm;
