import axios from "axios";
import MUIDataTable from "mui-datatables";
import React, { useContext, useEffect, useState } from "react";
import Spinner from "./Spinner";
import { useRouter } from "next/router";
import isEnableUser from '@/lib/enableUser';
import { useSession } from 'next-auth/react';
import { ProjectSearchContext } from "@/context/ProjectSearchContext";


export const TableProjects = () => {
    const { data: session } = useSession();
    const enable = isEnableUser(session);

    const { filtersMui, setFiltersMui } = useContext(ProjectSearchContext);

    const [filterList, setFilterList] = useState([[], [], []]);

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

    useEffect(() => {
        setFilterList(prev => {
            const newFilterList = [...prev];
            if (filtersMui.regulatedMarket) newFilterList[0] = filtersMui.regulatedMarket; // Ajustar el índice según la columna correcta
            if (filtersMui.corsia) newFilterList[1] = filtersMui.corsia; // Ajustar el índice según la columna correcta
            if (filtersMui.ccp) newFilterList[2] = filtersMui.ccp;
            return newFilterList;
        });
    }, [filtersMui]);


    useEffect(() => {
        // Cleanup function para resetear los filtros cuando el componente se desmonte
        return () => {
            setFiltersMui([[], [], []]); // Restablecer a los filtros iniciales
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const columns = [
        {
            name: '_id',
            options: {
                filter: false,
                display: 'false',
            },
        },
        {
            name: 'equipo',
            label: 'Team',
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
            label: 'Min Selling Price (USD)',
            options: {
                filter: false,
            }
        },
        {
            name: 'purchasePrice',
            label: 'Purchase Price (USD)',
            options: {
                filter: false,
            }
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
            options: {
                filter: true,
                filterType: 'multiselect',
                filterList: filterList[1],
                display: 'false',
            },
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
            name: 'ccp',
            options: {
                filter: true,
                filterType: 'multiselect',
                filterList: filterList[2],
                display: 'false',
            },
        },
        {
            name: 'ccb',
            options: {
                filter: true,
                display: 'false',
            },
        },
        {
            name: 'misha',
            options: {
                filter: true,
                display: 'false',
            },
        },
        {
            name: 'stock',
            options: {
                filter: true,
                display: 'false',
            },
        },
        {
            name: 'regulatedMarket',
            options: {
                filter: true,
                filterType: 'multiselect',
                filterList: filterList[0],
                display: 'false',
            },
        },
        {
            name: 'projectType',
            options: {
                filter: true,
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
            name: 'firstCPDate',
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
                title={"INVENTORY LIST"}
                data={allprojects}
                columns={columns}
                options={options}
                maxHeight={15}
            />
        </>

    )
}
