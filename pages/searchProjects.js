
import Layout from '@/components/layout'
import { mongooseConnect } from '@/lib/mongoose';
import Project from '@/models/Projects';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export default function searchProjects({ projects }) {

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

    const filterByVol = (e) =>{
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
                <label className="m-2" >STANDAR</label>
                <select onChange={(e) => filterByStd(e)}  className="flex w-32" >
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
                <label className="m-2" >TECH</label>
                <select onChange={(e) => filterByTech(e)}  className="flex w-32" >
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
                <div className='flex w-64 items-center'>
                    <label className="m-2">Volume</label>
                    <input className='range_input' type='range' min={0} max={maxVolume} step={50} value={vol} onChange={(e) => filterByVol(e)} />
                    <span className='ms-2' >{vol}</span>
                </div>

            </div>
            <div className=' relative overflow-x-auto'>
                <table className="basic my-3">
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Standar</td>
                            <td>Nombre</td>
                            <td>Vintage</td>
                            <td>Tech</td>
                            <td>Pais</td>
                            <td>Corsia</td>
                            <td>SDG</td>
                            <td>Volumen</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {projectFinded.map(project => (
                            <tr key={project._id}>
                                <td>{project.projectID}</td>
                                <td>{project.standar}</td>
                                <td>{project.name}</td>
                                <td>{project.vintage}</td>
                                <td>{project.tech}</td>
                                <td>{project.pais}</td>
                                <td>{project.corsia}</td>
                                <td>{project.sdg}</td>
                                <td>{project.volumen}</td>
                                <td>
                                    <Link className="bg-green-600 text-white p-2" href={'/projects/operation/' + project._id}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </Link>
                                    <Link className="bg-gray-300 text-white p-2" href={'/projects/edit/' + project._id}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                        </svg>
                                    </Link>
                                </td>
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