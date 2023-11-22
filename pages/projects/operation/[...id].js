import OpForm from '@/components/OpForm';
import Spinner from '@/components/Spinner';
import Layout from '@/components/layout';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function newSale() {

    const { data: session } = useSession();
    // traemos la informacion del producto 
    const [projectInfo, setProjectInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    // traemos la propiedad id, de router.query, ya que nos fiamos previamente con un console log donde estaba el file [...id]  que creamos con console.log({router});
    const { id } = router.query;


    useEffect(() => {
        if (!id) {
            return;
        }
        setIsLoading(true);
        axios.get('/api/projects?id=' + id).then(response => {
            setProjectInfo(response.data);
            setIsLoading(false);
        })
    }, [id]);

    function goToLogin() {
        router.push('/login')
    }

    return (
        <Layout>
            {!session &&
                <div className="flex justify-center">
                    <div className="shadow-md p-3 bg-zince-300/10 flex items-center gap-2 m-3">
                        <h1>You must be logged in to handle inventory</h1>
                        <button className="bg-green-600 rounded-lg text-white font-bold px-6 py-2" onClick={goToLogin}> Login </button>
                    </div>
                </div>
            }
            {session &&
                <>
                    <div className="flex justify-between content-center">
                        <div>
                            <p> Nueva Operación </p>
                        </div>
                        <div className='flex gap-2'>
                            <button className="bg-gray-300 text-white p-2" >
                                <Link href={'/inventary'}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                                    </svg>
                                </Link>
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
                        projectInfo && (
                            <OpForm {...projectInfo} />
                        )
                    }
                </>
            }


        </Layout >
    );
}