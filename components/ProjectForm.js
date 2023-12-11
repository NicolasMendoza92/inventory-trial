import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react'
import Spinner from './Spinner';
import Swal from 'sweetalert2';
import ArrowUp from './ArrowUp';
import ArrowDown from './ArrowDown';
import { sdgList } from './SdgOptions';
import SdgSelected from './SdgSelected';
import CountryPFSelect from './CountryPFSelect';


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
    sdg: existingSdg,
    pais: existingPais,
    disponible: existingDisponible,
    precioVenta: existingPrecioVenta,
    precioCorp: existingPrecioCorp,
    floorPrice: existingFloorPrice,
    contrato: existingContrato,
    mktDate: existingMktDate,
    proveedor: existingProveedor,
    sede: existingSede,
    notas: existingNotas,
    ccb: existingCcb,
    colombianTax: existingColombianTax,
    sdgSelected: existingSdgSelected,
    sdgImages: existingSdgImages,
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
    const [sdg, setSdg] = useState(existingSdg || '');
    const [pais, setPais] = useState(existingPais || '');
    const [disponible, setDisponible] = useState(existingDisponible || '');
    const [precioVenta, setPrecioVenta] = useState(existingPrecioVenta || '');
    const [precioCorp, setPrecioCorp] = useState(existingPrecioCorp || '');
    const [floorPrice, setFloorPrice] = useState(existingFloorPrice || '');
    const [contrato, setContrato] = useState(existingContrato || '');
    const [mktDate, setMktDate] = useState(existingMktDate || '');
    const [proveedor, setProveedor] = useState(existingProveedor || '');
    const [ccb, setCcb] = useState(existingCcb || '');
    const [colombianTax, setColombianTax] = useState(existingColombianTax || '');
    const [sede, setSede] = useState(existingSede || '');
    const [notas, setNotas] = useState(existingNotas || '');
    const [files, setFiles] = useState(existingFiles || []);
    // SDG states to handle 
    const [sdgSelected, setSdgSelected] = useState(existingSdgSelected || []);
    const [sdgImages, setSdgImages] = useState(existingSdgImages || []);
    const [checkedState, setCheckedState] = useState(
        new Array(sdgList.length).fill(false)
    );

    const [isUploading, setIsUploading] = useState(false);

    // Modal y estados para mostrar SDGs
    const [showModal, setShowModal] = useState(false);
    const showAllSdg = (e) => {
        e.preventDefault(e);
        setShowModal(prev => !prev);
    }

    // handle errors 
    const [error, setError] = useState("");
    const router = useRouter();

    async function saveProject(e) {
        try {
            e.preventDefault();
            const data = { projectID, standar, vintage, volumen, name, projectLink, tech, corsia, sdg, sede, sdgSelected, sdgImages, pais, disponible, precioVenta, precioCorp, floorPrice, contrato, mktDate, proveedor, ccb, colombianTax, notas, files }

            if (!projectID || !standar || !vintage || !volumen || !tech || !pais || !name) {
                setError('Important data are missing');
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

    const handleChangeSdg = (e, position) => {
        const { value, checked } = e.target;
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        )
        if (checked) {
            setSdgSelected([...sdgSelected, value])
        } else {
            setSdgSelected(sdgSelected.filter(sdg => sdg !== value))
        }
        setCheckedState(updatedCheckedState);

        const selectedSdgImg = []
        updatedCheckedState.map((currentState, index) => {
            if (currentState === true) {
                const images = sdgList[index].img;
                selectedSdgImg.push(images)
            }
        })
        setSdgImages(selectedSdgImg)
    }

    const hanldeSdg = (e) => {
        const ods = e.target.value;
        if (ods === "NO" || ods === "N/A") {
            setSdgImages([]);
            setSdgSelected([]);
            setSdg(ods)
        } else {
            setSdg(ods)
        }
    }

    const hanldeContrato = (e) => {
        const contrato = e.target.value;
        if (contrato === "MKT") {
            setContrato(contrato)
        } else {
            setContrato(contrato)
            setMktDate('')
        }
    }

    // Formula para editar el datepicker
    const disablePastDate = () => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };


    return (
        <div >
            <form onSubmit={saveProject} className='flex grid gap-3 mb-3'>
                <label className='text-gray-400'>Supplier</label>
                <input
                    type='text'
                    placeholder='Ej: ALLCOT - Misha'
                    value={proveedor}
                    onChange={e => setProveedor(e.target.value)} />
                <label className='text-gray-400'>Contract Type</label>
                <select
                    className=" border border-gray-200 bg-zinc-100/40"
                    value={contrato}
                    onChange={e => hanldeContrato(e)}>
                    <option value="">-no selected-</option>
                    <option value="MKT">MKT Agreement</option>
                    <option value="Contrato">Contract</option>
                </select>
                {contrato === 'MKT' && (
                    <div className='flex gap-2'>
                        <label className='text-gray-400'>Expiration date</label>
                        <input
                            type='date'
                            className="flex border border-gray-200 bg-zinc-100/40 w-32"
                            value={mktDate}
                            min={disablePastDate()}
                            onChange={e => setMktDate(e.target.value)} />

                        {mktDate ? (
                            <span>Date set: {new Date(mktDate).toLocaleString("GB-English", { dateStyle: "short" })}</span>
                        ) : null}
                    </div>

                )}
                {contrato === "Contrato" && (
                    <></>
                )}
                <div className='flex flex-wrap gap-2'>
                    <div>
                        <label className='text-gray-400'>Project ID</label>
                        <input
                            type='text'
                            placeholder='ej: 6877'
                            value={projectID}
                            onChange={e => setProjectId(e.target.value)} />
                    </div>
                    <div>
                        <label className='text-gray-400'>Standard</label>
                        <select
                            className=" border border-gray-200 bg-zinc-100/40"
                            value={standar}
                            onChange={e => setStandar(e.target.value)}>
                            <option value="">-no seleccionado-</option>
                            <option value="CDM">CDM</option>
                            <option value="VCS">VCS</option>
                            <option value="GS">GS</option>
                            <option value="CERCARBONO">CERCARBONO</option>
                            <option value="I-RECs">I-RECs</option>
                            <option value="CAR">CAR</option>
                            <option value="CSA">CSA</option>
                            <option value="PLAN VIVO">Plan Vivo</option>
                            <option value="BioCarbon">BioCarbon</option>
                        </select>
                    </div>
                    <div>
                        <label className='text-gray-400'>CCB</label>
                        <select
                            className=" border border-gray-200 bg-zinc-100/40"
                            value={ccb}
                            onChange={e => setCcb(e.target.value)}>
                            <option value="">-no seleccionado-</option>
                            <option value="YES">Yes</option>
                            <option value="NO">No</option>
                        </select>
                    </div>
                    <div>
                        <label className='text-gray-400'>Vintage</label>
                        <input
                            type='text'
                            placeholder='ej: 2022'
                            value={vintage}
                            onChange={e => setVintage(e.target.value)} />
                    </div>
                </div>
                <div className='flex flex-wrap gap-2 '>
                    <div className='w-auto'>
                        <label className='text-gray-400'>Volume</label>
                        <input
                            type='number'
                            placeholder='ej: 4512'
                            value={volumen}
                            onChange={e => setVolumen(e.target.value)} />
                    </div>
                    <div className='w-auto'>
                        <label className='text-gray-400'>Sell Trading Price (USD)</label>
                        <input
                            type='number'
                            placeholder='ej: 1.60'
                            value={precioVenta}
                            onChange={e => setPrecioVenta(e.target.value)} />
                    </div>
                    <div className='w-auto'>
                        <label className='text-gray-400'>Sell Corporate Price (USD)</label>
                        <input
                            type='number'
                            placeholder='ej: 3.60'
                            value={precioCorp}
                            onChange={e => setPrecioCorp(e.target.value)} />
                    </div>
                    <div className='w-auto'>
                        <label className='text-gray-400'>Floor Price (USD)</label>
                        <input
                            type='number'
                            placeholder='ej: 2.00'
                            value={floorPrice}
                            onChange={e => setFloorPrice(e.target.value)} />
                    </div>
                </div>

                <label className='text-gray-400'>Project's Name</label>
                <input
                    type='text'
                    placeholder='ej: piedra larga II'
                    value={name}
                    onChange={e => setName(e.target.value)} />
                <label className='text-gray-400'>Project's Link</label>
                <input
                    type='text'
                    placeholder='ej: https://cdm.unfccc.int/Projects/DB/AENOR1343375362.2/view'
                    value={projectLink}
                    onChange={e => setProjectLink(e.target.value)} />

                <label className='text-gray-400'>Tech</label>
                <select
                    className=" border border-gray-200 bg-zinc-100/40"
                    value={tech}
                    onChange={e => setTech(e.target.value)}>
                    <option value="">-no selected-</option>
                    <option value="AFOLU">AFOLU</option>
                    <option value="Any transportation project">Any transportation project</option>
                    <option value="ARR">ARR</option>
                    <option value="Biomas to Electricity">Biomas to Electricity</option>
                    <option value="Biomas to heat">Biomas to heat</option>
                    <option value="Cogeneration">Cogeneration</option>
                    <option value="Combined cycle">Combined cycle</option>
                    <option value="Cookstove">Solar Cookstove</option>
                    <option value="Energy Efficiency - Agriculture Sector">Energy Efficiency - Agriculture Sector</option>
                    <option value="Energy Efficiency - Commercial Sector">Energy Efficiency - Commercial Sector</option>
                    <option value="Energy Efficiency - Domestic">Energy Efficiency - Domestic</option>
                    <option value="Energy Efficiency - Industrial">Energy Efficiency - Industrial</option>
                    <option value="Energy Efficiency - Public Sector">Energy Efficiency - Public Sector</option>
                    <option value="Gheotermal">Gheotermal</option>
                    <option value="HFC">HFC</option>
                    <option value="Hydro">Hydro</option>
                    <option value="IFM">Improved Forest Managment</option>
                    <option value="Landfill gas">Landfill gas</option>
                    <option value="Landfill to energy">Landfill to energy</option>
                    <option value="Mangroves">Mangroeves</option>
                    <option value="Manufacturing industries">Manufacturing industries</option>
                    <option value="Manure management">Manure management</option>
                    <option value="Methane Recovery">Methane recovery</option>
                    <option value="Mine Methane Utilization Project">Mine Methane Utilization Project</option>
                    <option value="N20 destrutction">N2O Destruction</option>
                    <option value="Non mine Methane Porject">Non mine Methane Porject</option>
                    <option value="Oil Management">Oil Management</option>
                    <option value="Run of river">Run of river</option>
                    <option value="REDD">REDD</option>
                    <option value="REDD+">REDD+</option>
                    <option value="SF6">SF6</option>
                    <option value="Small Renewable energy projects">Small Renewable energy projects</option>
                    <option value="Small Hydro">Small Hydro</option>
                    <option value="Solar">Solar</option>
                    <option value="Solar Cookstove">Solar Cookstove</option>
                    <option value="Waste">Waste</option>
                    <option value="Waste to compost">Waste to compost</option>
                    <option value="Wind">Wind</option>
                </select>
                {/* Pongo los paises en un componente por que son muchos */}
                <CountryPFSelect pais={pais} setPais={setPais} />
                <div className='flex flex-wrap gap-2'>
                    <div className='w-32'>
                        <label className='text-gray-400'>CORSIA</label>
                        <select
                            className=" border border-gray-200 bg-zinc-100/40"
                            value={corsia}
                            onChange={e => setCorsia(e.target.value)}>
                            <option value="">-no selected-</option>
                            <option value="NO">No</option>
                            <option value="YES">Yes</option>
                        </select>
                    </div>
                    <div className='w-32'>
                        <label className='text-gray-400'>Colombian Tax</label>
                        <select
                            className=" border border-gray-200 bg-zinc-100/40"
                            value={colombianTax}
                            onChange={e => setColombianTax(e.target.value)}>
                            <option value="">-no selected-</option>
                            <option value="NO">No</option>
                            <option value="YES">Yes</option>
                        </select>
                    </div>
                    <div className='w-32'>
                    <label className='text-gray-400'>SDG</label>
                    <select
                        className=" border border-gray-200 bg-zinc-100/40"
                        value={sdg}
                        onChange={e => hanldeSdg(e)}>
                        <option value="">-no selected-</option>
                        <option value="NO">No</option>
                        <option value="YES">Yes</option>
                        <option value="N/A">Clean</option>
                    </select>
                    </div>
                    
                </div>


                <SdgSelected sdgImages={sdgImages} />
                {sdg === "YES" && (
                    <>
                        <span className='nota-imp'>If you have already selected the SDGs and you want to change or add any of them, you must tap the "Clean" option and add them again.</span>
                        <button onClick={showAllSdg} className="flex flex-wrap align-center w-fit bg-gray-200 text-black px-3 py-1 ms-1 mt-1 rounded shadow-sm hover:bg-gray-100 ">
                            Select which ones  {showModal ? <ArrowUp /> : <ArrowDown />}
                        </button>
                        {showModal ? (
                            <>
                                <div className='flex flex-wrap'>
                                    {sdgList.map(({ name, img }, index) => {
                                        return (
                                            <>
                                                <div className='flex items-center gap-2' key={index}>
                                                    <input
                                                        className='w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2'
                                                        type='checkbox'
                                                        name={name}
                                                        value={name}
                                                        checked={checkedState[index]}
                                                        onChange={(e) => handleChangeSdg(e, index)} />
                                                    <label className='ms-2 text-sm font-medium text-gray-800'>
                                                        <img src={img} alt="" className="flex p-2 h-28 rounded-lg" />
                                                    </label>
                                                </div>
                                            </>
                                        )
                                    }
                                    )
                                    }

                                </div>

                            </>
                        ) : null}
                    </>
                )}
                {sdg === "NO" || sdg === "N/A" && (
                    <></>
                )}

                <label className='text-gray-400'>Avaiability</label>
                <input
                    type='text'
                    placeholder='ex: Spot - november 2024'
                    value={disponible}
                    onChange={e => setDisponible(e.target.value)} />
                <label className='text-gray-400'>Notes</label>
                <textarea
                    placeholder='ex: Proyecto de TD '
                    value={notas}
                    onChange={e => setNotas(e.target.value)} />
                    <label className='text-gray-400'>Storage location</label>
                <select
                    className=" border border-gray-200 bg-zinc-100/40"
                    value={sede}
                    onChange={e => setSede(e.target.value)}>
                    <option value="">-no selected-</option>
                    <option value="ALLCOT AG">ALLCOT AG</option>
                    <option value="ALLCOT COLOMBIA">ALLCOT COLOMBIA</option>
                    <option value="ALLCOT MEXICO">ALLCOT MEXICO</option>
                    <option value="ALLCOT SPAIN">ALLCOT SPAIN</option>
                    <option value="ALLCOT CENTRO-AMERICA">ALLCOT CENTRO-AMERICA</option>
                </select>
                <label className='text-gray-400'>Files</label>
                <div className='mb-2 flex flex-wrap gap-1 items-center'>
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
                        <div className='text-gray-400'> No attached files </div>
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