import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import Spinner from "./Spinner";
import axios from "axios";

const ExportInventary = () => {

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

  const handleDownload = () => {
    setLoading(true);

    const libro = XLSX.utils.book_new();

    const hoja = XLSX.utils.json_to_sheet(allprojects);

    XLSX.utils.book_append_sheet(libro, hoja, "Projects");

    setTimeout(() => {
      XLSX.writeFile(libro, "ProjectsDefault.xlsx");
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
        <button  disabled>
          <Spinner/>
          <span> Exporting...</span>
        </button>
      )}
    </>
  );
};

export default ExportInventary;