import ExportOperations from "@/components/ExportOperations";
import Spinner from "@/components/Spinner";
import Layout from "@/components/layout";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function operations() {

  const [pageNumber, setPageNumber] = useState(0)
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [operations, setOperations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

  // esti actualiza la tabla - es la consulta get a las categorias. 
  useEffect(() => {
    fetchOperations();
  }, [])

  function fetchOperations() {
    setIsLoading(true);
    axios.get(`/api/operations?page=${pageNumber}`).then(result => {
      setOperations(result.data.operationDoc);
      setNumberOfPages(result.data.totalPages);
      setIsLoading(false);
    });
  }

  const gotoPrevious = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const gotoNext = () => {
    setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
  };


  return (
    <Layout>
      <div className="flex justify-between content-center">
        <ExportOperations />
        <Link className="bg-gray-300 text-white px-3 py-1 ms-1 mt-1 rounded shadow-sm hover:bg-gray-200" href={'/searchOperations'}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </Link>
      </div>
      <div className="relative overflow-x-auto">
        <table className=" basic my-3">
          <thead>
            <tr>
              <td>Date</td>
              <td>Type</td>
              <td>Team</td>
              <td>Client</td>
              <td>Standard</td>
              <td>ID</td>
              <td>Project name</td>
              <td>Vintage</td>
              <td>Price</td>
              <td>Volume</td>
              <td>Delivery</td>
              <td>Payment</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={13}>
                  <div className="w-full flex justify-center py-4">
                    <Spinner />
                  </div>
                </td>
              </tr>
            )}
            {operations.map(op => (
              <tr key={op._id}>
                <td>{(new Date(op.createdAt)).toLocaleString(
                  "en-US", { dateStyle: "short" }
                )}
                </td>
                <td>{op.transaction}</td>
                <td>{op.equipo}</td>
                <td>{op.cliente}</td>
                <td> {op.proyecto?.standar}</td>
                <td>{op.proyecto?.projectID}</td>
                <td>{op.proyecto?.name}</td>
                <td>{op.proyecto?.vintage}</td>
                <td>{op.precio}</td>
                <td>{op.quantity}</td>
                <td>{op.delivery}</td>
                <td>{op.payment}</td>
                <td>
                  {/* aca le paso el id de la operacion para poder traers los datos */}
                  <Link className="bg-gray-300 text-white px-3  ms-1 mt-1 rounded shadow-sm hover:bg-gray-200" href={'/operation/edit/' + op._id}>
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
                  <Link className="bg-red-300 text-white px-3  ms-1 mt-1 rounded shadow-sm hover:bg-red-200" href={'/operation/delete/' + op._id}>
                    <div className="group relative w-max">
                      <button>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                      <span className="pointer-events-none absolute -top-7 left-0 w-max rounded bg-gray-900 px-2 py-1 text-sm font-medium text-gray-50 opacity-0 shadow transition-opacity group-hover:opacity-100">
                        Delete
                      </span>
                    </div>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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
      </div>
    </Layout>
  )
}