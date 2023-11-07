import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import axios from "axios";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const ExportExcel = () => {

    // creo states para guardar todas las operaciones 
    const [alloperations, setAlloperations] = useState([]);

    useEffect(() => {
        getAllOperations();
    }, [])

    function getAllOperations() {
        axios.get('/api/alloperations').then(res => {
            setAlloperations(res.data.allOperations)
        })
    }

    const [loading, setLoading] = useState(false);

    // Se crea una nueva tabla para exportarla como html. Se hace eso por que no encontre metodo para exportar array of objects and objects array etc

    return (
        <>
            {!loading ? (
                <ReactHTMLTableToExcel
                    id='botonExportar'
                    className='bg-green-600 text-white px-3 py-1 ms-1 mt-1 rounded shadow-sm hover:bg-green-500'
                    table='operationsTable'
                    filename="operationsExcel"
                    sheet='sheet 1'
                    buttonText="Export to excel" />
            ) : (
                <button disabled>
                    <Spinner />
                    <span> Exporting...</span>
                </button>
            )}
            <div className="hidden">
                <table id='operationsTable'>
                    <thead>
                        <tr>
                            <td>Fecha</td>
                            <td>Tipo</td>
                            <td>Cliente</td>
                            <td>Standar</td>
                            <td>ID</td>
                            <td>Project name</td>
                            <td>Vintage</td>
                            <td>Precio</td>
                            <td>Volumen</td>
                            <td>Delivery</td>
                            <td>Payment</td>
                            <td>Comments</td>
                        </tr>
                    </thead>
                    <tbody>
                        {alloperations.map(op => (
                            <tr key={op._id}>
                                <td>{(new Date(op.createdAt)).toLocaleString(
                                    "en-US", { dateStyle: "short" }
                                )}
                                </td>
                                <td>{op.transaction}</td>
                                <td>{op.cliente}</td>
                                <td>{op.proyecto?.standar}</td>
                                <td>{op.proyecto?.projectID}</td>
                                <td>{op.proyecto?.name}</td>
                                <td>{op.proyecto?.vintage}</td>
                                <td>{op.precio}</td>
                                <td>{op.quantity}</td>
                                <td>{op.delivery}</td>
                                <td>{op.payment}</td>
                                <td>{op.detalles}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </>
    );
};

export default ExportExcel;