
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "@/components/layout";
import { useSession } from "next-auth/react";

export default function DeleteProjectPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const [projectInfo, setProjectInfo] = useState();

    const { id } = router.query;

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/api/projects?id=' + id).then(response => {
            setProjectInfo(response.data);
        });
    }, [id]);

    function goBack() {
        router.push(`/projects/edit/${id}`);
    }

    async function deleteProject() {
        await axios.delete('/api/projects?id=' + id);
        router.push('/inventary')
    }

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
                    <h1 className="text-center">Are you sure about delete this project? <br /> {projectInfo?.projectID} {projectInfo?.standar} {projectInfo?.name}?</h1>
                    <div className="flex gap-2 justify-center">
                        <button
                            onClick={deleteProject}
                            className="bg-red-300 text-white p-2">
                            Yes
                        </button>
                        <button
                            className="bg-gray-300 text-white p-2"
                            onClick={goBack}>
                            No
                        </button>
                    </div>
                </>
            }

        </Layout>
    );
}