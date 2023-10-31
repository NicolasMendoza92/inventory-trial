import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react'
import Swal from 'sweetalert2';

export default function OperationForm({projects}) {


    const [cliente, setCliente] = useState('');
    const [precio, setPrecio] = useState('');
    const [transaction, setTransaction] = useState('');
    const [volumen, setVolumen] = useState('');
    const [proyecto, setProyecto] = useState('');
    const [status, setStatus] = useState('');
    const [payment, setPayment] = useState('');
    const [notas, setNotas] = useState('');

    const router = useRouter();

    async function newOperation(e) {
        try {
            e.preventDefault();
            const data = { cliente, precio, volumen, transaction, proyecto, status, payment, notas }
            console.log(data)
            await axios.post('/api/operations', data);
            // if (_id) {
            //     //update
            //     await axios.put('/api/operations', { ...data, _id });
            // } else {
            //     //create
            //     await axios.post('/api/operations', data);
            // }
            // router.push('/operations');
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div >
            <form onSubmit={newOperation} className=' grid gap-3'>
            <div className='flex-wrap'>
                    <label className='text-gray-400'>Transacción</label>
                    <select
                        className="flex border border-gray-200 py-2 bg-zinc-100/40"
                        value={transaction}
                        onChange={e => setTransaction(e.target.value)}>
                        <option value="">-no seleccionado-</option>
                        <option value="Venta">VENTA</option>
                        <option value="Compra">COMPRA</option>
                        <option value="Reserva">RESERVA</option>
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
                    <label className='text-gray-400'>Proyecto</label>
                    <select
                        className=" flex border border-gray-200 py-1 bg-zinc-100/40"
                        value={proyecto}
                        onChange={e => setProyecto(e.target.value)}>
                        <option value="">-no seleccionado-</option>
                        {projects.length > 0 && projects.map(project => (
                        <option key={project._id} value={project._id}>{project.standar} {project.projectID} - Vintage: {project.vintage}</option>
                    ))}
                    </select>
                </div>
                <div className='flex-wrap'>
                    <label className='text-gray-400'>Precio</label>
                    <input
                        type='text'
                        placeholder='ej: 3.20 USD'
                        value={precio}
                        onChange={e => setPrecio(e.target.value)} />
                </div>
                <div className='flex-wrap'>
                    <label className='text-gray-400'>Volumen</label>
                    <input
                        type='number'
                        placeholder='ej: 4512'
                        value={volumen}
                        onChange={e => setVolumen(e.target.value)} />
                </div>
                <div className='flex-wrap'>
                    <label className='text-gray-400'>Delivery Status</label>
                    <select
                        className="flex border border-gray-200 py-1 bg-zinc-100/40"
                        value={status}
                        onChange={e => setStatus(e.target.value)}>
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
                    placeholder='ej: Mexico'
                    value={notas}
                    onChange={e => setNotas(e.target.value)} />
                <button type="submit" className="bg-green-600 text-white px-3 py-1 ms-1 mt-1 rounded shadow-sm hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-400">
                    Save
                </button>
            </form>
        </div >
    )
}