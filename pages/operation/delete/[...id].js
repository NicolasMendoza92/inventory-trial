
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "@/components/layout";

export default function DeleteOpertionPage() {
    const router = useRouter();
    const { id } = router.query;

    const [opInfo, setOpInfo] = useState('');
    
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/api/operations?id=' + id).then(response => {
            setOpInfo(response.data);
        });
    }, [id]);

    function goBack() {
        router.push(`/operations`);
    }

    async function deleteProject() {
        await axios.delete('/api/operations?id=' + id);
        router.push('/operations')
    }
    return (
        <Layout>
            <h1 className="text-center">¿Estas seguro de eliminar la operacion  de {opInfo?.transaction} <br/> con {opInfo?.cliente} ?</h1>
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