import ClientForm from '@/components/ClientForm';
import RelatedTrans from '@/components/RelatedTrans';
import Spinner from '@/components/Spinner';
import Layout from '@/components/layout';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';


export default function EditClientPage() {


    // traemos la informacion del producto 
    const [clientInfo, setClientInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter()
    const { id } = router.query;

    useEffect(() => {
        if (!id) {
            return;
        }
        setIsLoading(true);
        axios.get('/api/clientes?id=' + id).then(response => {
            setClientInfo(response.data);
            setIsLoading(false);
        })
    }, [id]);


    function deleteClient(id) {
        // agrego los botones y opciones segun la libreria sweet
        Swal.fire({
            icon: "warning",
            title: 'Are you sure?',
            text: `Do you want to delete this customer?`,
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Yes, Delete!',
            confirmButtonColor: '#d55',
            reverseButtons: true,
        }).then(async result => {
            // hacemos console log del result y vemos que opcion es cada una. 
            if (result.isConfirmed) {
                await axios.delete('/api/clientes?id=' + id);
                router.push('/clients');
            }
        });
    }


    return (
        <Layout>
            <div className="flex justify-between content-center">
                <div>
                    <p> Customer file </p>
                </div>
                <div className='flex gap-2'>
                    <button className="bg-gray-300 text-white px-3 py-1 ms-1 mt-1 rounded shadow-sm hover:bg-gray-200" >
                        <Link href={'/clients'}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                            </svg>
                        </Link>
                    </button>
                    <button onClick={() => deleteClient(id)} className="bg-red-600 text-white px-3 py-1 ms-1 mt-1 rounded shadow-sm hover:bg-red-500" >
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
                clientInfo && (
                    <ClientForm {...clientInfo} />
                )
            }
            <div className='my-3 mx-2'>
                <p>Customer history </p>
                <RelatedTrans {...clientInfo} />
            </div>
        </Layout >
    );
}