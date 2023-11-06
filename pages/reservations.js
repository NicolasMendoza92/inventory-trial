import Spinner from "@/components/Spinner";
import Layout from "@/components/layout";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";


export default function reservations() {

    const [pageNumber, setPageNumber] = useState(0)
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [reservations, setReservations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

    // esti actualiza la tabla - es la consulta get a las categorias. 
    useEffect(() => {
        fetchReservations();
    }, [pageNumber])

    function fetchReservations() {
        setIsLoading(true);
        axios.get(`/api/reservations?page=${pageNumber}`).then(result => {
            setReservations(result.data.reservationDoc);
            setNumberOfPages(result.data.totalPages);
            setIsLoading(false);
        });
    }

    const gotoPrevious = () => {
        setPageNumber(Math.max(0, pageNumber - 1));
    };

    const gotoNext = () => {
        setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
    };


    function deleteReserve(id) {
        // agrego los botones y opciones segun la libreria sweet
        Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to delete this reserve?`,
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Yes, Delete!',
            confirmButtonColor: '#d55',
            reverseButtons: true,
        }).then(async result => {
            // hacemos console log del result y vemos que opcion es cada una. 
            if (result.isConfirmed) {
                await axios.delete('/api/reservations?id=' + id);
                fetchReservations()
            }
        });
    }



    return (
        <Layout>
            <div className="relative overflow-x-auto">
                <table className=" basic my-3">
                    <thead>
                        <tr>
                            <td>Date</td>
                            <td>Client</td>
                            <td>Project</td>
                            <td>Vintage</td>
                            <td>Volume</td>
                            <td>Price</td>
                            <td>Status</td>
                            <td>Expiration date</td>
                            <td>Comments</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading && (
                            <tr>
                                <td colSpan={9}>
                                    <div className="w-full flex justify-center py-4">
                                        <Spinner />
                                    </div>
                                </td>
                            </tr>
                        )}
                        {reservations.map(r => (
                            <tr key={r._id}>
                                <td>{(new Date(r.createdAt)).toLocaleString(
                                    "en-US", { dateStyle: "short" }
                                )}
                                </td>
                                <td>{r.customer}</td>
                                <td>{r.projectRelated?.standar} {r.projectRelated?.projectID} {r.projectRelated?.name}</td>
                                <td> {r.projectRelated?.vintage}</td>
                                <td>{r.quantity}</td>
                                <td>{r.price}</td>
                                <td>{r.status}</td>
                                <td>{(new Date(r.expiration)).toLocaleString(
                                    "en-US", { dateStyle: "short" }
                                )}
                                </td>
                                <td>{r.comments}</td>
                                <td>
                                    <div className="flex gap-1">
                                        {/* aca le paso el id de la operacion para poder traers los datos */}
                                        <Link className="bg-gray-300 text-white p-2" href={'/reservation/edit/' + r._id}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                            </svg>
                                        </Link>
                                        <button onClick={() => deleteReserve(r._id)} className="bg-red-300 text-white p-2" >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="flex  justify-center py-4 gap-2">
                    <button className="bg-gray-300 text-white p-2" onClick={gotoPrevious}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    {pages.map((pageIndex) => (
                        <button className="btn-default" key={pageIndex} onClick={() => setPageNumber(pageIndex)}>
                            {pageIndex + 1}
                        </button>
                    ))}
                    <button className="bg-gray-300 text-white p-2" onClick={gotoNext}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
                <h1 className="text-center">Page {pageNumber + 1} of {numberOfPages}</h1>
            </div>
        </Layout>
    )
}