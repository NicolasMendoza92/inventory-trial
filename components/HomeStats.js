
import { subHours } from "date-fns";


export default function HomeStats({ operations}) {


    // me fijo en la documentancion de date-fns y puedo hacerlo mas facil
    const operationsToday = operations.filter(op => new Date(op.createdAt) > subHours(new Date, 24));
    const operationsWeek = operations.filter(op => new Date(op.createdAt) > subHours(new Date, 24 * 7));
    const operationsMonth = operations.filter(op => new Date(op.createdAt) > subHours(new Date, 24 * 30));

    const openDelivery = operations.filter(op => op.delivery === 'Pending');
    const openPayment = operations.filter(op => op.payment === 'Pending');
    const operationsClosed = operations.filter(op => op.payment === 'Done' && op.delivery === 'Done');

    const salesOp = operations.filter(op => op.transaction === 'Sale');
    const purchaseOp = operations.filter(op => op.transaction === 'Purchase');

    const trading = operations.filter(op => op.equipo === 'Trading');
    const corporate = operations.filter(op => op.equipo === 'Corporate');
    const sourcing = operations.filter(op => op.equipo === 'Sourcing');


    // despues de crear el array con map de los totales, se los suma usnado reduce
    const creditsSold = salesOp.map(o => o.quantity).reduce((count, o) => count + parseFloat(o), 0);
    const creditsPurchased = purchaseOp.map(o => o.quantity).reduce((count, o) => count + parseFloat(o), 0);
    const pendingDelivery = openDelivery.map(o => o.quantity).reduce((count, o) => count + parseFloat(o), 0);


    return (
        <div className="">
            <h1 className="home-stats-titles">Operation Status</h1>
            <div className="board-grid">
                <div className="board-card" >
                    <h3 className="board-title ">Delivery</h3>
                    <div className="board-number">{openDelivery.length}</div>
                    <div className="board-desc">You have {openDelivery.length} pending deliveries. </div>
                </div>
                <div className="board-card" >
                    <h3 className="board-title ">Payment</h3>
                    <div className="board-number">{openPayment.length}</div>
                    <div className="board-desc">You have {openPayment.length} pending payments.</div>
                </div>
                <div className="board-card" >
                    <h3 className="board-title ">Close Operations</h3>
                    <div className="board-number">{operationsClosed.length}</div>
                    <div className="board-desc">You close {operationsClosed.length} operations.</div>
                </div>
            </div>
            <div className="my-3 board-grid">
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
            <h1 className="home-stats-titles">Credits</h1>
            <div className="board-grid">
                <div className="board-card" >
                    <h3 className="board-title ">Credits Sold</h3>
                    <div className="board-number">{creditsSold}</div>
                    <div className="board-desc">in {salesOp.length} operations.</div>
                </div>
                <div className="board-card" >
                    <h3 className="board-title ">Credits purchased</h3>
                    <div className="board-number">{creditsPurchased}</div>
                    <div className="board-desc">in {purchaseOp.length} operations</div>
                </div>
                <div className="board-card" >
                    <h3 className="board-title ">Pending delivery</h3>
                    <div className="board-number">{pendingDelivery}</div>
                    <div className="board-desc">from {openDelivery.length} operations</div>
                </div>
            </div>
        </div>
    )
}

