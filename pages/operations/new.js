import OperationForm from "@/components/OperationForm";
import Layout from "@/components/layout";
import { mongooseConnect } from "@/lib/mongoose";
import Project from "@/models/Projects";
import { useRouter } from "next/router";


export default function NewOperation({projects}) {

    const router = useRouter();

    function goBack() {
        router.push('/operations');
    }
    return (
        <Layout>
            <div className="flex justify-between content-center">
                <div>
                    <h1> Nueva Operacion </h1>
                </div>
                <div>
                    <button onClick={goBack} className='btn-default'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                        </svg>
                    </button>
                </div>
            </div>
            <OperationForm projects={projects} />
        </Layout>
    );
}

// TRAIGO LOS PROYECTOS CON GET SERVER SIDE PROPS PARA PODER USARLOS 
export async function getServerSideProps() {
    await mongooseConnect();
    const projects = await Project.find({}, null, { sort: { 'projectID': 1 } });
  
    return {
        props: {
            projects: JSON.parse(JSON.stringify(projects)),
        }
    };
  }