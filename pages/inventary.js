import Spinner from "@/components/Spinner";
import Layout from "@/components/layout";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function Projects() {

  const [pageNumber, setPageNumber] = useState(0)
  const [projects, setProjects] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

  useEffect(() => {
    setIsLoading(true)
    axios.get(`/api/projects?page=${pageNumber}`).then(response => {
      setProjects(response.data.projects);
      setNumberOfPages(response.data.totalPages);
      setIsLoading(false);
    });
  }, [pageNumber]);

  const gotoPrevious = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const gotoNext = () => {
    setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
  };


  return (

      <Layout>
        <div className="flex justify-between content-center">
          <Link className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2 " href={'/projects/new'}> New project</Link>
          <Link className="bg-gray-300 text-white font-bold cursor-pointer px-4 py-2 rounded-md" href={'/searchProjects'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </Link>
        </div>
        <div className="relative overflow-x-auto">
          <table className="  basic my-3">
            <thead>
              <tr>
                <td>ID</td>
                <td>Standar</td>
                <td>Nombre</td>
                <td>Vintage</td>
                <td>Tech</td>
                <td>Pais</td>
                <td>Corsia</td>
                <td>Volumen</td>
                <td>Disponible</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={9}>
                    <div className="w-full flex justify-center py-4">
                      <Spinner />
                    </div>
                  </td>
                </tr>
              )}
              {projects.map(project => (
                <tr key={project._id}>
                  <td>{project.projectID}</td>
                  <td>{project.standar}</td>
                  <td>{project.name}</td>
                  <td>{project.vintage}</td>
                  <td>{project.tech}</td>
                  <td>{project.pais}</td>
                  <td>{project.corsia}</td>
                  <td>{project.volumen}</td>
                  <td>{project.disponible}</td>
                  <td>
                    {/* aca le paso el id del proyecto, y por ende va a editar el volumen con ese id */}
                    <Link className="bg-green-600 text-white p-2" href={'/projects/operation/' + project._id}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </Link>
                    <Link className="bg-gray-300 text-white p-2" href={'/projects/edit/' + project._id}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      </svg>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex  justify-center py-4 gap-2">
          <button className="bg-gray-300 text-white p-2" onClick={gotoPrevious}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
            </svg>
          </button>
          {pages.map((pageIndex) => (
            <button className="btn-default" key={pageIndex} onClick={() => setPageNumber(pageIndex)}>
              {pageIndex + 1}
            </button>
          ))}
          <button className="bg-gray-300 text-white p-2" onClick={gotoNext}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
        <h1 className="text-center">Page {pageNumber + 1} of {numberOfPages}</h1>
      </Layout>
  );
}

