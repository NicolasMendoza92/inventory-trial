import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import CountryClient from './CountryClient';

export default function ClientForm({
    _id,
    nombreCliente: existingNombreCliente,
    contacto: existingContacto,
    paisCliente: existingPaisCliente,
    tipoCliente: existingTipoCliente,
    comentarios: existingComentarios,
    mainContact: existingMainContact,
}) {

    const [nombreCliente, setNombreCliente] = useState(existingNombreCliente || '');
    const [contacto, setContacto] = useState(existingContacto || '');
    const [paisCliente, setPaisCliente] = useState(existingPaisCliente || '');
    const [tipoCliente, setTipoCliente] = useState(existingTipoCliente || '');
    const [comentarios, setComentarios] = useState(existingComentarios || '');
    const [mainContact, setMainContact] = useState(existingMainContact || '');

    const router = useRouter();

    async function newClient(e) {
        e.preventDefault();
        try {
            const newClient = {
                nombreCliente,
                contacto,
                paisCliente,
                tipoCliente,
                comentarios,
                mainContact,
            }
            if (_id) {
                //update
                await axios.put('/api/clientes', { ...newClient, _id });
            } else {
                //create
                const res = await axios.post('/api/clientes', newClient);
            }

        } catch (error) {
            console.log(error)
        }
        const form = e.target;
        form.reset();
        router.push('/clients');

    }


    return (
        <div>
            <form onSubmit={newClient}>
                <div className='flex flex-wrap gap-3'>
                    <div className='w-96'>
                        <label className='text-gray-400'>Name</label>
                        <input
                            type='text'
                            placeholder='ej: NE Climate A/S'
                            value={nombreCliente}
                            onChange={e => setNombreCliente(e.target.value)} />
                    </div>
                    <div className='w-96'>
                        <label className='text-gray-400'>Main Contact</label>
                        <input
                            type='text'
                            placeholder='ej: neclimate@gmail.com'
                            value={mainContact}
                            onChange={e => setMainContact(e.target.value)} />
                    </div>
                    <div className='w-96'>
                        <label className='text-gray-400'>Contact</label>
                        <input
                            type='text'
                            placeholder='ej: Lionel Messi '
                            value={contacto}
                            onChange={e => setContacto(e.target.value)} />
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-6 gap-2'>
                    <div>
                        <label className='text-gray-400'>Type</label>
                        <select
                            className="flex border border-gray-200 py-1 bg-zinc-100/40"
                            value={tipoCliente}
                            onChange={e => setTipoCliente(e.target.value)}>
                            <option value="">-no selected-</option>
                            <option value="Trading">Trading</option>
                            <option value="Corporate">Project Owner</option>
                            <option value="Consulting">Consulting</option>
                            <option value="Final">Final</option>
                            <option value="Broker">Broker</option>
                            <option value="Developer">Developer</option>
                            <option value="Investor">Investor</option>
                            <option value="Plataform">Plataform</option>
                        </select>
                    </div>
                    <div>
                        <CountryClient paisCliente={paisCliente} setPaisCliente={setPaisCliente} />
                    </div>
                </div>
                <label className='text-gray-400'>Notas</label>
                <textarea
                    placeholder='ej: account number, SAP ID, more contacts... etc '
                    value={comentarios}
                    onChange={e => setComentarios(e.target.value)} />
                <button type="submit" className="bg-green-600 text-white px-3 py-1 ms-1 mt-1 rounded shadow-sm hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-400">
                    Save
                </button>
            </form>
        </div>
    )
}