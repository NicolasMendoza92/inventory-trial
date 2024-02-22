
// import { TableOperations } from '@/components/TableOperations';
// import Layout from '@/components/layout';
// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/router';


// export default function Calendar() {

//   const { data: session } = useSession();

//   const router = useRouter();
//   function goToLogin() {
//     router.push('/login')
//   }


//   return (
//     <Layout>
//       {!session &&
//         <div className="flex justify-center">
//           <div className="shadow-md p-3 bg-zince-300/10 flex items-center gap-2 m-3">
//             <h1>You must be logged in to handle the calendar</h1>
//             <button className="bg-green-600 rounded-lg text-white font-bold px-6 py-2" onClick={goToLogin}> Login </button>
//           </div>
//         </div>
//       }
//       {session &&
//         <>
//           <div>         
//             <TableOperations/>
//           </div>
//         </>}

//     </Layout>
//   )
// }

// TRAIGO LOS PROYECTOS CON GET SERVER SIDE PROPS PARA PODER USARLOS 

// export async function getServerSideProps() {
//   await mongooseConnect();
//   const operations = await Operation.find({}, null, { sort: { 'deliveryDate': 1 } })
//     .populate('proyecto', {
//       projectID: 1,
//       name: 1,
//       standar: 1,
//       vintage: 1,
//     });

//   return {
//     props: {
//       operations: JSON.parse(JSON.stringify(operations)),

//     }
//   };
// }