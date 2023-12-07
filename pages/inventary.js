import ExportInventary from "@/components/ExportInventary";
import Spinner from "@/components/Spinner";
import Layout from "@/components/layout";
import isEnableUser from "@/lib/enableUser";
import axios from "axios";
import { useSession } from "next-auth/react";
import { ErrorBoundaryHandler } from "next/dist/client/components/error-boundary";
import Link from "next/link";
import React from 'react';
import { useEffect, useState } from "react";


export default function Projects() {

  const { data: session } = useSession();
  const enable = isEnableUser(session)

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
    <ErrorBoundaryHandler>
      <Layout>
        <div className="flex justify-between content-center">
          {enable === false && (
            <div className="flex justify-end">
              <Link className="bg-gray-300 text-white px-3 py-1 ms-1 mt-1 rounded shadow-sm hover:bg-gray-200" href={'/searchProjects'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </Link>
              <ExportInventary />
            </div>
          )}
          {enable === true && (
            <>
              <Link className="bg-green-600 text-white px-3 py-1 ms-1 mt-1 rounded shadow-sm hover:bg-green-500 " href={'/projects/new'}> New project</Link>
              <div className="flex justify-end">
                <Link className="bg-gray-300 text-white px-3 py-1 ms-1 mt-1 rounded shadow-sm hover:bg-gray-200" href={'/searchProjects'}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </Link>
                <ExportInventary />
              </div>
            </>
          )}
        </div>
        <div className="relative overflow-x-auto">
          <table className="  basic my-3">
            <thead>
              <tr>
                <td>Type</td>
                <td>Supplier</td>
                <td>Name</td>
                <td>Standard</td>
                <td>ID</td>
                <td>Vintage</td>
                <td>Tech</td>
                <td>Country</td>
                <td>Corsia</td>
                <td>Volume</td>
                <td>Trading Price(USD)</td>
                <td>Corp. Price(USD)</td>
                <td>SDG</td>
                <td>Availability</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={14}>
                    <div className="w-full flex justify-center py-4">
                      <Spinner />
                    </div>
                  </td>
                </tr>
              )}
              {projects.map(project => (
                <tr key={project._id}>
                  <td>{project.contrato}
                    {project.contrato === "MKT" ? (
                      <> - ({new Date(project.mktDate).toLocaleString("GB-English", { dateStyle: "short" })}) </>
                    ) : null}
                  </td>
                  <td>{project.proveedor}</td>
                  <td>{project.name}</td>
                  <td>{project.standar}{project.ccb === 'YES' ? (
                    <> CCB </>
                  ) : null}</td>
                  <td>{project.projectID}</td>
                  <td>{project.vintage}</td>
                  <td>{project.tech}</td>
                  <td>{project.pais}</td>
                  <td>{project.corsia}</td>
                  <td>{project.volumen}</td>
                  <td>{project.precioVenta}</td>
                  <td>{project.precioCorp}</td>
                  <td>
                    {project.sdgSelected.map(ods => <React.Fragment key={ods}>{ods}-</React.Fragment>)}
                  </td>
                  <td>{project.disponible}</td>
                  {enable === false && (
                    <></>
                  )}
                  {session.user.email === 'wp.co@allcot.com' && (
                    <td>
                      <Link className="bg-orange-600 text-white px-3  ms-1 mt-1 rounded shadow-sm hover:bg-orange-500" href={'/projects/reservation/' + project._id}>
                        <div className="group relative w-max">
                          <button>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                            </svg>
                          </button>
                          <span className="pointer-events-none absolute -top-7 left-0 w-max rounded bg-gray-900 px-2 py-1 text-sm font-medium text-gray-50 opacity-0 shadow transition-opacity group-hover:opacity-100">
                            Reserve
                          </span>
                        </div>
                      </Link>
                    </td>
                  )}
                  {enable === true &&
                    <td>
                      {/* aca le paso el id del proyecto, y por ende va a editar el volumen con ese id */}
                      <Link className="bg-green-600 text-white px-3 ms-1 mt-1 rounded shadow-sm hover:bg-green-500" href={'/projects/operation/' + project._id}>
                        <div className="group relative w-max">
                          <button>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </button>
                          <span className="pointer-events-none absolute -top-7 left-0 w-max rounded bg-gray-900 px-2 py-1 text-sm font-medium text-gray-50 opacity-0 shadow transition-opacity group-hover:opacity-100">
                            New operation
                          </span>
                        </div>
                      </Link>
                      <Link className="bg-gray-300 text-white px-3  ms-1 mt-1 rounded shadow-sm hover:bg-gray-200" href={'/projects/edit/' + project._id}>
                        <div className="group relative w-max">
                          <button>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                          </button>
                          <span className="pointer-events-none absolute -top-7 left-0 w-max rounded bg-gray-900 px-2 py-1 text-sm font-medium text-gray-50 opacity-0 shadow transition-opacity group-hover:opacity-100">
                            Edit
                          </span>
                        </div>
                      </Link>
                      <Link className="bg-orange-600 text-white px-3  ms-1 mt-1 rounded shadow-sm hover:bg-orange-500" href={'/projects/reservation/' + project._id}>
                        <div className="group relative w-max">
                          <button>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                            </svg>
                          </button>
                          <span className="pointer-events-none absolute -top-7 left-0 w-max rounded bg-gray-900 px-2 py-1 text-sm font-medium text-gray-50 opacity-0 shadow transition-opacity group-hover:opacity-100">
                            Reserve
                          </span>
                        </div>
                      </Link>
                    </td>
                  }

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
    </ErrorBoundaryHandler>
  );
}

