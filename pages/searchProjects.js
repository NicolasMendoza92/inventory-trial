
import ArrowDown from '@/components/ArrowDown';
import ArrowUp from '@/components/ArrowUp';
import Layout from '@/components/layout'
import isEnableUser from '@/lib/enableUser';
import { mongooseConnect } from '@/lib/mongoose';
import Project from '@/models/Projects';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export default function SearchProjects({ projects }) {

    const { data: session } = useSession();
    const enable = isEnableUser(session)

    const [filteredData, setFilteredData] = useState(projects);

    const [selectedStd, setSelectedStd] = useState('');
    const [selectedTech, setSelectedTech] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedVintage, setSelectedVintage] = useState('');

    // LOGICA DEL MULTISELECT PARA TECHs

    const [showTecnos, setShowTecnos] = useState(false);
    const showTechs = (e) => {
        e.preventDefault(e);
        setShowTecnos(prev => !prev);
    }

    const handleCheckboxChange = (tech) => {
        // Check if the option is already selected
        if (selectedTech.includes(tech)) {
            // If selected, remove it
            setSelectedTech(selectedTech.filter((item) => item !== tech));
        } else {
            // If not selected, add it
            setSelectedTech([...selectedTech, tech]);
        }
    };

    const filterTecnos = () => {

        if (selectedTech.length > 0) {
            const newArray = projects.filter((item) =>
                selectedTech.includes(item.tech)
            );
            setFilteredData(newArray);
            setShowTecnos(false)
        } else {
            setFilteredData(projects);
            setShowTecnos(false)
        }
    };

    const clearTecnos = () => {
        setSelectedTech([])
        setFilteredData(projects);
        setShowTecnos(false)
    };

    useEffect(() => {
        // const filteredByTech = filteredByStd.filter(item => !selectedTech || item.tech === selectedTech);
        const filteredByStd = projects.filter(item => !selectedStd || item.standar === selectedStd);
        const filteredByVintage = filteredByStd.filter(item => !selectedVintage || item.vintage === selectedVintage);
        const filteredByCountry = filteredByVintage.filter(item => !selectedCountry || item.pais === selectedCountry);
        setFilteredData(filteredByCountry)
    }, [selectedStd, selectedVintage, selectedCountry])

    // FILTROS INDEPENDIENTES 

    const filterByCorsia = (e) => {
        const corsia = e.target.value;
        const filterCorsia = projects.filter((projF) => !corsia || projF.corsia === corsia);
        setFilteredData(filterCorsia)
    }

    const filterByCcb = (e) => {
        const ccb = e.target.value;
        const filterCcb = projects.filter((projF) => !ccb || projF.ccb === ccb);
        setFilteredData(filterCcb)
    }
    const filterByColombianTax = (e) => {
        const colombianTax = e.target.value;
        const filterColombianTax = projects.filter((projF) => !colombianTax || projF.colombianTax === colombianTax);
        setFilteredData(filterColombianTax)
    }


    return (
        <Layout>
            <div className='flex flex-wrap gap-2'>
                <label className="m-2" >Standard</label>
                <select value={selectedStd} onChange={(e) => setSelectedStd(e.target.value)} className="flex w-32" >
                    <option value="">All</option>
                    <option value="CDM">CDM</option>
                    <option value="VCS">VCS</option>
                    <option value="GS">GS</option>
                    <option value="CERCARBONO">CERCARBONO</option>
                    <option value="I-RECs">I-RECs</option>
                    <option value="CAR">CAR</option>
                    <option value="CSA">CSA</option>
                    <option value="PLAN VIVO">Plan Vivo</option>
                </select>
                <label className="m-2">Vintage</label>
                <select value={selectedVintage} onChange={(e) => setSelectedVintage(e.target.value)} className="flex w-32">
                    <option value="">All</option>
                    {Array.from(new Set(projects.map(item => item.vintage))).map(vintage => (
                        <option key={vintage} value={vintage}>{`${vintage}`}</option>
                    ))}
                </select>
                <label className="m-2">Country</label>
                <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} className="flex w-32">
                    <option value="">All</option>
                    {Array.from(new Set(projects.map(item => item.pais))).map(pais => (
                        <option key={pais} value={pais}>{`${pais}`}</option>
                    ))}
                </select>
                <label className="m-2" >Tech</label>
                <div>
                    <div className='multiselect'>
                        <button onClick={showTechs} className="flex flex-wrap align-center w-fit bg-zinc-100/40 border border-gray-200 text-black px-3 py-2 ">
                            {selectedTech.length > 0 ? <h1>Selected techs</h1> : <h1>No tech Selected</h1>}
                            {showTecnos ? <ArrowUp /> : <ArrowDown />}
                        </button>
                        {showTecnos === true ? (
                            <>
                                <div className='checkboxes'>
                                    {Array.from(new Set(projects.map(item => item.tech))).map(tech => (
                                        <label className='container' key={tech}>
                                            {`${tech}`}
                                            <input
                                                value={tech}
                                                type="checkbox"
                                                checked={selectedTech.includes(tech)}
                                                onChange={() => handleCheckboxChange(tech)} />
                                            <span className='checkmark'></span>
                                        </label>

                                    ))}
                                    <div className=' flex justify-between mb-1 ms-1'>
                                        <button className='bg-green-600 text-white px-1 ms-1 rounded shadow-sm hover:bg-green-500' onClick={filterTecnos}>Filter</button>
                                        <button className='bg-gray-600 text-white px-1 me-1 rounded shadow-sm hover:bg-gray-500' onClick={clearTecnos}>Clear</button>
                                    </div>
                                </div>

                            </>

                        ) : null}
                    </div>
                </div>
                {/* <select value={selectedTech} onChange={(e) => setSelectedTech(e.target.value)} className="flex w-32">
                    <option value="">All</option>
                    {Array.from(new Set(projects.map(item => item.tech))).map(tech => (
                        <option key={tech} value={tech}>{`${tech}`}</option>
                    ))}
                </select> */}

                <label className="m-2">CORSIA</label>
                <select
                    onChange={(e) => filterByCorsia(e)} className="flex w-32">
                    <option value="">-no selected-</option>
                    <option value="YES">Yes</option>
                    <option value="NO">No</option>
                </select>
                <label className="m-2">CCB</label>
                <select
                    onChange={(e) => filterByCcb(e)} className="flex w-32">
                    <option value="">-no selected-</option>
                    <option value="YES">Yes</option>
                    <option value="NO">No</option>
                </select>
                <label className="m-2">Colombian Tax</label>
                <select
                    onChange={(e) => filterByColombianTax(e)} className="flex w-32">
                    <option value="">-no selected-</option>
                    <option value="YES">Yes</option>
                    <option value="NO">No</option>
                </select>
            </div>
            <div className='relative overflow-x-auto'>
                <table className="basic my-3">
                    <thead>
                        <tr>
                            <td>Type</td>
                            <td>Supplier</td>
                            <td>Floor Price (USD)</td>
                            <td>Name</td>
                            <td>Standard</td>
                            <td>ID</td>
                            <td>Vintage</td>
                            <td>Tech</td>
                            <td>Country</td>
                            <td>Corsia</td>
                            <td>Volume</td>
                            <td>Price(USD)</td>
                            <td>SDG</td>
                            <td>Availability</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map(project => (
                            <tr key={project._id}>
                                <td>{project.contrato}
                                    {project.contrato === "MKT" ? (
                                        <> - ({new Date(project.mktDate).toLocaleString("GB-English", { dateStyle: "short" })}) </>
                                    ) : null}
                                </td>
                                <td>{project.proveedor}</td>
                                <td>{project.floorPrice}</td>
                                <td>{(project.name).slice(0, 25)}</td>
                                <td>{project.standar} {project.ccb === 'YES' ? (
                                    <> CCB </>
                                ) : null}
                                </td>
                                <td>{project.projectID}</td>
                                <td>{project.vintage}</td>
                                <td>{project.tech}</td>
                                <td>{project.pais}</td>
                                <td>{project.corsia}</td>
                                <td>{project.volumen}</td>
                                <td>{project.precioVenta}</td>
                                <td>
                                    {project.sdgSelected.map(ods => <React.Fragment key={ods}>{ods}-</React.Fragment>)}
                                </td>
                                <td>{project.disponible}</td>
                                {enable === false && (
                                    <td></td>
                                )}
                                {session?.user.email === 'wp.co@allcot.com' ? (
                                    <td>
                                        <Link className="bg-orange-600 text-white px-1 ms-1 rounded shadow-sm hover:bg-orange-500" href={'/projects/reservation/' + project._id}>
                                            <div className="group relative w-max">
                                                <button>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                                    </svg>
                                                </button>
                                                <span className="pointer-events-none absolute -top-7 left-0 w-max rounded bg-gray-900 px-2 py-1 text-sm font-medium text-gray-50 opacity-0 shadow transition-opacity group-hover:opacity-100">
                                                    Reserve
                                                </span>
                                            </div>
                                        </Link>
                                    </td>
                                ) : null}
                                {enable === true &&
                                    <td>
                                        {/* aca le paso el id del proyecto, y por ende va a editar el volumen con ese id */}
                                        <Link className="bg-green-600 text-white px-1 ms-1 rounded shadow-sm hover:bg-green-500" href={'/projects/operation/' + project._id}>
                                            <div className="group relative w-max">
                                                <button>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </button>
                                                <span className="pointer-events-none absolute -top-7 left-0 w-max rounded bg-gray-900 px-2 py-1 text-sm font-medium text-gray-50 opacity-0 shadow transition-opacity group-hover:opacity-100">
                                                    New operation
                                                </span>
                                            </div>
                                        </Link>
                                        <Link className="bg-gray-300 text-white px-1 ms-1 rounded shadow-sm hover:bg-gray-200" href={'/projects/edit/' + project._id}>
                                            <div className="group relative w-max">
                                                <button>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                    </svg>
                                                </button>
                                                <span className="pointer-events-none absolute -top-7 left-0 w-max rounded bg-gray-900 px-2 py-1 text-sm font-medium text-gray-50 opacity-0 shadow transition-opacity group-hover:opacity-100">
                                                    Edit
                                                </span>
                                            </div>
                                        </Link>
                                        <Link className="bg-orange-600 text-white px-1 ms-1 rounded shadow-sm hover:bg-orange-500" href={'/projects/reservation/' + project._id}>
                                            <div className="group relative w-max">
                                                <button>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                                    </svg>
                                                </button>
                                                <span className="pointer-events-none absolute -top-7 left-0 w-max rounded bg-gray-900 px-2 py-1 text-sm font-medium text-gray-50 opacity-0 shadow transition-opacity group-hover:opacity-100">
                                                    Reserve
                                                </span>
                                            </div>
                                        </Link>
                                    </td>
                                }
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}


// TRAIGO LOS PROYECTOS CON GET SERVER SIDE PROPS PARA PODER USARLOS 
export async function getServerSideProps() {
    await mongooseConnect();
    const projects = await Project.find({}, null, { sort: { '_id': -1 } });

    return {
        props: {
            projects: JSON.parse(JSON.stringify(projects)),

        }
    };
}