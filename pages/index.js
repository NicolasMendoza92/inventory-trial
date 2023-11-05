
import HomeStats from "@/components/HomeStats";
import UserInfo from "@/components/UserInfo";
import Layout from "@/components/layout";
import { mongooseConnect } from "@/lib/mongoose";
import Operation from "@/models/Operation";

// TRAIGO LOS PROYECTOS CON GET SERVER SIDE PROPS PARA PODER USARLOS 
export async function getServerSideProps() {
  await mongooseConnect();
  const operations = await Operation.find({}, null, { sort: { '_id': -1 } });
  return {
      props: {
          operations: JSON.parse(JSON.stringify(operations)),
      }
  };
}

export default function Home({operations}) {

  return (
    <Layout>
      <UserInfo/>
      <HomeStats operations={operations}/>
    </Layout>
  )
}