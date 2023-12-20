import axios from "axios";
import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { useRouter } from "next/router";
import isEnableUser from '@/lib/enableUser';
import { useSession } from 'next-auth/react';


export const TableProjects = () => {
    const { data: session } = useSession();
    const enable = isEnableUser(session)

    // creo states para guardar todas las operaciones 
    const [allprojects, setAllprojects] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        getAllProjects();
    }, [])

    function getAllProjects() {
        setIsLoading(true)
        axios.get('/api/allprojects').then(res => {
            setAllprojects(res.data.projects)
        })
        setIsLoading(false)
    }

    const handleButtonClick = (_id) => {
        router.push('/projects/edit/' + _id)

    };

    const columns = [
        {
            name: '_id',
            options: {
                filter: false,
                display: 'false',
            },
        },
        {
            name: 'contrato',
            label: 'Type',
        },
        {
            name: 'proveedor',
            label: 'Supplier',
            options: {
                filter: false,
            }
        },
        {
            name: 'floorPrice',
            label: 'Floor Price (USD)',
            options: {
                filter: false,
            }
        },
        {
            name: 'name',
            label: 'Name',
            options: {
                filter: false,
            }
        },
        {
            name: 'standar',
            label: 'Standard',
        },
        {
            name: 'projectID',
            label: 'ID',
            options: {
                filter: false,
            },
        },
        {
            name: 'vintage',
            label: 'Vintage',
        },
        {
            name: 'tech',
            label: 'Tech',
        },
        {
            name: 'pais',
            label: 'Country',
        },
        {
            name: 'corsia',
            label: 'CORSIA',
        },
        {
            name: 'volumen',
            label: 'Volume',
            options: {
                filter: false,
            }
        },
        {
            name: 'precioVenta',
            label: 'Trading Price (USD)',
            options: {
                filter: false,
            }
        },
        {
            name: 'precioCorp',
            label: 'Corp. Price (USD)',
            options: {
                filter: false,
            }
        },
        {
            name: 'disponible',
            label: 'Availability',
        },
        {
            name: 'ccb',
            options: {
                filter: true,
                display: 'false',
            },
        },
        {
            name: 'colombianTax',
            options: {
                filter: true,
                display: 'false',
            },
        },
        {
            name: "Action",
            options: {
                filter: false,
                customBodyRender: (value, tableMeta) => (
                    <>
                        {enable === true ? (
                                <button
                                    onClick={() => handleButtonClick(tableMeta.rowData[0], value)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </button>
                            ) : null}
                    </>
                ),
            },
        },
    ]

    const options = {
        filterType: 'multiselect',
    };

    return (
        <>
            {isLoading && (
                <div className="w-full flex justify-center py-4">
                    <Spinner />
                </div>
            )}
            <MUIDataTable
                title={"INVENTORY LIST"}
                data={allprojects}
                columns={columns}
                options={options}
            />
        </>

    )
}
