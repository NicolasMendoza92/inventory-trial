import axios from "axios";
import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { useRouter } from "next/router";
import isEnableUser from '@/lib/enableUser';
import { useSession } from 'next-auth/react';


export const TableOperations = () => {
    const { data: session } = useSession();
    const enable = isEnableUser(session)

    // creo states para guardar todas las operaciones 
    const [alloperations, setAlloperations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        getAlloperations();
    }, [])

    function getAlloperations() {
        setIsLoading(true)
        axios.get('/api/alloperations').then(res => {
            setAlloperations(res.data.allOperations)
        })
        setIsLoading(false)
    }

    const handleButtonClick = (_id) => {
        router.push('/operation/edit/' + _id)

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
            name: 'transaction',
            label: 'Type',
        },
        {
            name: 'equipo',
            label: 'Team',
        },
        {
            name: 'cliente',
            label: 'Client',
        },
        {
            name: 'projectData',
            label: 'ID',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return value.idProject;
                },
            },
        },
        {
            name: 'projectData',
            label: 'Standard',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return value.standardOp;
                },
            },
        },
        {
            name: 'projectData',
            label: 'Name',
            options: {
                filter: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return value.nameProject.length > 20 ? `${value.nameProject.slice(0, 20)}...` : value.nameProject;
                },
            },
        },
        {
            name: 'projectData',
            label: 'Vintage',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return value.vintageOp;
                },
            },
        },
        {
            name: 'projectData',
            label: 'Country',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return value.countryProject;
                },
            },
        },
        {
            name: 'precio',
            label: 'price',
            options: {
                filter: false,
            }
        },
        {
            name: 'quantity',
            label: 'Volume',
            options: {
                filter: false,
            }
        },
        {
            name: 'delivery',
            label: 'Delivery',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    const textColor = value === 'Pending' ? 'red' : 'green';
                    return (
                        <span style={{ color: textColor }}>
                            {value}
                        </span>
                    );
                },
            },
        },
        {
            name: 'deliveryDate',
            label: 'Date',
            options: {
                filter: false,
                customBodyRender: (value) => {
                    if (value === null) {
                        return ''; 
                    }
        
                    return new Date(value).toLocaleString(
                        "es-ES",
                        {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                        }
                    );
                },
            },
        },
        {
            name: 'payment',
            label: 'Payment',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    const textColor = value === 'Pending' ? 'red' : 'green';
                    return (
                        <span style={{ color: textColor }}>
                            {value}
                        </span>
                    );
                },
            },
        },
        {
            name: 'paymentDate',
            label: 'Date',
            options: {
                filter: false,
                customBodyRender: (value) => (
                    new Date(value).toLocaleString(
                        "es-ES",
                        {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                        }
                    )
                ),
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
        rowsPerPage: 15, 
    };

    return (
        <>
            {isLoading && (
                <div className="w-full flex justify-center py-4">
                    <Spinner />
                </div>
            )}
            <MUIDataTable
                title={"OPERATION LIST"}
                data={alloperations}
                columns={columns}
                options={options}
                maxHeight={15}
            />
        </>

    )
}