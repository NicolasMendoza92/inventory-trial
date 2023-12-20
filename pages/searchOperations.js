
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

    const [operationFinded, setOperationFinded] = useState(operations);

    const volume = operations.map(p => p.quantity);
    const maxVolume = Math.max(...volume);

    //  Handle for selected buttons 
    const [vol, setVol] = useState(0);
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedDelivery, setSelectedDelivery] = useState('');
    const [selectedPayment, setSelectedPayment] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedTeam, setSelectedTeam] = useState('');

    const handleYearChange = e => {
        const year = parseInt(e.target.value, 10);
        setSelectedYear(year);
    };

    const handleMonthChange = e => {
        const month = parseInt(e.target.value, 10);
        setSelectedMonth(month);
    };

    useEffect(() => {
        // Filter data based on selectedYear and selectedMonth
        const filteredResults = operations.filter(item => {
            const itemDate = new Date(item.createdAt);
            const itemYear = itemDate.getFullYear();
            const itemMonth = itemDate.getMonth() + 1; // Months are zero-based

            return (
                (!selectedYear || itemYear === selectedYear) &&
                (!selectedMonth || itemMonth === selectedMonth)
            );
        });

        setOperationFinded(filteredResults);
    }, [selectedYear, selectedMonth]);

    
    useEffect(() => {
        const filteredByDelivery = operations.filter(item => !selectedDelivery || item.delivery === selectedDelivery);
        const filteredByPayment = filteredByDelivery.filter(item => !selectedPayment || item.payment === selectedPayment);
        const filteredByType = filteredByPayment.filter(item => !selectedType || item.transaction === selectedType);
        const filteredByTeam = filteredByType.filter(item => !selectedTeam || item.equipo === selectedTeam);
        setOperationFinded(filteredByTeam)
    }, [selectedDelivery, selectedPayment, selectedType, selectedTeam])

    const filterByVol = (e) => {
        const vol = e.target.value;
        setVol(vol)
        const filterVol = operations.filter((op) => !vol || op.quantity >= vol);
        setOperationFinded(filterVol)
    }


    return (
        <Layout>
             <div className='flex flex-wrap gap-2'>
                <label className="m-2" >Year</label>
                <select value={selectedYear || ''} onChange={handleYearChange} className="flex w-32" >
                    <option value="">All</option>
                    <option value={2023}>2023</option>
                    <option value={2024}>2024</option>
                </select>
                <label className="m-2" >Month</label>
                <select value={selectedMonth || ''} onChange={handleMonthChange} className="flex w-32" >
                    <option value="">All</option>
                    <option value={1}>Jan</option>
                    <option value={2}>Feb</option>
                    <option value={3}>Mar</option>
                    <option value={4}>Apr</option>
                    <option value={5}>May</option>
                    <option value={6}>Jun</option>
                    <option value={7}>Jul</option>
                    <option value={8}>Ago</option>
                    <option value={9}>Sep</option>
                    <option value={10}>Oct</option>
                    <option value={11}>Nov</option>
                    <option value={12}>Dic</option>
                </select>
                <label className="m-2" >Transaction</label>
                <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="flex w-32" >
                    <option value="">All</option>
                    <option value="Sale">Sale</option>
                    <option value="Purchase">Purchase</option>
                </select>
                <label className="m-2" >Team</label>
                <select value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)} className="flex w-32" >
                    <option value="">All</option>
                    <option value="Trading">Trading</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Sourcing">Sourcing</option>
                </select>
                <label className="m-2" >Delivery</label>
                <select value={selectedDelivery} onChange={(e) => setSelectedDelivery(e.target.value)} className="flex w-32" >
                    <option value="">All</option>
                    <option value="Pending">Pending</option>
                    <option value="Done">Done</option>
                </select>
                <label className="m-2" >Payment</label>
                <select value={selectedPayment} onChange={(e) => setSelectedPayment(e.target.value)} className="flex w-32" >
                    <option value="">All</option>
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
                                {/* {op.delivery === 'Done' && <td><b style={{ color: 'green', fontSize: '18px' }} >Done</b> </td>}
                                {op.delivery === 'Pending' && <td> <b style={{ color: 'red' }}> Pending </b> {(new Date(op.deliveryDate)).toLocaleString(
                                    "GB-English", { dateStyle: "short" }
                                )}
                                </td>}
                                {op.payment === 'Done' && <td> <b style={{ color: 'green', fontSize: '18px' }} >Done</b> </td>}
                                {op.payment === 'Pending' && <td> <b style={{ color: 'red' }}> Pending </b> {(new Date(op.paymentDate)).toLocaleString(
                                    "GB-English", { dateStyle: "short" }
                                )}
                                </td>} */}
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