import React, { useEffect } from "react";
import { useProjectContext } from "../hooks/useProjectContext";
import ProjectDetails from "./ProjectDetails";
import ProjectForm from "./ProjectForm";

const Home = () => {
  const { projects, dispatch } = useProjectContext();

  useEffect(() => {
    const getAllProjects = async () => {
      const res = await fetch("http://localhost:5000/api/projects");
      const data = await res.json();
      if (res.ok) {
        dispatch({
          type: "SET_PROJECT",
          payload: data,
        });
      }
    };
    getAllProjects();
  }, [dispatch]);

  return (
    <div className="home grid lg:grid-cols-6 gap-10">
      <div className="project-wrapper lg:col-span-3 xl:col-span-4">
        <div className="flex flex-wrap gap-10">
          {projects &&
            projects.map((project) => (
              <ProjectDetails key={project._id} project={project} />
            ))}
        </div>
      </div>
      <div className="col-span-1 row-start-1 lg:row-auto lg:col-span-3 xl:col-span-2">
        <ProjectForm />
      </div>
    </div>
  );
};

export default Home;
