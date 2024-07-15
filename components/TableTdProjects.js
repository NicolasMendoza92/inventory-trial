import axios from "axios";
import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { useRouter } from "next/router";
import isEnableUser from '@/lib/enableUser';
import { useSession } from 'next-auth/react';


export const TableTdProjects = () => {
    const { data: session } = useSession();
    const enable = isEnableUser(session);

    // creo states para guardar todas las operaciones 
    const [allprojects, setAllprojects] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        getAllProjects();
    }, [])

    async function getAllProjects() {
        setIsLoading(true)
        await axios.get('/api/allprojects').then(res => {
            setAllprojects(res.data.projects)
        })
        setIsLoading(false)
    }

    const handleButtonClick = (_id) => {
        router.push('/projects/edit/' + _id)

    };

    // filtro los de TD 
    const projectsTd = allprojects?.filter(p => p.tdInfo === 'Yes')


    const columns = [
        {
            name: '_id',
            options: {
                filter: false,
                display: 'false',
            },
        },
        {
            name: 'name',
            label: 'Name',
            width: 200,
            options: {
                filter: false,
                customBodyRender: (value) => (
                    value.length > 20 ? `${value.slice(0, 25)}...` : value
                ),
            },
        },
        {
            name: 'Sector',
            label: 'sectorTD',
        },
        {
            name: 'projectID',
            label: 'ID',
            options: {
                filter: false,
            },
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
            name: 'standar',
            label: 'Standard',
        },
        {
            name: 'proveedor',
            label: 'Financial Partner',
            options: {
                filter: false,
            }
        },

        {
            name: 'tdService',
            label: 'Vintage',
        },
        {
            name: 'typeOfContract',
            label: 'Type of Contract',
        },
        {
            name: 'status',
            label: 'Status',
        },
        {
            name: 'stage',
            label: 'Stage',
        },
        {
            name: 'corsia',
            label: 'CORSIA',
            options: {
                filter: true,
                filterType: 'multiselect',
                display: 'false',
            },
        },
        {
            name: 'rpStartDate',
            label: 'Report Period Start',
            options: {
                filter: true,
            },
        },
        {
            name: 'rpEndDate',
            label: 'Report Period End',
            options: {
                filter: true,
            },
        },
        {
            name: 'actualDataVolume',
            label: 'Actual Data',
            options: {
                filter: false,
            }
        },
        {
            name: 'netVolume',
            label: 'Net Volume',
            options: {
                filter: false,
            }
        },
        {
            name: 'regulatedMarket',
            options: {
                filter: true,
                filterType: 'multiselect',
                display: 'false',
            },
        },
        {
            name: 'continente',
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
        selectableRows: 'none',
        responsive: 'simple',
        searchOpen: false,
    };

    return (
        <>
            {isLoading && (
                <div className="w-full flex justify-center py-4">
                    <Spinner />
                </div>
            )}
            <MUIDataTable
                title={"TD PROJECTS LIST"}
                data={projectsTd}
                columns={columns}
                options={options}
                maxHeight={15}
            />
        </>

    )
}
