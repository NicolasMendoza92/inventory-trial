
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

    const [projectSearched, setProjectSearched] = useState('');
    const [projectFinded, setProjectFinded] = useState([]);

    const volume = projects.map(p => p.volumen);
    const maxVolume = Math.max(...volume);

    //  Handle for rage button
    const [vol, setVol] = useState(0);


    useEffect(() => {

        let searchedProjects = [];
        if (projectSearched.length !== '') {

            searchedProjects = projects.filter((proj) => {
                return proj.name.toLowerCase().includes(projectSearched.toLowerCase()) ||
                    proj.projectID.toLowerCase().includes(projectSearched.toLowerCase()) ||
                    proj.standar.toLowerCase().includes(projectSearched.toLowerCase()) ||
                    proj.pais.toLowerCase().includes(projectSearched.toLowerCase());
            });
            setProjectFinded(searchedProjects);
        }
    }, [projectSearched, projects])


    const filterByStd = (e) => {
        const std = e.target.value;
        const filterStd = projects.filter((projF) => !std || projF.standar === std);
        setProjectFinded(filterStd)
    }

    const filterByTech = (e) => {
        const tech = e.target.value;
        const filterTech = projects.filter((projF) => !tech || projF.tech === tech);
        setProjectFinded(filterTech)
    }

    const filterByCorsia = (e) => {
        const corsia = e.target.value;
        const filterCorsia = projects.filter((projF) => !corsia || projF.corsia === corsia);
        setProjectFinded(filterCorsia)
    }
    const filterByCcb = (e) => {
        const ccb = e.target.value;
        const filterCcb = projects.filter((projF) => !ccb || projF.ccb === ccb);
        setProjectFinded(filterCcb)
    }
    const filterByColombianTax = (e) => {
        const colombianTax = e.target.value;
        const filterColombianTax = projects.filter((projF) => !colombianTax || projF.colombianTax === colombianTax);
        setProjectFinded(filterColombianTax)
    }

    const filterByVol = (e) => {
        const vol = e.target.value;
        setVol(vol)
        const filterVol = projects.filter((projF) => !vol || projF.volumen >= vol);
        setProjectFinded(filterVol)
    }

    return (
        <Layout>
            <div className='flex justify-center m-4'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input
                    className='ms-2'
                    value={projectSearched}
                    onChange={e => setProjectSearched(e.target.value)}
                    placeholder='Look up your project'
                    autoFocus />
            </div>
            <div className='flex flex-wrap gap-2'>
                <label className="m-2" >Standard</label>
                <select onChange={(e) => filterByStd(e)} className="flex w-32" >
                    <option value="">all standar</option>
                    <option value="CDM">CDM</option>
                    <option value="VCS">VCS</option>
                    <option value="GS">GS</option>
                    <option value="CERCARBONO">CERCARBONO</option>
                    <option value="I-RECs">I-RECs</option>
                    <option value="CAR">CAR</option>
                    <option value="CSA">CSA</option>
                    <option value="PLAN VIVO">Plan Vivo</option>
                </select>
                <label className="m-2" >Tech</label>
                <select onChange={(e) => filterByTech(e)} className="flex w-32" >
                    <option value="">all tech</option>
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
                <div className='flex w-64 items-center'>
                    <label className="m-2">Volume</label>
                    <input className='range_input' type='range' min={0} max={maxVolume} step={50} value={vol} onChange={(e) => filterByVol(e)} />
                    <span className='ms-2' >{vol}</span>
                </div>
            </div>
            <div className='relative overflow-x-auto'>
                <table className="basic my-3">
                    <thead>
                        <tr>
                            <td>Type</td>
                            <td>Supplier</td>
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
                        {projectFinded.map(project => (
                            <tr key={project._id}>
                                <td>{project.contrato}
                                    {project.contrato === "MKT" ? (
                                        <> - ({new Date(project.mktDate).toLocaleString("GB-English", { dateStyle: "short" })}) </>
                                    ) : null}
                                </td>
                                <td>{project.proveedor}</td>
                                <td>{project.name}</td>
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
                                        <Link className="bg-orange-600 text-white px-3  ms-1 mt-1 rounded shadow-sm hover:bg-orange-500" href={'/projects/reservation/' + project._id}>
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
                                        <Link className="bg-green-600 text-white px-3 ms-1 mt-1 rounded shadow-sm hover:bg-green-500" href={'/projects/operation/' + project._id}>
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
                                        <Link className="bg-gray-300 text-white px-3  ms-1 mt-1 rounded shadow-sm hover:bg-gray-200" href={'/projects/edit/' + project._id}>
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
                                        <Link className="bg-orange-600 text-white px-3  ms-1 mt-1 rounded shadow-sm hover:bg-orange-500" href={'/projects/reservation/' + project._id}>
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