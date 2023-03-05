import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useProjectContext } from "../hooks/useProjectContext";

const ProjectForm = ({ project, setIsModalOpen, setIsOverlay }) => {
  const [title, setTitle] = useState(project ? project.title : "");
  const [tech, setTech] = useState(project ? project.tech : "");
  const [budget, setBudget] = useState(project ? project.budget : "");
  const [duration, setDuration] = useState(project ? project.duration : "");
  const [manager, setManager] = useState(project ? project.manager : "");
  const [dev, setDev] = useState(project ? project.dev : "");
  const [error, setError] = useState(null);
  const [emptyFiled, setEmptyFiled] = useState([]);

  const { dispatch } = useProjectContext();
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!user){
      setError("You must be logged in");
      return;
    }

    const projectObj = { title, tech, budget, duration, manager, dev };

    // there is no projects

    if (!project) {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(projectObj),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        setEmptyFiled(data.emptyFileds);
      }

      if (res.ok) {
        setTitle("");
        setTech("");
        setBudget("");
        setDuration("");
        setManager("");
        setDev("");
        setError(null);
        dispatch({
          type: "CREATE_PROJECT",
          payload: data,
        });
      }
      return;
    }
    // there is a project

    if (project) {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/projects/${project._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`
          },
          body: JSON.stringify(projectObj),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        setEmptyFiled(data.emptyFileds);
      }

      if (res.ok) {
        setError(null);
        setIsModalOpen(false);
        setIsOverlay(false);
        dispatch({
          type: "UPDATE_PROJECT",
          payload: data,
        });
      }
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-2xl font-bold">
        {project ? "Update a Projects" : "Add a New Projects"}
      </h3>
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
            className={`outline-none border py-4 px-8 ${
              emptyFiled?.includes("title")
                ? "border-red-500 bg-red-700/20"
                : " bg-transparent"
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
            className={`outline-none border py-4 px-8 ${
              emptyFiled?.includes("tech")
                ? "border-red-500 bg-red-700/20"
                : "bg-transparent"
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
            className={`outline-none border py-4 px-8 ${
              emptyFiled?.includes("budget")
                ? "border-red-500 bg-red-700/20"
                : "bg-transparent"
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
            className={`outline-none border py-4 px-8 ${
              emptyFiled?.includes("duration")
                ? "border-red-500 bg-red-700/20"
                : "bg-transparent"
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
            className={`outline-none border py-4 px-8 ${
              emptyFiled?.includes("manager")
                ? "border-red-500 bg-red-700/20"
                : "bg-transparent"
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
            className={`outline-none border py-4 px-8 ${
              emptyFiled?.includes("dev")
                ? "border-red-500 bg-red-700/20"
                : "bg-transparent"
            }`}
          />
        </div>
        <button className="uppercase bg-slate-800 text-white py-4">
          {project ? "Update" : "Add"}
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
