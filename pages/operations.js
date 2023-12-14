import ExportOperations from "@/components/ExportOperations";
import Spinner from "@/components/Spinner";
import Layout from "@/components/layout";
import isEnableUser from "@/lib/enableUser";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function Operations() {

  const { data: session } = useSession();
  const enable = isEnableUser(session)

  const router = useRouter();
  function goToLogin() {
    router.push('/login')
  }

  const [operations, setOperations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // states for searcher
  const [operationSearched, setOperationSearched] = useState('');
  const [operationFinded, setOperationFinded] = useState([]);


  useEffect(() => {
    setIsLoading(true)
    axios.get(`/api/operations`).then(result => {
      setOperations(result.data.operationDoc);
      setIsLoading(false);
    });
  }, []);

  // Use Effect para el buscador 
  useEffect(() => {
    let searchedoperations = [];
    if (operationSearched.length !== '') {

      searchedoperations = operations.filter((op) => {
        return op.transaction.toLowerCase().includes(operationSearched.toLowerCase()) ||
          op.cliente.toLowerCase().includes(operationSearched.toLowerCase()) ||
          op.equipo.toLowerCase().includes(operationSearched.toLowerCase()) ||
          op.projectData?.idProject.toLowerCase().includes(operationSearched.toLowerCase()) ||
          op.projectData?.standardOp.toLowerCase().includes(operationSearched.toLowerCase()) ||
          op.projectData?.nameProject.toLowerCase().includes(operationSearched.toLowerCase()) ||
          op.delivery.toLowerCase().includes(operationSearched.toLowerCase()) ||
          op.payment.toLowerCase().includes(operationSearched.toLowerCase());
      });
      setOperationFinded(searchedoperations);
    }
  }, [operationSearched, operations])


  return (
    <Layout>
      {!session &&
        <div className="flex justify-center">
          <div className="shadow-md p-3 bg-zince-300/10 flex items-center gap-2 m-3">
            <h1>You must be logged in to handle the operations</h1>
            <button className="bg-green-600 rounded-lg text-white font-bold px-6 py-2" onClick={goToLogin}> Login </button>
          </div>
        </div>
      }
      {session && (
        <>
          <div className="flex justify-between content-center">
            <ExportOperations />
            <div className="flex justify-end content-center">
              <div className="flex items-center">
                <input
                  className="flex w-96 max-md:w-32"
                  value={operationSearched}
                  onChange={e => setOperationSearched(e.target.value)}
                  placeholder='Look up your operation ...'
                  autoFocus />
              </div>
              <Link className="bg-gray-300 text-white px-3 py-1 ms-1 mt-1 rounded shadow-sm hover:bg-gray-200" href={'/searchOperations'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                </svg>
              </Link>
            </div>
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
                {operationFinded.map(op => (
                  <tr key={op._id}>
                    <td>{(new Date(op.createdAt)).toLocaleString(
                      "GB-English", { dateStyle: "short" }
                    )}
                    </td>
                    <td>{op.transaction}</td>
                    <td>{op.equipo}</td>
                    <td>{op.cliente}</td>
                    <td>{op.projectData?.standardOp}</td>
                    <td>{op.projectData?.idProject}</td>
                    <td>{(op.projectData?.nameProject).slice(0, 25)}</td>
                    <td>{op.projectData?.vintageOp}</td>
                    <td>{op.precio}</td>
                    <td>{op.quantity}</td>
                    {op.delivery === 'Done' &&
                      <td><b style={{ color: 'green', fontSize: '15px' }} >Done</b></td>
                    }
                    {op.delivery === 'Pending' &&
                      <td><b style={{ color: 'red', fontSize: '15px' }} >Pending</b></td>
                    }
                    {op.payment === 'Done' &&
                      <td><b style={{ color: 'green', fontSize: '15px' }} >Done</b></td>
                    }
                    {op.payment === 'Pending' &&
                      <td><b style={{ color: 'red', fontSize: '15px' }} >Pending</b></td>
                    }
                    {enable === false && (
                      <td>

                      </td>
                    )}
                    {enable === true && (
                      <td>
                        {/* aca le paso el id de la operacion para poder traers los datos */}
                        <Link className="bg-gray-300 text-white px-1 ms-1 rounded shadow-sm hover:bg-gray-200" href={'/operation/edit/' + op._id}>
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
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </Layout>
  )
}