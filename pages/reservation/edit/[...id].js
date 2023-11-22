import ReservForm from '@/components/ReservForm';
import Spinner from '@/components/Spinner';
import Layout from '@/components/layout';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';


export default function EditReservePage() {

    const { data: session } = useSession();

    const router = useRouter();
    function goToLogin() {
        router.push('/login')
    }

    // traemos la informacion del producto 
    const [reservInfo, setReservInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // DEFINO ESTADO PARA MANJEAR EL PROYECTO RELACIONADO CUANDO EDITO UNA OPERACION 
    const [relatedProjectInfo, setRelatedProjectInfo] = useState('');


    // traemos la propiedad id, de router.query, ya que nos fiamos previamente con un console log donde estaba el file [...id]  que creamos con console.log({router});
    const { id } = router.query;
    const relatedProjectID = reservInfo?.projectRelated

    // SI HAY UN PROYECTO RELACIONADO, HAGO USE EFFECT Y TRAIGO DE LA BASE DE DATOS LA INFO DE ESE PROYECTO 
    useEffect(() => {
        if (!relatedProjectID) {
            return;
        }
        axios.get('/api/projects?id=' + relatedProjectID).then(response => {
            setRelatedProjectInfo(response.data);
        })
    }, [relatedProjectID]);


    useEffect(() => {
        if (!id) {
            return;
        }
        setIsLoading(true);
        axios.get('/api/reservations?id=' + id).then(response => {
            setReservInfo(response.data);
            setIsLoading(false);
        })
    }, [id]);


    function deleteReserve(id) {
        // agrego los botones y opciones segun la libreria sweet
        Swal.fire({
            icon: "warning",
            title: 'Are you sure?',
            text: `Do you want to delete this reserve?`,
            footer: `Note: These ${reservInfo?.quantity} credits will be returned to the inventory.`,
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Yes, Delete!',
            confirmButtonColor: '#d55',
            reverseButtons: true,
        }).then(async result => {
            // hacemos console log del result y vemos que opcion es cada una. 
            if (result.isConfirmed) {
                await axios.delete('/api/reservations?id=' + id);
                const total = Number(relatedProjectInfo?.volumen) + Number(reservInfo?.quantity);
                const data = {
                    volumen: total,
                }
                await axios.put('/api/projects', { ...data, _id: relatedProjectID });
                router.push('/reservations');
            }
        });
    }

    function createOperation(id) {
        // agrego los botones y opciones segun la libreria sweet
        Swal.fire({
            icon: "warning",
            title: 'Are you sure?',
            text: `Would you like to convert this reservation into a transaction?`,
            footer: `Note: This reservation will be removed from the reservation list.`,
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: "Yes, let's do it!",
            confirmButtonColor: '#d55',
            reverseButtons: true,
        }).then(async result => {
            // hacemos console log del result y vemos que opcion es cada una. 
            if (result.isConfirmed) {
                try {
                    const newOper = {
                        transaction: 'Sale',
                        equipo: reservInfo?.team,
                        cliente: reservInfo?.customer,
                        proyecto: relatedProjectID,
                        precio: reservInfo?.price,
                        quantity: reservInfo?.quantity,
                    }
                    await axios.post('/api/operations', newOper);
                    await axios.delete('/api/reservations?id=' + id);
                    router.push('/reservations');
                } catch (error) {
                    console.log(error)
                }

            }
        });
    }



    return (
        <Layout>
            {!session &&
                <div className="flex justify-center">
                    <div className="shadow-md p-3 bg-zince-300/10 flex items-center gap-2 m-3">
                        <h1>You must be logged in to edit reservations</h1>
                        <button className="bg-green-600 rounded-lg text-white font-bold px-6 py-2" onClick={goToLogin}> Login </button>
                    </div>
                </div>
            }
            {session &&
                <>
                    <div className="flex justify-between content-center">
                        <div>
                            <p> Edit reservation </p>
                        </div>
                        <div className='flex gap-2'>
                            <button className="bg-gray-300 text-white px-3 py-1 ms-1 mt-1 rounded shadow-sm hover:bg-gray-200" >
                                <Link href={'/reservations'}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                                    </svg>
                                </Link>
                            </button>
                            <button className="bg-green-600 text-white px-3 py-1 ms-1 mt-1 rounded shadow-sm hover:bg-green-500" onClick={() => createOperation(id)} >
                                Convert into a sale
                            </button>
                            <button onClick={() => deleteReserve(id)} className="bg-red-600 text-white px-3 py-1 ms-1 mt-1 rounded shadow-sm hover:bg-red-500" >
                                Delete
                            </button>
                        </div>
                    </div>
                    {
                        isLoading && (
                            <div className='flex justify-center w-full'>
                                <Spinner />
                            </div>

                        )
                    }
                    {
                        reservInfo && (
                            <ReservForm {...reservInfo} relatedProjectID={relatedProjectID} />
                        )
                    }
                </>
            }

        </Layout >
    );
}