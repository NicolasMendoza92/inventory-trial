import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import Spinner from "./Spinner";
import axios from "axios";


const ExportOperations = () => {

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

    
    const handleDownload = () => {
        setLoading(true);
        const table_operations = document.getElementById("my-operation-table");

        const workbook = XLSX.utils.table_to_book(table_operations);
        const worksheet = workbook.Sheets["Sheet1"];
        XLSX.utils.sheet_to_html( worksheet, "Operations");

        setTimeout(() => {
            XLSX.writeFile(workbook, "OperationsTable.xlsx");
            setLoading(false);
        }, 1000);
    };

    return (
        <>
            {!loading ? (
                <button className="bg-green-600 text-white px-3 py-1 ms-1 mt-1 rounded shadow-sm hover:bg-green-500 " onClick={handleDownload}>
                    Export excel
                </button>
            ) : (
                <button disabled>
                    <Spinner />
                </button>
            )}
            <div className="hidden">
                <table id="my-operation-table">
                    <thead>
                        <tr>
                            <td>Date</td>
                            <td>Type</td>
                            <td>Team</td>
                            <td>Client</td>
                            <td>Standar</td>
                            <td>ID</td>
                            <td>Project name</td>
                            <td>Vintage</td>
                            <td>Country</td>
                            <td>Price</td>
                            <td>Volume</td>
                            <td>Delivery</td>
                            <td>Payment</td>
                            <td></td>
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
                                <td>{op.equipo}</td>
                                <td>{op.cliente}</td>
                                <td> {op.proyecto?.standar}</td>
                                <td>{op.proyecto?.projectID}</td>
                                <td>{op.proyecto?.name}</td>
                                <td>{op.proyecto?.vintage}</td>
                                <td>{op.precio}</td>
                                <td>{op.quantity}</td>
                                <td>{op.delivery}</td>
                                <td>{op.payment}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ExportOperations;
