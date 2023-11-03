import { trailingSlash } from '@/next.config';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react'

export default function OpForm({
    _id,
    transaction: existingTransaction,
    cliente: existingCliente,
    precio: existingPrecio,
    quantity: existingQuantity,
    delivery: existingDelivery,
    payment: existingPayment,
    detalles: existingDetalles,
    projectID: existingProjectID,
    standar: existingStandar,
    vintage: existingVintage,
    volumen: existingVolumen,
    name: existingName,
    relatedProjectID
}) {


    // VALORES DEL PROYECTO SELECCIONADO CUANDO SE EDITA
    const [projectID, setProjectId] = useState(existingProjectID || '');
    const [standar, setStandar] = useState(existingStandar || '');
    const [vintage, setVintage] = useState(existingVintage || '');
    const [volumen, setVolumen] = useState(existingVolumen || '');
    const [name, setName] = useState(existingName || '');

    // VALORES DEL FORMULARIO DE OPERACION
    const [transaction, setTransaction] = useState(existingTransaction || '');
    const [cliente, setCliente] = useState(existingCliente || '');
    const [precio, setPrecio] = useState(existingPrecio || '');
    const [quantity, setQuantity] = useState(existingQuantity || '');
    const [delivery, setDelivery] = useState(existingDelivery || '');
    const [payment, setPayment] = useState(existingPayment || '');
    const [detalles, setDetalles] = useState(existingDetalles || '');


    const router = useRouter()


    async function newSale(e) {
        e.preventDefault();

        // EDIT 
        if (relatedProjectID) {
            try {
                const operation = {
                    transaction,
                    cliente,
                    precio,
                    quantity,
                    delivery,
                    payment,
                    proyecto: relatedProjectID,
                    detalles,
                }
                if (transaction === 'Venta') {
                    const total = Number(volumen) - Number(quantity)
                    const data = {
                        projectID,
                        standar,
                        vintage,
                        volumen: total,
                        name
                    }
                    // le paso el _id de lo seleccionado, cuando es una vieja, edita la operacion con el ID de la operacion
                    await axios.put('/api/projects', { ...data, _id });
                    await axios.put('/api/operations', { ...operation, _id });
                }
                else if (transaction === 'Compra') {
                    const total = Number(volumen) + Number(quantity)
                    const data = {
                        projectID,
                        standar,
                        vintage,
                        volumen: total,
                        name
                    }
                    await axios.put('/api/projects', { ...data, _id });
                    await axios.put('/api/operations', { ...operation, _id });

                }
                console.log(operation)
                console.log(_id)
            }
            catch (error) {
                console.log(error)
            }
        } else {
            // NEW OPERATION
            try {
                const newOperation = {
                    transaction,
                    cliente,
                    precio,
                    quantity,
                    delivery,
                    payment,
                    proyecto: _id,
                    detalles
                }
                if (transaction === 'Venta') {
                    const total = Number(volumen) - Number(quantity)
                    const data = {
                        projectID,
                        standar,
                        vintage,
                        volumen: total,
                        name
                    }
                    await axios.put('/api/projects', { ...data, _id });
                    await axios.post('/api/operations', newOperation);

                }
                else if (transaction === 'Compra') {
                    const total = Number(volumen) + Number(quantity)
                    const data = {
                        projectID,
                        standar,
                        vintage,
                        volumen: total,
                        name
                    }
                    await axios.put('/api/projects', { ...data, _id });
                    await axios.post('/api/operations', newOperation);
                }
                console.log(newOperation)
            } catch (error) {
                console.log(error)
            }
        }

        const form = e.target;
        form.reset();
        router.push('/inventary');

    }



    return (
        <div>
            <div className='shadow-lg   bg-zince-300/10 flex flex-col items-start gap-2 m-3' >
                <div> {standar} {projectID} {name}</div>
                <div>Vintage: {vintage}</div>
                <div>Volumen disponible: <b>{volumen}</b> </div>
            </div>
            <form onSubmit={newSale}>
                <div className='flex-wrap'>
                    <label className='text-gray-400'>Transacción</label>
                    <select
                        className="flex border border-gray-200 py-2 bg-zinc-100/40"
                        value={transaction}
                        onChange={e => setTransaction(e.target.value)}>
                        <option value="">-no seleccionado-</option>
                        <option value="Venta">VENTA</option>
                        <option value="Compra">COMPRA</option>
                    </select>
                </div>
                <div className='flex-wrap'>
                    <label className='text-gray-400'>Cliente</label>
                    <input
                        type='text'
                        placeholder='ej: Green story'
                        value={cliente}
                        onChange={e => setCliente(e.target.value)} />
                </div>
                <div className='flex-wrap'>
                    <label className='text-gray-400'>Precio de venta (USD)</label>
                    <input
                        type='number'
                        placeholder='ej: 3.20 '
                        value={precio}
                        onChange={e => setPrecio(e.target.value)} />
                </div>
                <div className='flex-wrap'>
                    <label className='text-gray-400'>Volumen</label>
                    <input
                        type='number'
                        placeholder='ej: 4512'
                        value={quantity}
                        onChange={e => setQuantity(e.target.value)} />
                </div>
                <div className='flex-wrap'>
                    <label className='text-gray-400'>Delivery Status</label>
                    <select
                        className="flex border border-gray-200 py-1 bg-zinc-100/40"
                        value={delivery}
                        onChange={e => setDelivery(e.target.value)}>
                        <option value="">-no seleccionado-</option>
                        <option value="Pendiente">Pendiente</option>
                        <option value="Entregado">Entregado</option>
                    </select>
                </div>
                <div className='flex-wrap'>
                    <label className='text-gray-400'>Payment Status</label>
                    <select
                        className="flex border border-gray-200 py-1 bg-zinc-100/40"
                        value={payment}
                        onChange={e => setPayment(e.target.value)}>
                        <option value="">-no seleccionado-</option>
                        <option value="Pendiente">Pendiente</option>
                        <option value="Realizado">Realizado</option>
                    </select>
                </div>
                <label className='text-gray-400'>Notas</label>
                <textarea
                    placeholder='ej: creditos de Misha '
                    value={detalles}
                    onChange={e => setDetalles(e.target.value)} />
                <button type="submit" className="bg-green-600 text-white px-3 py-1 ms-1 mt-1 rounded shadow-sm hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-400">
                    Save
                </button>
            </form>
        </div>
    )
}
