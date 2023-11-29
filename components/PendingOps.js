
import React from 'react'

export default function PendingOps({operations}) {

    const openStatus = operations.filter(op => op.delivery === 'Pending' || op.payment === 'Pending');

    return (
        <div>
            <h1 className='text-center mt-4'  style={{ color: 'green', fontSize: '20px' }}>Take a look at your pending operations</h1>
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
                        {openStatus?.map(o => (
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


