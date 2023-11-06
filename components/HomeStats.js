
import { subHours } from "date-fns";


export default function HomeStats({ operations }) {


    // me fijo en la documentancion de date-fns y puedo hacerlo mas facil
    const operationsToday = operations.filter(op => new Date(op.createdAt) > subHours(new Date, 24));
    const operationsWeek = operations.filter(op => new Date(op.createdAt) > subHours(new Date, 24 * 7));
    const operationsMonth = operations.filter(op => new Date(op.createdAt) > subHours(new Date, 24 * 30));

    const openDelivery = operations.filter(op => op.delivery === 'Pending')
    const openPayment = operations.filter(op => op.payment === 'Pending')
    const operationsClosed = operations.filter(op => op.payment === 'Done' && op.delivery === 'Done')


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
                    <div className="board-desc">You have {openDelivery.length} pending deliveries. </div>
                </div>
                <div className="board-card" >
                    <h3 className="board-title ">Payment</h3>
                    <div className="board-number">{openPayment.length}</div>
                    <div className="board-desc">You have {openPayment.length} pending deliveries.</div>
                </div>
                <div className="board-card" >
                    <h3 className="board-title ">Close Operations</h3>
                    <div className="board-number">{operationsClosed.length}</div>
                    <div className="board-desc">You close {operationsClosed.length} operations.</div>
                </div>
            </div>
            <p className="m-2"><b>Operations</b></p>
            <div className="board-grid">
                <div className="board-card" >
                    <h3 className="board-title ">Today</h3>
                    <div className="board-number">{operationsToday.length}</div>
                    <div className="board-desc">Operations in 24hs.</div>
                </div>
                <div className="board-card" >
                    <h3 className="board-title ">Week</h3>
                    <div className="board-number">{operationsWeek.length}</div>
                    <div className="board-desc">Operations in a week.</div>
                </div>
                <div className="board-card" >
                    <h3 className="board-title ">Month</h3>
                    <div className="board-number">{operationsMonth.length}</div>
                    <div className="board-desc">Operations in the last 30 days.</div>
                </div>
            </div>          
        </div>
    )
}

