
import HomeStats from "@/components/HomeStats";
import UserInfo from "@/components/UserInfo";
import Layout from "@/components/layout";
import { mongooseConnect } from "@/lib/mongoose";
import Operation from "@/models/Operation";
import Project from "@/models/Projects";
import HomeStandard from "@/components/HomeStandard";
import HomeButtons from "@/components/HomeButtons";
import HomeTD from "@/components/HomeTD";


// TRAIGO LOS PROYECTOS CON GET SERVER SIDE PROPS PARA PODER USARLOS 
export async function getServerSideProps() {
  await mongooseConnect();
  const operations = await Operation.find({}, null, { sort: { '_id': -1 } });
  const projects = await Project.find({}, null, { sort: { '_id': -1 } });
  return {
      props: {
          operations: JSON.parse(JSON.stringify(operations)),
          projects: JSON.parse(JSON.stringify(projects)),
      }
  };
}

export default function Home({operations, projects}) {

  const projectsOk = projects.filter(proj => proj.status != "On hold")

  return (
    <Layout>
      <UserInfo/>
      <HomeStandard projects={projectsOk} operations={operations}/>
      <HomeButtons projects={projectsOk}/>
      <HomeTD projects={projectsOk} />
      <HomeStats operations={operations}/>
    </Layout>
  )
}