import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import Spinner from "./Spinner";
import axios from "axios";

const ExportTdProjects = () => {

  // creo states para guardar todas las operaciones 
  const [allprojects, setAllprojects] = useState([]);

  useEffect(() => {
    getAllProjects();
  }, [])

  function getAllProjects() {
    axios.get('/api/allprojects').then(res => {
      setAllprojects(res.data.projects)
    })
  }

  const [loading, setLoading] = useState(false);

  // filtro los de TD 
  const projectsTd = allprojects?.filter(p => p.tdInfo === 'Yes')

  const handleDownload = () => {
    setLoading(true);
    const table_projects = document.getElementById("my-projects-td");

    const workbook = XLSX.utils.table_to_book(table_projects);
    const worksheet = workbook.Sheets["Sheet1"];
    XLSX.utils.sheet_to_html(worksheet, "Projects");

    setTimeout(() => {
      XLSX.writeFile(workbook, "ProjectsTd.xlsx");
      setLoading(false);
    }, 1000);
  };


  return (
    <>
      {!loading ? (
        <button className="bg-green-600 text-white px-3 py-1 ms-1 mt-1 rounded shadow-sm hover:bg-green-500 " onClick={handleDownload}>
          Export excel
        </button>
      ) : (
        <button disabled>
          <Spinner />
        </button>
      )}
      <div className="hidden">
        <table id="my-projects-td">
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
            </tr>
          </thead>
          <tbody>
            {projectsTd.map(project => (
              <tr key={project._id}>
              <td className="text-xs">{(project.name).slice(0, 25)}</td>
             <td>{project.sector}</td>
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
             <td>{project.typeOfcontract}</td>
             <td>{project.status}</td>
             <td>{project.stage}</td>
             <td>{project.corsia}</td>
             <td>{new Date(project.rpStartDate).toLocaleString("GB-English", { dateStyle: "short" })}</td>
             <td>{new Date(project.rpEndDate).toLocaleString("GB-English", { dateStyle: "short" })}</td>
             <td>{project.actualDataVolume}</td>
             <td>{project.netVolumen}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ExportTdProjects;