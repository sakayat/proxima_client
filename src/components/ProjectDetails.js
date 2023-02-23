import React from "react";
import { useParams } from "react-router-dom";
import { useProjectContext } from "../hooks/useProjectContext";
import { currencyFormatter } from "../utils/currencyFormatter";
import moment from "moment";

const ProjectDetails = ({ project }) => {
  const { dispatch } = useProjectContext();

  const handleDelete = async (id) => {
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

  const handleEdit = async () => {
    const res = await fetch(`http://localhost:5000/api/projects/${project._id}`,{
      method: 'UPDATE'
    })
    const json = await res.json()
    if(res.ok){
      dispatch({
        type: 'UPDATE_PROJECT',
        payload: json
      })
    }
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
          Last Update : {moment(project.upatedAt).startOf('day').fromNow()}
        </span>
      </div>
      <div className="button flex gap-5 pt-3">
        <button onClick={handleEdit} className="bg-slate-800 text-white py-2 px-4">Update</button>
        <button
          onClick={handleDelete}
          className="bg-slate-800 text-white py-2 px-4"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProjectDetails;
