import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

export default function ReservForm({
    _id,
    customer: existingCustomer,
    team: existingTeam,
    reserveOwn: existingReserveOwn,
    price: existingPrice,
    quantity: existingQuantity,
    status: existingStatus,
    expiration: existingExpiration,
    comments: existingComments,
    projectID: existingProjectID,
    standar: existingStandar,
    vintage: existingVintage,
    volumen: existingVolumen,
    name: existingName,
    relatedProjectID
}) {

    // VALORES DEL PROYECTO SELECCIONADO CUANDO SE VA A HACER UNA NUEVA OPERACION
    const [projectID, setProjectId] = useState(existingProjectID || '');
    const [standar, setStandar] = useState(existingStandar || '');
    const [vintage, setVintage] = useState(existingVintage || '');
    const [volumen, setVolumen] = useState(existingVolumen || '');
    const [name, setName] = useState(existingName || '');

    // DEFINO ESTADO PARA MANJEAR EL PROYECTO RELACIONADO CUANDO EDITO UNA OPERACION 
    const [relatedProjectInfo, setRelatedProjectInfo] = useState('');

    const [allClients, setAllClients] = useState([]);
    // necesito usar useefect para traer los clientes de otro lugar, guardarlas en un estado con useState y poder plasmarlas en el select del project form
    useEffect(() => {
        axios.get('/api/clientes').then(result => {
            setAllClients(result.data.clients);
        })
    }, []);

    // SI HAY UN PROYECTO RELACIONADO, HAGO USE EFECT Y TRAIGO DE LA BASE DE DATOS LA INFO DE ESE PROYECTO 
    useEffect(() => {
        if (!relatedProjectID) {
            return;
        }
        axios.get('/api/projects?id=' + relatedProjectID).then(response => {
            setRelatedProjectInfo(response.data);
        })
    }, [relatedProjectID]);


    // VALORES VIEJOS DEL FORMULARIO DE RESERVA - CUANDO SE EDITA 
    const [customer, setCustomer] = useState(existingCustomer || '');
    const [team, setTeam] = useState(existingTeam || '');
    const [reserveOwn, setReserveOwn] = useState(existingReserveOwn || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [quantity, setQuantity] = useState(existingQuantity || '');
    const [status, setStatus] = useState(existingStatus || '');
    const [expiration, setExpiration] = useState(existingExpiration || '');
    const [comments, setComments] = useState(existingComments || '');

    const router = useRouter();
    // handle errors 
    const [error, setError] = useState("");

    // Formula para editar el datepicker
    const disablePastDate = () => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };

    async function newReserve(e) {
        e.preventDefault();
        if (!customer || !team || !quantity) {
            setError('Important data are missing');
            return;
        }
        // EDITAR OPERACION  
        if (relatedProjectID) {
            Swal.fire({
                icon: 'warning',
                title: 'Atención',
                text: 'Si modificaste el volumen de la reserva deberas ajustar las cantidades manualmente en el inventario.',
            })
            try {
                const reserve = {
                    customer,
                    team,
                    reserveOwn,
                    price,
                    quantity,
                    status,
                    expiration,
                    projectRelated: relatedProjectID,
                    comments,
                }
                const data = {
                    projectID: relatedProjectInfo.projectID,
                    standar: relatedProjectInfo.standar,
                    vintage: relatedProjectInfo.vintage,
                    name: relatedProjectInfo.name,
                }

                await axios.put('/api/projects', { ...data, _id: relatedProjectID });
                await axios.put('/api/reservations', { ...reserve, _id });

            }
            catch (error) {
                console.log(error)
            }
        } else {

            try {
                const newReserve = {
                    customer,
                    team,
                    reserveOwn,
                    price,
                    quantity,
                    status,
                    expiration,
                    projectRelated: _id,
                    comments,
                }
                const total = Number(volumen) - Number(quantity)
                const data = {
                    projectID,
                    standar,
                    vintage,
                    volumen: total,
                    name
                }
                await axios.put('/api/projects', { ...data, _id });
                await axios.post('/api/reservations', newReserve);

            } catch (error) {
                console.log(error)
            }
        }

        const form = e.target;
        form.reset();
        router.push('/reservations');

    }


    return (
        <div>
            {!relatedProjectID && (
                <div className='shadow-lg   bg-zince-300/10 flex flex-col items-start gap-2 m-3' >
                    <div> {standar} {projectID} {name}</div>
                    <div>Vintage: {vintage}</div>
                    <div>Volume available: <b>{volumen}</b> </div>
                </div>
            )}
            {relatedProjectID && (
                <></>
            )}
            <form onSubmit={newReserve}>
                <div className='grid grid-cols-1 md:grid-cols-6 gap-2'>
                    <div>
                        <label className='text-secondary_b'>Team</label>
                        <select
                            value={team}
                            onChange={e => setTeam(e.target.value)}>
                            <option value="">-no selected-</option>
                            <option value="Trading">Trading</option>
                            <option value="Corporate">Corporate</option>
                            <option value="Sourcing">Sourcing</option>
                        </select>
                    </div>
                    <div>
                        <label className='text-secondary_b'>Own</label>
                        <select
                            value={reserveOwn}
                            onChange={e => setReserveOwn(e.target.value)}>
                            <option value="">-no selected-</option>
                            <option value="User1">User1</option>
                            <option value="User2">User2</option>
                            <option value="User3">User3</option>
                        </select>
                    </div>
                </div>
                <div className='flex-wrap'>
                    <label className='text-secondary_b'>Client</label>
                    <select value={customer} onChange={e => setCustomer(e.target.value)}>
                        <option value="">-no selected-</option>
                        {allClients.length > 0 && allClients.map(cli => (
                            <option key={cli._id} value={cli.nombreCliente}>{cli.nombreCliente}</option>
                        ))}
                    </select>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-6 gap-2'>
                    <div >
                        <label className='text-secondary_b'>Reserve price (USD)</label>
                        <input
                            type='number'
                            placeholder='ej: 3.20 '
                            value={price}
                            onChange={e => setPrice(e.target.value)} />
                    </div>
                    <div >
                        <label className='text-secondary_b'>Volume</label>
                        <input
                            type='number'
                            placeholder='ej: 4512'
                            value={quantity}
                            onChange={e => setQuantity(e.target.value)} />
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-6 gap-2'>
                    <div >
                        <label className='text-secondary_b'>Status</label>
                        <select
                            value={status}
                            onChange={e => setStatus(e.target.value)}>
                            <option value="">-no selected-</option>
                            <option value="Underway">Underway</option>
                            <option value="Under negotiation">Under negotiation</option>
                        </select>
                    </div>
                    <div >
                        <label className='text-secondary_b'>Expiration date</label>
                        <input
                            type='date'
                            value={expiration? new Date (expiration).toISOString().slice(0, 10): expiration}
                            min={disablePastDate()}
                            onChange={e => setExpiration(e.target.value)} />
                    </div>
                </div>
                <label className='text-secondary_b'>Comments</label>
                <textarea
                    placeholder='Some text here '
                    value={comments}
                    onChange={e => setComments(e.target.value)} />
                {error && (
                    <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                        {error}
                    </div>
                )}
                <button type="submit" className="bg-secondary text-white px-3 py-1 ms-1 mt-1 rounded shadow-sm hover:bg-secondary/50 focus:outline-none focus:ring focus:ring-primary_b">
                    Save
                </button>
            </form>
        </div>
    )
}

