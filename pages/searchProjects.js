
import Layout from '@/components/layout'
import { mongooseConnect } from '@/lib/mongoose';
import Project from '@/models/Projects';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export default function searchProjects({ projects }) {

    const [projectSearched, setProjectSearched] = useState('');
    const [projectFinded, setProjectFinded] = useState([]);

    useEffect(() => {
        let searchedProjects = [];
        if (projectSearched.length !== '') {

            searchedProjects = projects.filter((proj) => {
                return proj.name.toLowerCase().includes(projectSearched.toLowerCase()) ||
                    proj.projectID.toLowerCase().includes(projectSearched.toLowerCase()) ||
                    proj.standar.toLowerCase().includes(projectSearched.toLowerCase());
            });
            setProjectFinded(searchedProjects);
        }
    }, [projectSearched, projects])

    return (
        <Layout>
            <div className='flex justify-center m-4'>
                <input
                    value={projectSearched}
                    onChange={e => setProjectSearched(e.target.value)}
                    placeholder='Busca tu proyecto'
                    autoFocus />
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