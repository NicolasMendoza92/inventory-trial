
import React, { useEffect, useState } from 'react'

export default function PendingOps({ operations }) {

    const [opsFinded, setOpsFinded] = useState([])

    useEffect(() => {
        getPendingOps();
    }, [operations]);

    const getPendingOps = async () => {
        const openStatus = operations.filter(op => op.delivery === 'Pending' || op.payment === 'Pending');
        setOpsFinded(openStatus)
    }


    const filterByMonthDeli = (e) => {
        const selectDeliMonth = e.target.value;
        if (selectDeliMonth === 'all') {
            getPendingOps()
        } else {
            // Filter data based on the selected month
            const filterDeliMonth = opsFinded.filter(item => {
                const itemMonth = new Date(item.deliveryDate).getMonth() + 1; // Month is zero-based, so add 1
                return itemMonth === parseInt(selectDeliMonth, 10);
            });
            setOpsFinded(filterDeliMonth)
        }

    }

    const filterByMonthPay = (e) => {
        const selectPayMonth = e.target.value;
        if (selectPayMonth === 'all') {
            getPendingOps()
        } else {
            // Filter data based on the selected month
            const filterPayMonth = opsFinded.filter(item => {
                const itemMonth = new Date(item.paymentDate).getMonth() + 1; // Month is zero-based, so add 1
                return itemMonth === parseInt(selectPayMonth, 10);
            });
            setOpsFinded(filterPayMonth)
        }

    }


    return (
        <div>
            <h1 className='text-center mt-4' style={{ color: 'green', fontSize: '20px' }}>Take a look at your pending operations</h1>
            <div className='flex flex-wrap gap-1'>
                <label className="m-2" >Delivery</label>
                <select onChange={(e) => filterByMonthDeli(e)} className="flex w-32" >
                    <option value="all">All</option>
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
                <label className="m-2" >Payment</label>
                <select onChange={(e) => filterByMonthPay(e)} className="flex w-32" >
                    <option value="all">All</option>
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
            </div>
            <div className='relative overflow-x-auto'>
                <table className=" basic  my-3">
                    <thead>
                        <tr>
                            <td>Client</td>
                            <td>Transaction</td>
                            <td>Project</td>
                            <td>Volume</td>
                            <td>Delivery Date</td>
                            <td>Payment Date</td>
                        </tr>
                    </thead>
                    <tbody>
                        {opsFinded?.map(o => (
                            <tr key={o._id}>
                                <td>{o.cliente}</td>
                                <td>{o.transaction}</td>
                                <td>{o.projectData?.idProject} {o.projectData?.standardOp} {o.projectData?.nameProject} {o.projectData?.vintageOp}</td>
                                <td>{o.quantity}</td>
                                {o.delivery === 'Done' && <td><b style={{ color: 'green', fontSize: '18px' }} >Done</b> </td>}
                                {o.delivery === 'Pending' && <td>{(new Date(o.deliveryDate)).toLocaleString(
                                    "GB-English", { dateStyle: "short" }
                                )}
                                </td>}
                                {o.payment === 'Done' && <td> <b style={{ color: 'green', fontSize: '18px' }} >Done</b> </td>}
                                {o.payment === 'Pending' && <td>{(new Date(o.paymentDate)).toLocaleString(
                                    "GB-English", { dateStyle: "short" }
                                )}
                                </td>}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
