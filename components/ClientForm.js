import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import CountryClient from './CountryClient';
import Swal from 'sweetalert2';
import Spinner from './Spinner';

export default function ClientForm({
    _id,
    nombreCliente: existingNombreCliente,
    contacto: existingContacto,
    paisCliente: existingPaisCliente,
    tipoCliente: existingTipoCliente,
    comentarios: existingComentarios,
    mainContact: existingMainContact,
    division: existingDivision,
}) {

    // handle errors 
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [nombreCliente, setNombreCliente] = useState(existingNombreCliente || '');
    const [contacto, setContacto] = useState(existingContacto || '');
    const [paisCliente, setPaisCliente] = useState(existingPaisCliente || '');
    const [tipoCliente, setTipoCliente] = useState(existingTipoCliente || '');
    const [comentarios, setComentarios] = useState(existingComentarios || '');
    const [mainContact, setMainContact] = useState(existingMainContact || '');
    const [division, setDivision] = useState(existingDivision || '');

    const router = useRouter();

    async function newClient(e) {
        e.preventDefault();
        if (!nombreCliente) {
            setError('Complete the fields');
            return;
        }

        try {
            setIsLoading(true);
            const newClient = {
                nombreCliente,
                contacto,
                paisCliente,
                tipoCliente,
                comentarios,
                mainContact,
                division,
            }
            if (_id) {
                //update
                await axios.put('/api/clientes', { ...newClient, _id });
                const form = e.target;
                form.reset();
                router.push('/clients');
                setIsLoading(false);
            } else {
                //create
                const res = await axios.post('/api/clientes', newClient);
                const clientfind = res.data.clientfind;
                if (clientfind) {
                    Swal.fire({
                        title: "Oops",
                        text: "Customer already has exists",
                        icon: "warning"
                    });
                    setError('There is already a customer with this name')
                    setIsLoading(false);
                } else {
                    Swal.fire({
                        title: "Great",
                        text: "Customer create correctly",
                        icon: "success"
                    });
                    const form = e.target;
                    form.reset();
                    router.push('/clients');
                    setIsLoading(false);
                }

            }
        } catch (error) {
            console.log(error)
        }

    }


    return (
        <div>
            <form onSubmit={newClient}>
                <div className='flex flex-wrap gap-3'>
                    <div className='w-96'>
                        <label className='text-secondary_b'>Name</label>
                        <input
                            type='text'
                            placeholder='ej: NE Climate A/S'
                            value={nombreCliente}
                            onChange={e => setNombreCliente(e.target.value)} />
                    </div>
                    <div className='w-96'>
                        <label className='text-secondary_b'>Name Contact</label>
                        <input
                            type='text'
                            placeholder='ej: Jhon Doe'
                            value={mainContact}
                            onChange={e => setMainContact(e.target.value)} />
                    </div>
                    <div className='w-96'>
                        <label className='text-secondary_b'>Email Contact</label>
                        <input
                            type='text'
                            placeholder='ej: jhon@mail.com '
                            value={contacto}
                            onChange={e => setContacto(e.target.value)} />
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-6 gap-2'>
                    <div>
                        <label className='text-secondary_b'>Type</label>
                        <select
                            value={tipoCliente}
                            onChange={e => setTipoCliente(e.target.value)}>
                            <option value="">-no selected-</option>
                            <option value="Trading">Trading</option>
                            <option value="Project Owner">Project Owner</option>
                            <option value="Consulting">Consulting</option>
                            <option value="Final">Final</option>
                            <option value="Broker">Broker</option>
                            <option value="Developer">Developer</option>
                            <option value="Investor">Investor</option>
                            <option value="Plataform">Plataform</option>
                        </select>
                    </div>
                    <div>
                        <label className='text-secondary_b'>Division</label>
                        <select
                            value={division}
                            onChange={e => setDivision(e.target.value)}>
                            <option value="">-no selected-</option>
                            <option value="Trading">Trading</option>
                            <option value="Corporate">Corporate</option>
                            <option value="Sourcing">Sourcing</option>
                            <option value="BD">BD</option>
                        </select>
                    </div>
                    <div>
                        <CountryClient paisCliente={paisCliente} setPaisCliente={setPaisCliente} />
                    </div>
                </div>
                <label className='text-secondary_b'>Notas</label>
                <textarea
                    placeholder='ej: account number, SAP ID, more contacts... etc '
                    value={comentarios}
                    onChange={e => setComentarios(e.target.value)} />
                {error && (
                    <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                        {error}
                    </div>
                )}
                <button type="submit" className="bg-secondary text-white px-3 py-1 ms-1 mt-1 rounded shadow-sm hover:bg-secondary/50 focus:outline-none focus:ring focus:ring-primary_b">
                    Save
                </button>
                {isLoading && (
                    <div className="flex flex-col justify-center">
                        <h1 className='text-2xl text-white'>Consultando disponibilidad</h1>
                        <Spinner />
                    </div>
                )}
            </form>
        </div>
    )
}