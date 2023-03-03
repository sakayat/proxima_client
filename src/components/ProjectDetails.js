import React, { useState } from "react";
import { useProjectContext } from "../hooks/useProjectContext";
import { currencyFormatter } from "../utils/currencyFormatter";
import moment from "moment";
import ProjectForm from "./ProjectForm";

const ProjectDetails = ({ project }) => {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isOverlay, setIsOverlay] = useState(false)

  const { dispatch } = useProjectContext();

  const handleDelete = async () => {
    const res = await fetch(
      `http://localhost:5000/api/projects/${project._id}`,
      {
        method: "DELETE",
      }
    );
    const json = await res.json();
    if(res.ok){
      dispatch({
        type: 'DELETE_PROJECT',
        payload: json
      })
    }
  };

  const handleUpdate = async () => {
    setIsModalOpen(true)
    setIsOverlay(true)
  }

  const handleOverlay = () => {
    setIsModalOpen(false)
    setIsOverlay(false)
  }

  return (
    <div className="project-info bg-[#F5EFDF] text-[#111013] w-[30rem] p-4">
      <span className="text-cyan-900">ID: {project._id}</span>
      <h1 className="text-2xl truncate">{project.title}</h1>
      <p className="text-slate-500">{project.tech}</p>
      <div className="flex flex-col gap-2">
        <span>{currencyFormatter(project.budget)}</span>
        <span>
          Added on: {moment(project.createdAt).startOf('hour').fromNow()}
        </span>
        <span>
          Last Update :{project.updatedAt}
        </span>
      </div>
      <div className="button flex gap-5 pt-3">
        <button onClick={handleUpdate} className="bg-slate-800 text-white py-2 px-4">Update</button>
        <button
          onClick={handleDelete}
          className="bg-slate-800 text-white py-2 px-4"
        >
          Delete
        </button>
      </div>
      {/* ovelay */}
      <div onClick={handleOverlay} className={`overlay fixed z-[1] h-screen w-screen bg-slate-900/50 backdrop-blur-sm top-0 left-0 right-0 ${isOverlay ? "" : "hidden"}`}></div>
      {/* modal */}
      <div className={`update-modal fixed z-10 w-[35rem] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#F5EFDF] p-5 ${isModalOpen ? "" : "hidden"}`}>
      <ProjectForm project={project} setIsModalOpen={setIsModalOpen} setIsOverlay={setIsOverlay}/>
      </div>
    </div>
  );
};

export default ProjectDetails;
