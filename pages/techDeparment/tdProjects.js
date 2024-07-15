import ExportTdProjects from "@/components/ExportTdProjects";
import Spinner from "@/components/Spinner";
import Layout from "@/components/layout";
import { ProjectSearchContext } from "@/context/ProjectSearchContext";
import isEnableUser from "@/lib/enableUser";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from 'react';
import { useEffect, useState } from "react";


export default function TdProjects() {

  const { data: session } = useSession();
  const enable = isEnableUser(session);

  const router = useRouter();

  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [projectFinded, setProjectFinded] = useState([]);

  useEffect(() => {
    getProjects();
  }, [])

  async function getProjects() {
    setIsLoading(true)
    await axios.get('/api/projects').then(res => {
      setProjects(res.data.projects);
      setIsLoading(false)
    })
  }

  // filtro los de TD 
  const projectsTd = projects?.filter(p => p.tdInfo === 'Yes')

  // para el filtro
  const { projectSearched, setProjectSearched } = useContext(ProjectSearchContext);


  useEffect(() => {
    let searchedProjects = [];
    if (projectSearched.length !== '') {

      searchedProjects = projectsTd?.filter((proj) => {
        return proj.name.toLowerCase().includes(projectSearched.toLowerCase()) ||
          proj.projectID.toLowerCase().includes(projectSearched.toLowerCase()) ||
          proj.standar.toLowerCase().includes(projectSearched.toLowerCase()) ||
          proj.vintage.toLowerCase().includes(projectSearched.toLowerCase()) ||
          proj.tech.toLowerCase().includes(projectSearched.toLowerCase()) ||
          proj.sectorTD.toLowerCase().includes(projectSearched.toLowerCase()) ||
          proj.status.toLowerCase().includes(projectSearched.toLowerCase()) ||
          proj.stage.toLowerCase().includes(projectSearched.toLowerCase()) ||
          proj.typeOfcontract?.toLowerCase().includes(projectSearched.toLowerCase()) ||
          proj.tdService?.toLowerCase().includes(projectSearched.toLowerCase()) ||
          proj.pais.toLowerCase().includes(projectSearched.toLowerCase());
      });
      setProjectFinded(searchedProjects);
    }
  }, [projectSearched, projects])


  return (
    <Layout>
      <div className="flex justify-between content-center">
        {enable === false && (
          <div className="flex justify-end">
            <div className="flex justify-start items-center">
              <input
                value={projectSearched}
                className="flex w-96 max-md:w-32"
                onChange={e => setProjectSearched(e.target.value)}
                placeholder='Look up your project by ID, STD, Name...'
                autoFocus />
            </div>
            <Link className="bg-gray-300 text-white px-3 py-1 ms-1 mt-1 rounded shadow-sm hover:bg-gray-200" href={'/searchTdProjects'}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
              </svg>
            </Link>
            <ExportTdProjects />
          </div>
        )}
        {enable === true && (
          <>
            <Link className="bg-green-600 text-white px-3 py-1 ms-1 mt-1 rounded shadow-sm hover:bg-green-500 " href={'/projects/new'}> New project</Link>
            <div className="flex justify-end">
              <div className="flex justify-start items-center">
                <input
                  value={projectSearched}
                  className="flex w-96 max-md:w-32"
                  onChange={e => setProjectSearched(e.target.value)}
                  placeholder='Look up your project by ID, STD, Name...'
                  autoFocus />
              </div>
              <Link className="bg-gray-300 text-white px-3 py-1 ms-1 mt-1 rounded shadow-sm hover:bg-gray-200" href={'/searchTdProjects'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                </svg>
              </Link>
              <ExportTdProjects />
            </div>
          </>
        )}
      </div>
      <div className="relative overflow-x-auto">
        <table className="basic my-3">
          <thead>
            <tr>
              <td>Name</td>
              <td>Sector</td>
              <td>ID</td>
              <td>Tech</td>
              <td>Country</td>
              <td>Standard</td>
              <td>Financial Partner</td>
              <td>Service</td>
              <td>Type of Contract</td>
              <td>Status</td>
              <td>Stage</td>
              <td>Corsia</td>
              <td>Rep Period Start</td>
              <td>Rep Period End</td>
              <td>Actual Data</td>
              <td>Net Volume</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={15}>
                  <div className="w-full flex justify-center py-4">
                    <Spinner />
                  </div>
                </td>
              </tr>
            )}
            {projectFinded.map(project => (
              <tr key={project._id}>
                 <td className="text-xs">{(project.name).slice(0, 25)}</td>
                <td>{project.sectorTD}</td>
                <td>{project.projectID}</td>
                <td>{project.tech}</td>
                <td>{project.pais}</td>
                <td>{project.standar}{project.ccb === 'YES' ? (
                  <span className="text-xs"> CCB </span>
                ) : null}
                  {project.ccp === 'Eligible' ? (
                    <span className="ms-1 border rounded-md bg-gray-300 text-xs"> CCP - Eligible </span>
                  ) : null}</td>
                <td>{project.proveedor}</td>
                <td>{project.tdService}</td>
                <td>{project.typeOfContract}</td>
                <td>{project.status}</td>
                <td>{project.stage}</td>
                <td>{project.corsia}</td>
                <td>{new Date(project.rpStartDate).toLocaleString("GB-English", { dateStyle: "short" })}</td>
                <td>{new Date(project.rpEndDate).toLocaleString("GB-English", { dateStyle: "short" })}</td>
                <td>{project.actualDataVolume}</td>
                <td>{project.netVolume}</td>
                {enable === false && (
                  <></>
                )}
                {enable === true &&
                  <td>
                    <Link className="bg-gray-300 text-white px-1  ms-1 rounded shadow-sm hover:bg-gray-200" href={'/projects/edit/' + project._id}>
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
                  </td>
                }
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}