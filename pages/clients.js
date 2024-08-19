import Spinner from "@/components/Spinner";
import Layout from "@/components/layout";
import isEnableUser from "@/lib/enableUser";
import { mongooseConnect } from "@/lib/mongoose";
import Client from "@/models/Client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


// TRAIGO LOS CLIENTES CON GET SERVER SIDE PROPS PARA PODER USARLOS 
export async function getServerSideProps() {

    await mongooseConnect();
    const clients = await Client.find({}, null, { sort: { 'nombreCliente': 1 } })

    return {
        props: {
            clients: JSON.parse(JSON.stringify(clients)),
        }
    };
}


export default function Clients({ clients }) {

    const { data: session } = useSession();
    const enable = isEnableUser(session)
    const router = useRouter();
    function goToLogin() {
        router.push('/login')
    }

    const [isLoading, setIsLoading] = useState(false);

    const [clientSearched, setClientSearched] = useState('');
    const [clientsFinded, setClientsFinded] = useState([]);

    useEffect(() => {
        let customerserch = [];
        if (clientSearched.length !== '') {

            customerserch = clients.filter((cl) => {
                return cl.nombreCliente.toLowerCase().includes(clientSearched.toLowerCase()) ||
                    cl.mainContact?.toLowerCase().includes(clientSearched.toLowerCase()) ||
                    cl.paisCliente?.toLowerCase().includes(clientSearched.toLowerCase()) ||
                    cl.tipoCliente?.toLowerCase().includes(clientSearched.toLowerCase()) ||
                    cl.division?.toLowerCase().includes(clientSearched.toLowerCase())
            });
            setClientsFinded(customerserch);
        }
    }, [clientSearched, clients])



    return (
        <Layout>
            {!session &&
                <div className="flex justify-center">
                    <div className="shadow-md p-3 bg-zince-300/10 flex items-center gap-2 m-3">
                        <h1>You must be logged in to be able to see the customers</h1>
                        <button className="bg-secondary rounded-lg text-white font-bold px-6 py-2" onClick={goToLogin}> Login </button>
                    </div>
                </div>
            }
            {session &&
                <>
                    <div className="flex justify-between content-center">
                        <div className="flex justify-end items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <input
                                value={clientSearched}
                                className="flex w-96 max-md:w-32"
                                onChange={e => setClientSearched(e.target.value)}
                                placeholder='Look up your client by name, email, country or type...'
                                autoFocus />
                        </div>
                        {enable === false && (
                            <></>
                        )}
                        {enable === true && (
                            <Link className="bg-secondary text-white px-3 py-1 ms-1 mt-1 rounded shadow-sm hover:bg-secondary/50 " href={'/client/new'}> Add Client</Link>
                        )}
                    </div>
                    <div className="relative overflow-x-auto">
                        <table className=" basic my-3">
                            <thead>
                                <tr>
                                    <td>Date</td>
                                    <td>Name</td>
                                    <td>Contact</td>
                                    <td>Country</td>
                                    <td>Type</td>
                                    <td>Division</td>
                                    <td>Notes</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading && (
                                    <tr>
                                        <td colSpan={7}>
                                            <div className="w-full flex justify-center py-4">
                                                <Spinner />
                                            </div>
                                        </td>
                                    </tr>
                                )}
                                {clientsFinded?.map(c => (
                                    <tr key={c._id}>
                                        <td>{(new Date(c.createdAt)).toLocaleString(
                                            "GB-English", { dateStyle: "short" }
                                        )}
                                        </td>
                                        <td>{c.nombreCliente}</td>
                                        <td>{c.mainContact}</td>
                                        <td>{c.paisCliente}</td>
                                        <td>{c.tipoCliente}</td>
                                        <td>{c.division}</td>
                                        <td>{c.comentarios}</td>
                                        <td>
                                            {enable === false && (
                                                <></>
                                            )}
                                            {enable === true && (
                                                <div className="flex gap-1">
                                                    <Link className="bg-gray-300 text-white px-1 ms-1 rounded shadow-sm hover:bg-gray-200" href={'/client/edit/' + c._id}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                    </Link>
                                                </div>
                                            )}
                                            

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            }

        </Layout>
    )
}