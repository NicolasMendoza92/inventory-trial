
import { subHours } from "date-fns";
import { useState } from "react";


export default function HomeStats({ operations }) {

    const [isLoading, setIsLoading] = useState(false)


    // me fijo en la documentancion de date-fns y puedo hacerlo mas facil
    const operationsToday = operations.filter(op => new Date(op.createdAt) > subHours(new Date, 24));
    const operationsWeek = operations.filter(op => new Date(op.createdAt) > subHours(new Date, 24 * 7));
    const operationsMonth = operations.filter(op => new Date(op.createdAt) > subHours(new Date, 24 * 30));

    const openDelivery = operations.filter(op => op.delivery === 'Pendiente')
    const openPayment = operations.filter(op => op.payment === 'Pendiente')
    const operationsClosed = operations.filter(op => op.payment === 'Realizado' && op.delivery === 'Entregado')


    // despues de crear el array con map de los totales, se los suma usnado reduce
    // const revenueDay = operationsToday.map(o => o.total).reduce((count, o) => count + parseFloat(o),0);
    // const revenueWeek = operationsWeek.map(o => o.total).reduce((count, o) => count + parseFloat(o),0);
    // const revenueMonth = operationsMonth.map(o => o.total).reduce((count, o) => count + parseFloat(o),0)


    return (
        <div className="">
            <p className="m-2"><b>Status</b></p>
            <div className="board-grid">
                <div className="board-card" >
                    <h3 className="board-title ">Delivery</h3>
                    <div className="board-number">{openDelivery.length}</div>
                    <div className="board-desc">Tienes {openDelivery.length} entregas pendientes. </div>
                </div>
                <div className="board-card" >
                    <h3 className="board-title ">Payment</h3>
                    <div className="board-number">{openPayment.length}</div>
                    <div className="board-desc">Tienes {openPayment.length} pagos pendientes.</div>
                </div>
                <div className="board-card" >
                    <h3 className="board-title ">Close Operations</h3>
                    <div className="board-number">{operationsClosed.length}</div>
                    <div className="board-desc">Cerraste {operationsClosed.length} operaciones.</div>
                </div>
            </div>
            <p className="m-2"><b>Operaciones</b></p>
            <div className="board-grid">
                <div className="board-card" >
                    <h3 className="board-title ">Hoy</h3>
                    <div className="board-number">{operationsToday.length}</div>
                    <div className="board-desc">Operaciones en el día.</div>
                </div>
                <div className="board-card" >
                    <h3 className="board-title ">Semanal</h3>
                    <div className="board-number">{operationsWeek.length}</div>
                    <div className="board-desc">Operaciones en la semana.</div>
                </div>
                <div className="board-card" >
                    <h3 className="board-title ">Mensual</h3>
                    <div className="board-number">{operationsMonth.length}</div>
                    <div className="board-desc">Operaciones en los últimos 30 días.</div>
                </div>
            </div>          
        </div>
    )
}

