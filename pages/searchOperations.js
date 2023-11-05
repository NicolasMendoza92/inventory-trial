
import Layout from '@/components/layout'
import { mongooseConnect } from '@/lib/mongoose';
import Operation from '@/models/Operation';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export default function searchProjects({ operations }) {

    const [operationSearched, setOperationSearched] = useState('');
    const [operationFinded, setOperationFinded] = useState([]);

    useEffect(() => {
        let searchedoperations = [];
        if (operationSearched.length !== '') {

            searchedoperations = operations.filter((op) => {
                return op.transaction.toLowerCase().includes(operationSearched.toLowerCase()) ||
                    op.cliente.toLowerCase().includes(operationSearched.toLowerCase()) ||
                    op.proyecto.projectID.toLowerCase().includes(operationSearched.toLowerCase()) ||
                    op.proyecto.standar.toLowerCase().includes(operationSearched.toLowerCase()) ||
                    op.proyecto.name.toLowerCase().includes(operationSearched.toLowerCase()) ||
                    op.delivery.toLowerCase().includes(operationSearched.toLowerCase()) ||
                    op.payment.toLowerCase().includes(operationSearched.toLowerCase());
            });
            setOperationFinded(searchedoperations);
        }
    }, [operationSearched, operations])

    return (
        <Layout>
            <div className='flex justify-center m-4'>
                <input
                    value={operationSearched}
                    onChange={e => setOperationSearched(e.target.value)}
                    placeholder='Busca tu proyecto'
                    autoFocus />
            </div>
            <div className=' relative overflow-x-auto'>
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
                        {operationFinded.map(op => (
                            <tr key={op._id}>
                                <td>{(new Date(op.createdAt)).toLocaleString(
                                    "en-US", { dateStyle: "short" }
                                )}
                                </td>
                                <td>{op.transaction}</td>
                                <td>{op.cliente}</td>
                                <td> {op.proyecto?.standar} {op.proyecto?.projectID} {op.proyecto?.name}</td>
                                <td>{op.precio}</td>
                                <td>{op.quantity}</td>
                                <td>{op.delivery}</td>
                                <td>{op.payment}</td>
                                <td>
                                    {/* aca le paso el id de la operacion para poder traers los datos */}
                                    <Link className="bg-gray-300 text-white p-2" href={'/operation/edit/' + op._id}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                        </svg>
                                    </Link>
                                    <Link className="bg-red-300 text-white p-2" href={'/operation/delete/' + op._id}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}


// TRAIGO LOS PROYECTOS CON GET SERVER SIDE PROPS PARA PODER USARLOS 
export async function getServerSideProps() {
    await mongooseConnect();
    const operations = await Operation.find({}, null, { sort: { '_id': -1 } })
        .populate('proyecto', {
            projectID: 1,
            name: 1,
            standar: 1,
            vintage: 1,
        });

    return {
        props: {
            operations: JSON.parse(JSON.stringify(operations)),

        }
    };
}