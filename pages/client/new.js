import ClientForm from "@/components/ClientForm";
import Layout from "@/components/layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";


export default function NewClient() {

    const { data: session } = useSession();

    const router = useRouter();
    function goToLogin() {
        router.push('/login')
    }

    function goBack() {
        router.push('/clients');
    }
    return (
        <Layout>
            {!session &&
                <div className="flex justify-center">
                    <div className="shadow-md p-3 bg-zince-300/10 flex items-center gap-2 m-3">
                        <h1>You must be logged in to add new clients</h1>
                        <button className="bg-green-600 rounded-lg text-white font-bold px-6 py-2" onClick={goToLogin}> Login </button>
                    </div>
                </div>
            }
            {session &&
                <>
                    <div className="flex justify-between content-center">
                        <div>
                            <p> New Client </p>
                        </div>
                        <div>
                            <button onClick={goBack} className='bg-gray-300 text-white px-3 py-1 ms-1 mt-1 rounded shadow-sm hover:bg-gray-200'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <ClientForm />
                </>
            }

            
        </Layout>
    );
}