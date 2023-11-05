import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react'
import Spinner from './Spinner';
import Swal from 'sweetalert2';

export default function ProjectForm({
    _id,
    projectID: existingProjectID,
    standar: existingStandar,
    vintage: existingVintage,
    volumen: existingVolumen,
    name: existingName,
    projectLink: existingProjectLink,
    tech: existingTech,
    corsia: existingCorsia,
    pais: existingPais,
    disponible: existingDisponible,
    notas: existingNotas,
    files: existingFiles,
}) {

    // creamos los usestate para manejar las variables y los inputs. (los estados pueden tomar el valor, del existente o vacio, en el caso de que toque edit)
    const [projectID, setProjectId] = useState(existingProjectID || '');
    const [standar, setStandar] = useState(existingStandar || '');
    const [vintage, setVintage] = useState(existingVintage || '');
    const [volumen, setVolumen] = useState(existingVolumen || '');
    const [name, setName] = useState(existingName || '');
    const [projectLink, setProjectLink] = useState(existingProjectLink || '');
    const [tech, setTech] = useState(existingTech || '');
    const [corsia, setCorsia] = useState(existingCorsia || '');
    const [pais, setPais] = useState(existingPais || '');
    const [disponible, setDisponible] = useState(existingDisponible || '');
    const [notas, setNotas] = useState(existingNotas || '');
    const [files, setFiles] = useState(existingFiles || []);

    const [isUploading, setIsUploading] = useState(false);
    // handle errors 
    const [error, setError] = useState("");
    const router = useRouter();

    async function saveProject(e) {
        try {
            e.preventDefault();
            const data = { projectID, standar, vintage, volumen, name, projectLink, tech, corsia, pais, disponible, notas, files }

            if (!projectID || !standar || !vintage || !volumen || !tech || !pais || !name) {
                setError('Faltan datos importantes');
                return;
            }
            if (_id) {
                //update
                await axios.put('/api/projects', { ...data, _id });
            } else {
                //create
                const res = await axios.post('/api/projects', data);
            }

            router.push('/inventary');
        } catch (error) {
            console.log(error)
        }
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
            setFiles(oldFiles => {
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
                title: 'Estas seguro?',
                text: `Quiere borrar este archivo?`,
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Si, borrar!',
                confirmButtonColor: '#d55',
                reverseButtons: true,
            }).then(async result => {
                // hacemos console log del result y vemos que opcion es cada una. 
                if (result.isConfirmed) {
                    const newOnesFiles = files.filter(value => value !== link)
                    setFiles(newOnesFiles)
                }
            });

        } catch (error) {
            console.log(error)
        }

    }


    return (
        <div >
            <form onSubmit={saveProject} className='flex grid gap-3 mb-3'>
                <label className='text-gray-400'>Project ID</label>
                <input
                    type='text'
                    placeholder='ej: 6877'
                    value={projectID}
                    onChange={e => setProjectId(e.target.value)} />
                <label className='text-gray-400'>STANDAR</label>
                <select
                    className=" border border-gray-200 py-2 px-6 bg-zinc-100/40"
                    value={standar}
                    onChange={e => setStandar(e.target.value)}>
                    <option value="">-no seleccionado-</option>
                    <option value="CDM">CDM</option>
                    <option value="VCS">VCS</option>
                    <option value="GS">GS</option>
                    <option value="CERCARBONO">CERCARBONO</option>
                    <option value="BIO CARBON">Bio Carbon</option>
                    <option value="PLAN VIVO">Plan Vivo</option>
                    <option value="Otro">Otra</option>
                </select>
                <label className='text-gray-400'>Vintage</label>
                <input
                    type='text'
                    placeholder='ej: 2022'
                    value={vintage}
                    onChange={e => setVintage(e.target.value)} />
                <label className='text-gray-400'>Volumen</label>
                <input
                    type='number'
                    placeholder='ej: 4512'
                    value={volumen}
                    onChange={e => setVolumen(e.target.value)} />
                <label className='text-gray-400'>Nombre del proyecto</label>
                <input
                    type='text'
                    placeholder='ej: piedra larga II'
                    value={name}
                    onChange={e => setName(e.target.value)} />
                <label className='text-gray-400'>Link projecto</label>
                <input
                    type='text'
                    placeholder='ej: https://cdm.unfccc.int/Projects/DB/AENOR1343375362.2/view'
                    value={projectLink}
                    onChange={e => setProjectLink(e.target.value)} />

                <label className='text-gray-400'>TECH</label>
                <select
                    className=" border border-gray-200 py-2 px-6 bg-zinc-100/40"
                    value={tech}
                    onChange={e => setTech(e.target.value)}>
                    <option value="">-no seleccionado-</option>
                    <option value="Wind">Wind</option>
                    <option value="Hydro">Hydro</option>
                    <option value="Small hydro">Small Hydro</option>
                    <option value="Solar">Solar</option>
                    <option value="REDD+">REDD+</option>
                    <option value="REDD">REDD</option>
                    <option value="Methane Recovery">Methane recovery</option>
                    <option value="N20 destrutction">N2O Destruction</option>
                    <option value="Landfill gas">Landfill gas</option>
                    <option value="Run of river">Run of river</option>
                    <option value="IFM">Improved Forest Managment</option>
                    <option value="Mangroves">Mangroeves</option>
                    <option value="ARR">ARR</option>
                    <option value="Cookstove">Solar Cookstove</option>
                    <option value="Biomas">Biomas</option>
                    <option value="Waste">Waste</option>
                </select>
                <label className='text-gray-400'>CORSIA</label>
                <select
                    className=" border border-gray-200 py-2 px-6 bg-zinc-100/40"
                    value={corsia}
                    onChange={e => setCorsia(e.target.value)}>
                    <option value="">-select-</option>
                    <option value="NO">No</option>
                    <option value="SI">Si</option>
                </select>
                <label className='text-gray-400'>PAIS</label>
                <input
                    type='text'
                    placeholder='ej: Mexico'
                    value={pais}
                    onChange={e => setPais(e.target.value)} />
                <label className='text-gray-400'>DISPONIBILIDAD</label>
                <input
                    type='text'
                    placeholder='ej: Spot - noviembre 2024'
                    value={disponible}
                    onChange={e => setDisponible(e.target.value)} />
                <label className='text-gray-400'>Notas</label>
                <textarea
                    placeholder='ej: Proyecto de TD '
                    value={notas}
                    onChange={e => setNotas(e.target.value)} />
                <label className='text-gray-400'>Archivos</label>
                <div className='mb-2 flex flex-wrap gap-1'>
                    {!!files?.length && files.map(link => (
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
                    {!files?.length && (
                        <div className='text-gray-400'> Sin archivos adjuntos </div>
                    )}
                </div>
                <button type="submit" className="bg-green-600 text-white px-3 py-1 ms-1 mt-1 rounded shadow-sm hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-400">
                    Save
                </button>
                {error && (
                    <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                        {error}
                    </div>
                )}
            </form>
        </div >
    )
}