
import Layout from '@/components/layout'
import isEnableUser from '@/lib/enableUser';
import { mongooseConnect } from '@/lib/mongoose';
import Operation from '@/models/Operation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export default function SearchOperations({ operations }) {

    const { data: session } = useSession();
    const enable = isEnableUser(session)

    const [operationSearched, setOperationSearched] = useState('');
    const [operationFinded, setOperationFinded] = useState([]);

    const volume = operations.map(p => p.quantity);
    const maxVolume = Math.max(...volume);

    //  Handle for rage button
    const [vol, setVol] = useState(0);


    // Use Effect para el buscador 
    useEffect(() => {
        let searchedoperations = [];
        if (operationSearched.length !== '') {

            searchedoperations = operations.filter((op) => {
                return op.transaction.toLowerCase().includes(operationSearched.toLowerCase()) ||
                    op.cliente.toLowerCase().includes(operationSearched.toLowerCase()) ||
                    op.equipo.toLowerCase().includes(operationSearched.toLowerCase()) ||
                    op.proyecto.projectID.toLowerCase().includes(operationSearched.toLowerCase()) ||
                    op.proyecto.standar.toLowerCase().includes(operationSearched.toLowerCase()) ||
                    op.proyecto.name.toLowerCase().includes(operationSearched.toLowerCase()) ||
                    op.delivery.toLowerCase().includes(operationSearched.toLowerCase()) ||
                    op.payment.toLowerCase().includes(operationSearched.toLowerCase());
            });
            setOperationFinded(searchedoperations);
        }
    }, [operationSearched, operations])


    const filterByMonth = (e) => {
        const selectedMonth = e.target.value;
        if (selectedMonth === 'all') {
            const all = operations.map(op => op);
            setOperationFinded(all)
        } else {
            const filterMonth = operations.filter(op => {
                const itemMonth = new Date(op.createdAt).getMonth() + 1;
                return itemMonth === parseInt(selectedMonth, 10);
            });
            setOperationFinded(filterMonth)
        }
    }

    const filterByTeam = (e) => {
        const team = e.target.value;
        const filterTeam = operations.filter((op) => !team || op.equipo === team);
        setOperationFinded(filterTeam)
    }

    const filterByType = (e) => {
        const type = e.target.value;
        const filterType = operations.filter((op) => !type || op.transaction === type);
        setOperationFinded(filterType)
    }

    const filterByDelivery = (e) => {
        const delivery = e.target.value;
        const filterDelivery = operations.filter((op) => !delivery || op.delivery === delivery);
        setOperationFinded(filterDelivery)
    }

    const filterByPayment = (e) => {
        const payment = e.target.value;
        const filterPayment = operations.filter((op) => !payment || op.payment === payment);
        setOperationFinded(filterPayment)
    }


    const filterByVol = (e) => {
        const vol = e.target.value;
        setVol(vol)
        const filterVol = operations.filter((op) => !vol || op.quantity >= vol);
        setOperationFinded(filterVol)
    }

    return (
        <Layout>
            <div className='flex justify-center m-4'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input
                    value={operationSearched}
                    onChange={e => setOperationSearched(e.target.value)}
                    placeholder='Look up your operation by ID, standar, status, customer...'
                    autoFocus />
            </div>
            <div className='flex flex-wrap gap-2'>
                <label className="m-2" >Create</label>
                <select onChange={(e) => filterByMonth(e)} className="flex w-32" >
                    <option value="all">all</option>
                    <option value="1">Jan</option>
                    <option value="2">Feb</option>
                    <option value="3">Mar</option>
                    <option value="4">Apr</option>
                    <option value="5">May</option>
                    <option value="6">Jun</option>
                    <option value="7">Jul</option>
                    <option value="8">Ago</option>
                    <option value="9">Sep</option>
                    <option value="10">Oct</option>
                    <option value="11">Nov</option>
                    <option value="12">Dic</option>
                </select>
                <label className="m-2" >Transaction</label>
                <select onChange={(e) => filterByType(e)} className="flex w-32" >
                    <option value="">all</option>
                    <option value="Sale">Sale</option>
                    <option value="Purchase">Purchase</option>
                </select>
                <label className="m-2" >Team</label>
                <select onChange={(e) => filterByTeam(e)} className="flex w-32" >
                    <option value="">all</option>
                    <option value="Trading">Trading</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Sourcing">Sourcing</option>
                </select>
                <label className="m-2" >Delivery</label>
                <select onChange={(e) => filterByDelivery(e)} className="flex w-32" >
                    <option value="">all</option>
                    <option value="Pending">Pending</option>
                    <option value="Done">Done</option>
                </select>
                <label className="m-2" >Payment</label>
                <select onChange={(e) => filterByPayment(e)} className="flex w-32" >
                    <option value="">all</option>
                    <option value="Pending">Pending</option>
                    <option value="Done">Done</option>
                </select>
                <div className='flex w-64 items-center'>
                    <label className="m-2">Volume</label>
                    <input className='range_input' type='range' min={0} max={maxVolume} step={50} value={vol} onChange={(e) => filterByVol(e)} />
                    <span className='ms-2' >{vol}</span>
                </div>
            </div>
            <div className=' relative overflow-x-auto'>
                <table className="basic my-3">
                    <thead>
                        <tr>
                            <td>Date</td>
                            <td>Type</td>
                            <td>Team</td>
                            <td>Client</td>
                            <td>Standard</td>
                            <td>ID</td>
                            <td>Project Name</td>
                            <td>Vintage</td>
                            <td>Preice (usd)</td>
                            <td>Volume</td>
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
                                <td>{op.equipo}</td>
                                <td>{op.cliente}</td>
                                <td>{op.projectData?.standardOp}</td>
                                <td>{op.projectData?.idProject}</td>
                                <td>{op.projectData?.nameProject}</td>
                                <td>{op.projectData?.vintageOp}</td>
                                <td>{op.precio}</td>
                                <td>{op.quantity}</td>
                                {op.delivery === 'Done' && <td><b style={{ color: 'green', fontSize: '18px' }} >Done</b> </td>}
                                {op.delivery === 'Pending' && <td> <b style={{ color: 'red' }}> Pending </b> {(new Date(op.deliveryDate)).toLocaleString(
                                    "GB-English", { dateStyle: "short" }
                                )}
                                </td>}
                                {op.payment === 'Done' && <td> <b style={{ color: 'green', fontSize: '18px' }} >Done</b> </td>}
                                {op.payment === 'Pending' && <td> <b style={{ color: 'red' }}> Pending </b> {(new Date(op.paymentDate)).toLocaleString(
                                    "GB-English", { dateStyle: "short" }
                                )}
                                </td>}
                                {enable === false && (
                                    <td>

                                    </td>
                                )}
                                {enable === true && (
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
                                )}
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