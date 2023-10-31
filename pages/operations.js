import Spinner from "@/components/Spinner";
import Layout from "@/components/layout";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function operations() {

  const [operations, setOperations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  // esti actualiza la tabla - es la consulta get a las categorias. 
  useEffect(() => {
    fetchOperations();
  }, [])

  function fetchOperations() {
    setIsLoading(true);
    axios.get('/api/operations').then(result => {
      setOperations(result.data);
      setIsLoading(false);
    });
  }


  return (
    <Layout>
      <div className="flex justify-between content-center">
        <Link className="bg-gray-300 text-white font-bold cursor-pointer px-4 py-2 rounded-md" href={'/searchOperations'}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </Link>
      </div>
      <div>
      <table className="basic my-3">
          <thead>
            <tr>
              <td>Fecha</td>
              <td>Tipo</td>
              <td>Cliente</td>
              <td>Proyecto</td>
              <td>Precio</td>
              <td>Volumen</td>
              <td>Delivery</td>
              <td>Payment</td>
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
            {operations.map(op => (
              <tr key={op._id}>
                <td>{op.createdAt}</td>
                <td>{op.transaction}</td>
                <td>{op.cliente}</td>
                <td>{op.proyecto}</td>
                <td>{op.precio}</td>
                <td>{op.volumen}</td>
                <td>{op.status}</td>
                <td>{op.payment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}