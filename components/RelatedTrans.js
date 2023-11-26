import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Spinner from './Spinner';
import Link from 'next/link';
import CustomerData from './CustomerData';

export default function RelatedTrans({
    nombreCliente
}) {

    const [isLoading, setIsLoading] = useState(false);
    const [clientOps, setClientOps] = useState([]);

    useEffect(() => {
        getClientOps();
    }, []);

    const getClientOps = async () => {
        setIsLoading(true)
        try {
            const opers = await axios.get('/api/alloperations')
            setClientOps(opers.data.allOperations);
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }
    // FILTRO LAS OPERACIONES QUE SON DEL NOMBRE IGUAL AL CLIENTE 
    const trasnsRelated = clientOps.filter((op) => !nombreCliente || op.cliente === nombreCliente)


    return (
        <div className='relative overflow-x-auto '>
            {trasnsRelated.length === 0 && (
                <div className='text-center'> This customer has no related operations.</div>
            )}
            <CustomerData trasnsRelated={trasnsRelated}/>
            <table className=" basic my-3">
                <thead>
                    <tr>
                        <td>Date</td>
                        <td>Transaction</td>
                        <td>Team</td>
                        <td>ID-STD</td>
                        <td>Name</td>
                        <td>Vintage</td>
                        <td>Volume</td>
                        <td>Price (USD)</td>
                        <td>Status delivery</td>
                        <td>Status payemnt</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {isLoading && (
                        <tr>
                            <td colSpan={11}>
                                <div className="w-full flex justify-center py-4">
                                    <Spinner />
                                </div>
                            </td>
                        </tr>
                    )}
                    {trasnsRelated?.map(o => (
                        <tr key={o._id}>
                            <td>{(new Date(o.createdAt)).toLocaleString(
                                "GB-English", { dateStyle: "short" }
                            )}
                            </td>
                            <td>{o.transaction}</td>
                            <td>{o.equipo}</td>
                            <td>{o.projectData?.idProject} {o.projectData?.standardOp}</td>
                            <td>{o.projectData?.nameProject}</td>
                            <td>{o.projectData?.vintageOp}</td>
                            <td>{o.quantity}</td>
                            <td>{o.precio}</td>
                            <td>{o.delivery}</td>
                            <td>{o.payment}</td>
                            <td>
                                <div className="flex gap-1">
                                    <Link className="bg-gray-300 text-white px-3 py-1 ms-1 mt-1 rounded shadow-sm hover:bg-gray-200" href={'/operation/edit/' + o._id}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
