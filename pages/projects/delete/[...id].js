
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "@/components/layout";

export default function DeleteProjectPage() {
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
    return (
        <Layout>
            <h1 className="text-center">¿Estas seguro de eliminar el proyecto <br/> {projectInfo?.projectID} {projectInfo?.standar} {projectInfo?.name}?</h1>
            <div className="flex gap-2 justify-center">
                <button
                    onClick={deleteProject}
                    className="bg-red-300 text-white p-2">
                    Yes
                </button>
                <button
                    className="bg-gray-300 text-white p-2"
                    onClick={goBack}>
                    NO
                </button>
            </div>
        </Layout>
    );
}