import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import Spinner from './Spinner';

export default function OpForm({
    _id,
    transaction: existingTransaction,
    equipo: existingEquipo,
    cliente: existingCliente,
    precio: existingPrecio,
    quantity: existingQuantity,
    delivery: existingDelivery,
    deliveryDate: existingDeliveryDate,
    payment: existingPayment,
    paymentDate: existingPaymentDate,
    detalles: existingDetalles,
    projectID: existingProjectID,
    standar: existingStandar,
    vintage: existingVintage,
    volumen: existingVolumen,
    name: existingName,
    pais:existingPais,
    archivos: existingArchivos,
    relatedProjectID
}) {

    // VALORES DEL PROYECTO SELECCIONADO CUANDO SE VA A HACER UNA NUEVA OPERACION
    const [projectID, setProjectId] = useState(existingProjectID || '');
    const [standar, setStandar] = useState(existingStandar || '');
    const [vintage, setVintage] = useState(existingVintage || '');
    const [volumen, setVolumen] = useState(existingVolumen || '');
    const [pais, setPais] = useState(existingPais || '');
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


    // VALORES VIEJOS DEL FORMULARIO DE OPERACION - CUANDO SE EDITA 
    const [transaction, setTransaction] = useState(existingTransaction || '');
    const [equipo, setEquipo] = useState(existingEquipo || '');
    const [cliente, setCliente] = useState(existingCliente || '');
    const [precio, setPrecio] = useState(existingPrecio || '');
    const [quantity, setQuantity] = useState(existingQuantity || '');
    const [delivery, setDelivery] = useState(existingDelivery || '');
    const [deliveryDate, setDeliveryDate] = useState(existingDeliveryDate || '');
    const [payment, setPayment] = useState(existingPayment || '');
    const [paymentDate, setPaymentDate] = useState(existingPaymentDate || '');
    const [detalles, setDetalles] = useState(existingDetalles || '');
    const [archivos, setArchivos] = useState(existingArchivos || []);

    const router = useRouter();

    const [isUploading, setIsUploading] = useState(false);

    const handleTrasnsaction = (e) => {
        const { value } = e.target;
        const transactionType = value
        if (transactionType === 'Sale') {
            setTransaction('Sale')
        } else if (transactionType === 'Purchase') {
            setTransaction('Purchase')
        }
    }

    const handleDelivery = (e) => {
        const deliver = e.target.value;
        if (deliver === "Pending") {
            setDelivery(deliver)
        } else {
            setDelivery(deliver)
            setDeliveryDate('')
        }
    }

    const handlePayment = (e) => {
        const pay = e.target.value;
        if (pay === "Pending") {
            setPayment(pay)
        } else {
            setPayment(pay)
            setPaymentDate('')
        }
    }
    // Formula para editar el datepicker
    const disablePastDate = () => {
        const today = new Date();
        const dd = String(today.getDate() + 3).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };


    async function newSale(e) {
        e.preventDefault();
        // EDITAR OPERACION  
        if (relatedProjectID) {
            Swal.fire({
                icon: 'warning',
                title: 'Watch out',
                text: 'If you modified the volume of the operation, you must change the inventory to adjust it.',
            })
            try {
                const operation = {
                    transaction,
                    equipo,
                    cliente,
                    precio,
                    quantity,
                    delivery,
                    deliveryDate,
                    payment,
                    paymentDate,
                    proyecto: relatedProjectID,
                    detalles,
                    archivos,
                }
                if (transaction === 'Sale') {
                    // const total = Number(relatedProjectInfo.volumen) - Number(quantity)
                    const data = {
                        projectID: relatedProjectInfo.projectID,
                        standar: relatedProjectInfo.standar,
                        vintage: relatedProjectInfo.vintage,
                        pais: relatedProjectInfo.pais,
                        name: relatedProjectInfo.name,
                    }
                    // le paso el _id de la seleccionado  la parte de operaciones, yy a la parte de proyectos le paso como _id el id relacionado de proyecto
                    await axios.put('/api/projects', { ...data, _id: relatedProjectID });
                    await axios.put('/api/operations', { ...operation, _id });
                }
                else if (transaction === 'Purchase') {
                    // const total = Number(relatedProjectInfo.volumen) + Number(quantity)
                    const data = {
                        projectID: relatedProjectInfo.projectID,
                        standar: relatedProjectInfo.standar,
                        vintage: relatedProjectInfo.vintage,
                        pais: relatedProjectInfo.pais,
                        name: relatedProjectInfo.name,
                    }
                    await axios.put('/api/projects', { ...data, _id: relatedProjectID });
                    await axios.put('/api/operations', { ...operation, _id });

                }
            }
            catch (error) {
                console.log(error)
            }
        } else {
            // NEW OPERATION - el_id que trae es el del proyecto y puede editarlo tranquilamente. 
            try {
                const newOperation = {
                    transaction,
                    equipo,
                    cliente,
                    precio,
                    quantity,
                    delivery,
                    deliveryDate,
                    payment,
                    paymentDate,
                    proyecto: _id,
                    projectData:{idProject:projectID, standardOp:standar, vintageOp:vintage, nameProject:name, countryProject:pais},
                    detalles,
                    archivos
                }
                if (transaction === 'Sale') {
                    const total = Number(volumen) - Number(quantity)
                    const data = {
                        projectID,
                        standar,
                        vintage,
                        pais,
                        volumen: total,
                        name
                    }
                    await axios.put('/api/projects', { ...data, _id });
                    await axios.post('/api/operations', newOperation);

                }
                else if (transaction === 'Purchase') {
                    const total = Number(volumen) + Number(quantity)
                    const data = {
                        projectID,
                        standar,
                        vintage,
                        pais,
                        volumen: total,
                        name
                    }
                    await axios.put('/api/projects', { ...data, _id });
                    await axios.post('/api/operations', newOperation);
                }
            } catch (error) {
                console.log(error)
            }
        }

        const form = e.target;
        form.reset();
        router.push('/operations');

    }


    // CONEXION CON API PARA SUBIR IMAGENES 
    async function uploadFiles(e) {
        e.preventDefault()
        const files = e.target?.files;
        if (files?.length > 0) {
            setIsUploading(true);
            const data = new FormData();
            for (const file of files) {
                data.append('file', file);
            }
            const res = await axios.post('/api/upload', data);
            setArchivos(oldFiles => {
                return [...oldFiles, ...res.data.links];
            });
            setIsUploading(false);
        }
    }

    // solo saco la imagen del array images usando filter, y si el valor link es igual al del click, entonces seteo las imagenes, con la nueva lista
    function deleteFile(e, link) {
        e.preventDefault()
        try {
            Swal.fire({
                title: 'Are you sure?',
                text: `Do you want delete this file?`,
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Si, borrar!',
                confirmButtonColor: '#d55',
                reverseButtons: true,
            }).then(async result => {
                // hacemos console log del result y vemos que opcion es cada una. 
                if (result.isConfirmed) {
                    const newOnesFiles = archivos.filter(value => value !== link)
                    setArchivos(newOnesFiles)
                }
            });

        } catch (error) {
            console.log(error)
        }

    }



    return (
        <div>
            {!relatedProjectID && (
                <div className='shadow-lg   bg-zince-300/10 flex flex-col items-start gap-2 m-3' >
                    <div> {standar} {projectID} {name} - {pais}</div>
                    <div>Vintage: {vintage}</div>
                    <div>Volume available: <b>{volumen}</b> </div>
                </div>
            )}
            {relatedProjectID && (
                <></>
            )}
            <form onSubmit={newSale}>
                <div className='flex-wrap'>
                    <label className='text-gray-400'>Transaction</label>
                    <select
                        className="flex border border-gray-200 py-2 bg-zinc-100/40"
                        value={transaction}
                        onChange={e => handleTrasnsaction(e)}>
                        <option value="">-no selected-</option>
                        <option value="Sale">Sale</option>
                        <option value="Purchase">Purchase</option>
                    </select>
                </div>
                <div className='flex-wrap'>
                    <label className='text-gray-400'>Team</label>
                    <select
                        className="flex border border-gray-200 py-1 bg-zinc-100/40"
                        value={equipo}
                        onChange={e => setEquipo(e.target.value)}>
                        <option value="">-no selected-</option>
                        <option value="Trading">Trading</option>
                        <option value="Corporate">Corporate</option>
                        <option value="Sourcing">Sourcing</option>
                    </select>
                </div>
                <div className='flex-wrap'>
                    <label className='text-gray-400'>Client</label>
                    <select className="flex border border-gray-200 py-1 bg-zinc-100/40" value={cliente} onChange={e => setCliente(e.target.value)}>
                    <option value="">-no selected-</option>
                    {allClients.length > 0 && allClients.map(cli => (
                        <option key={cli._id} value={cli.nombreCliente}>{cli.nombreCliente}</option>
                    ))}
                    </select>
                    {/* <input
                        type='text'
                        placeholder='ej: Green story'
                        value={cliente}
                        onChange={e => setCliente(e.target.value)} /> */}

                </div>
                <div className='flex-wrap'>
                    {transaction === 'Sale' && <label className='text-gray-400'>Sell price (USD)</label>}
                    {transaction === 'Purchase' && <label className='text-gray-400'>Purchase price (USD)</label>}
                    <input
                        type='number'
                        placeholder='ej: 3.20 '
                        value={precio}
                        onChange={e => setPrecio(e.target.value)} />
                </div>
                <div className='flex-wrap'>
                    <label className='text-gray-400'>Volume</label>
                    <input
                        type='number'
                        placeholder='ej: 4512'
                        value={quantity}
                        onChange={e => setQuantity(e.target.value)} />
                </div>
                <div className='flex gap-2'>
                    <div className='flex-wrap'>
                        <label className='text-gray-400'>Delivery Status</label>
                        <select
                            className="flex border border-gray-200 py-1 bg-zinc-100/40"
                            value={delivery}
                            onChange={e => handleDelivery(e)}>
                            <option value="">-no selected-</option>
                            <option value="Pending">Pending</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                    <div>
                        {delivery === "Pending" && (
                            <>
                                <label className='text-gray-400'>Delivery date</label>
                                <input
                                    type='date'
                                    className="flex border border-gray-200 py-1 bg-zinc-100/40"
                                    value={deliveryDate}
                                    min={disablePastDate()}
                                    onChange={e => setDeliveryDate(e.target.value)} />
                            </>
                        )}
                        {delivery === "Done" && (
                            <></>
                        )}
                        {deliveryDate ? (
                            <span>Date set: {new Date(deliveryDate).toLocaleString("GB-English", { dateStyle: "short" })}</span>
                        ) : null}
                    </div>

                </div>
                <div className='flex gap-2'>
                    <div className='flex-wrap'>
                        <label className='text-gray-400'>Payment Status</label>
                        <select
                            className="flex border border-gray-200 py-1 bg-zinc-100/40"
                            value={payment}
                            onChange={e => handlePayment(e)}>
                            <option value="">-no selected-</option>
                            <option value="Pending">Pending</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                    <div>
                        {payment === "Pending" && (
                            <>
                                <label className='text-gray-400'>Payment date</label>
                                <input
                                    type='date'
                                    className="flex border border-gray-200 py-1 bg-zinc-100/40"
                                    value={paymentDate}
                                    min={disablePastDate()}
                                    onChange={e => setPaymentDate(e.target.value)} />
                            </>
                        )}
                        {payment === "Done" && (
                            <></>
                        )}
                        {paymentDate ? (
                            <span>Date set: {new Date(paymentDate).toLocaleString("GB-English", { dateStyle: "short" })}</span>
                        ) : null}
                    </div>
                </div>
                <label className='text-gray-400'>Notes</label>
                <textarea
                    placeholder='ej: creditos de Misha '
                    value={detalles}
                    onChange={e => setDetalles(e.target.value)} />
                <div className='mb-2 flex flex-wrap gap-1 items-center'>
                    {!!archivos?.length && archivos.map(link => (
                        <div key={link} className='flex h-20 bg-white p-4 shadow-sm rounded-sm border border-gray-200'>
                            <a href={link} target='_blank'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                </svg>
                                <span onClick={e => deleteFile(e, link)} className="swym-delete-img">x</span>
                            </a>
                        </div>
                    ))}
                    {isUploading && (
                        <div className="h-24 flex items-center">
                            <Spinner />
                        </div>
                    )}
                    <label className="w-20 h-20 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 rounded-sm bg-white shadow-sm border border text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                        </svg>
                        <div>
                            Upload file
                        </div>
                        <input type="file" onChange={uploadFiles} className="hidden" />
                    </label>
                    {!archivos?.length && (
                        <div className='text-gray-400'> No attached files </div>
                    )}
                </div>
                <button type="submit" className="bg-green-600 text-white px-3 py-1 ms-1 mt-1 rounded shadow-sm hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-400">
                    Save
                </button>
            </form>
        </div>
    )
}
