

export default function CustomerData({ trasnsRelated }) {

    const openDelivery = trasnsRelated.filter(op => op.delivery === 'Pending');
    const openPayment = trasnsRelated.filter(op => op.payment === 'Pending');
    const operationsClosed = trasnsRelated.filter(op => op.payment === 'Done' && op.delivery === 'Done');

    const salesOp = trasnsRelated.filter(op => op.transaction === 'Sale');
    const purchaseOp = trasnsRelated.filter(op => op.transaction === 'Purchase');

    // despues de crear el array con map de los totales, se los suma usnado reduce
    const creditsSold = salesOp.map(o => o.quantity).reduce((count, o) => count + parseFloat(o), 0);
    const creditsPurchased = purchaseOp.map(o => o.quantity).reduce((count, o) => count + parseFloat(o), 0);


    return (
        <div className="">
             <h1>Status</h1>
            <div className="board-grid">
                    <div className="square-client">Have <b>{openDelivery.length}</b> pending deliveries. </div>
                    <div className="square-client">Have <b>{openPayment.length}</b> pending payments.</div>
                    <div className="square-client">Operations closed: <b>{operationsClosed.length}</b></div>
            </div>
            <h1>Data of interest</h1>
            <div className="board-grid">
                    <div className="square-client">Sales: <b>{creditsSold}</b> credits in <b>{salesOp.length}</b> operations.</div>
                    <div className="square-client">Purchase: <b>{creditsPurchased}</b> credits in <b>{purchaseOp.length}</b> operations</div>
                    <div className="square-client">Total Transactions: <b>{trasnsRelated.length}</b></div>
            </div>
        </div>
    )
}

