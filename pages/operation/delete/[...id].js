
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "@/components/layout";
import Swal from "sweetalert2";

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
            <p className="text-center mb-2">¿Estas seguro de eliminar la operacion  de {opInfo?.transaction} <br /> con {opInfo?.cliente} ?</p>
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
            <br /><hr />
            <h1 className="text-center">Recuerda que esta operación ya impacto en el inventario, por lo que deberas ajustarlo manualmente.</h1>
            {opInfo?.transaction === 'Venta' && (
                <div className="text-center"> En este caso, deberias sumar <b>{opInfo?.quantity}</b> creditos al inventario</div>
            )}
            {opInfo?.transaction === 'Compra' && (
                <div className="text-center">En este caso, deberias restar <b>{opInfo?.quantity}</b> creditos del inventario</div>
            )}
        </Layout>
    );
}