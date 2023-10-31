import Spinner from "@/components/Spinner";
import Layout from "@/components/layout";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

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

  // Borarr operación 
  async function deleteOperation(op) {
    // agrego los botones y opciones segun la libreria sweet
    Swal.fire({
        title: '¿Esta seguro?',
        text: `¿Quiere eliminar la op con el cliente: ${op.cliente}?`,
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, Borrar!',
        confirmButtonColor: '#d55',
        reverseButtons: true,
    }).then(async result => {
        // hacemos console log del result y vemos que opcion es cada una. 
        if (result.isConfirmed) {
            const { _id } = category;
            await axios.delete('/api/operations?_id=' + _id);
            fetchOperations();
        }
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
            {operations.map(op => (
              <tr key={op._id}>
                <td>{op.createdAt}</td>
                <td>{op.transaction}</td>
                <td>{op.cliente}</td>
                <td>{op.proyecto}</td>
                <td>{op.precio}</td>
                <td>{op.quantity}</td>
                <td>{op.status}</td>
                <td>{op.payment}</td>
                <td>
                  <Link className="bg-gray-300 text-white p-2" href={'/operations/edit' + project._id}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                  </Link>
                  <button className="bg-gray-300 text-white p-2" onClick={deleteOperation(op)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}