
import OpForm from '@/components/OpForm';
import Spinner from '@/components/Spinner';
import Layout from '@/components/layout';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function EditOperationPage() {

  const { data: session } = useSession();
  // traemos la informacion del producto 
  const [opInfo, setOpInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // DEFINO ESTADO PARA MANJEAR EL PROYECTO RELACIONADO CUANDO EDITO UNA OPERACION 
  const [relatedProjectInfo, setRelatedProjectInfo] = useState('');

  const router = useRouter();

  function goBack() {
    router.back()
  }
  // traemos la propiedad id, de router.query, ya que nos fiamos previamente con un console log donde estaba el file [...id]  que creamos con console.log({router});
  const { id } = router.query;

  const relatedProjectID = opInfo?.proyecto

  // SI HAY UN PROYECTO RELACIONADO, HAGO USE EFFECT Y TRAIGO DE LA BASE DE DATOS LA INFO DE ESE PROYECTO 
  useEffect(() => {
    if (!relatedProjectID) {
      return;
    }
    axios.get('/api/projects?id=' + relatedProjectID).then(response => {
      setRelatedProjectInfo(response.data);
    })
  }, [relatedProjectID]);


  // TRAGIO DE LA DB LA INFO DE LA OPERACION ENTERA 
  useEffect(() => {
    if (!id) {
      return;
    }
    setIsLoading(true);
    axios.get('/api/operations?id=' + id).then(response => {
      setOpInfo(response.data);
      setIsLoading(false);
    })
  }, [id]);

  function goToLogin() {
    router.push('/login')
  }

  function deleteOperation(id) {
    // agrego los botones y opciones segun la libreria sweet
    Swal.fire({
      icon: "warning",
      title: 'Are you sure?',
      text: `Do you want to delete this Operation?`,
      footer: `Note: These ${opInfo?.quantity} credits will be returned (sale) or extracted (purchase) to the inventory.`,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes, Delete!',
      confirmButtonColor: '#d55',
      reverseButtons: true,
    }).then(async result => {
      // hacemos console log del result y vemos que opcion es cada una. 
      if (result.isConfirmed) {
        await axios.delete('/api/operations?id=' + id);
        if (opInfo?.transaction === 'Sale') {
          const total = Number(relatedProjectInfo?.volumen) + Number(opInfo?.quantity);
          const dataSuma = {
            volumen: total,
          }
          await axios.put('/api/projects', { ...dataSuma, _id: relatedProjectID });
        } else if (opInfo?.transaction === 'Purchase') {
          const total = Number(relatedProjectInfo?.volumen) - Number(opInfo?.quantity);
          const dataResta = {
            volumen: total,
          }
          await axios.put('/api/projects', { ...dataResta, _id: relatedProjectID });
        }
        router.push('/operations');
      }
    });
  }

  return (
    <Layout>
      {!session &&
        <div className="flex justify-center">
          <div className="shadow-md p-3 bg-zince-300/10 flex items-center gap-2 m-3">
            <h1>You must be logged in to handle inventory</h1>
            <button className="bg-secondary rounded-lg text-white font-bold px-6 py-2" onClick={goToLogin}> Login </button>
          </div>
        </div>
      }
      {session &&
        <>
          <div className="flex justify-between content-center">
            <div>
              <p> Edit Operation </p>
            </div>
            <div className='flex gap-2'>
              <button onClick={goBack} className="bg-gray-300 text-white px-3 py-1 ms-1 mt-1 rounded shadow-sm hover:bg-gray-200" >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                  </svg>
              </button>
              <button onClick={() => deleteOperation(id)} className="bg-red-300 text-white px-3 py-1 ms-1 mt-1 rounded shadow-sm hover:bg-red-200" >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
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
            opInfo && (
              <OpForm {...opInfo} relatedProjectID={relatedProjectID} />
            )
          }
        </>
      }


    </Layout >
  );
}