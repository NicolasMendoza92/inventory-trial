import Layout from '@/components/layout'
import Spinner from '@/components/Spinner';
import { ProjectSearchContext } from '@/context/ProjectSearchContext';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'

export default function techDeparment() {

  const { data: session } = useSession();
  const { setProjectSearched } = useContext(ProjectSearchContext);

  const router = useRouter();

  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    getProjects();
  }, [])

  async function getProjects() {
    setIsLoading(true)
    await axios.get('/api/allprojects').then(res => {
      setProjects(res.data.projects);
      setIsLoading(false)
    })
  }


  const handleBtnNbsAfrica = () => {
    setProjectSearched('NBS AFRICA');
    router.push('/techDeparment/tdProjects');
  };

  const handleBtnNbsLac = () => {
    setProjectSearched('NBS LAC');
    router.push('/techDeparment/tdProjects');
  };
  const handleBtnNbsSpain = () => {
    setProjectSearched('NBS SPAIN');
    router.push('/techDeparment/tdProjects');
  };
  const handleBtnPlastic = () => {
    setProjectSearched('PLASTIC');
    router.push('/techDeparment/tdProjects');
  };
  const handleBtnTbs = () => {
    setProjectSearched('TBS');
    router.push('/techDeparment/tdProjects');
  };
  const handleBtnOngoing = () => {
    setProjectSearched('Ongoing');
    router.push('/techDeparment/tdProjects');
  };
  const handleBtnComplete = () => {
    setProjectSearched('Complete');
    router.push('/techDeparment/tdProjects');
  };
  const handleBtnForecasted = () => {
    setProjectSearched('Forecasted');
    router.push('/techDeparment/tdProjects');
  };
  const handleBtnCancelled = () => {
    setProjectSearched('Cancelled');
    router.push('/techDeparment/tdProjects');
  };
  const handleBtnOnhold = () => {
    setProjectSearched('On hold');
    router.push('/techDeparment/tdProjects');
  };

  // TD PROJECTS BY STATUS
  const tdProjects = projects.filter(p => p.tdInfo === 'Yes')
  const tdProjectsOngoing = projects.filter(p => p.tdInfo === 'Yes' && p.status === 'Ongoing')
  const tdProjectsCompleted = projects.filter(p => p.tdInfo === 'Yes' && p.status === 'Completed')
  const tdProjectsCancelled = projects.filter(p => p.tdInfo === 'Yes' && p.status === 'Cancelled')
  const tdProjectsForecasted = projects.filter(p => p.tdInfo === 'Yes' && p.status === 'Forecasted')
  const tdProjectsOnhold = projects.filter(p => p.tdInfo === 'Yes' && p.status === 'On hold')

  // TD PROJECTS BY SECTOR
  const tdProjectsNbsAfrica = tdProjects.filter(p => p.sectorTD === 'NBS AFRICA')
  const tdProjectsNbsLac = tdProjects.filter(p => p.sectorTD === 'NBS LAC')
  const tdProjectsNbsSpain = tdProjects.filter(p => p.sectorTD === 'NBS SPAIN')
  const tdProjectsPlastic = tdProjects.filter(p => p.sectorTD === 'PLASTIC')
  const tdProjectsTbs = tdProjects.filter(p => p.sectorTD === 'TBS')

  // TD PROJECTS ONGOING BY STAGE
  const tdProjectsStage1 = tdProjectsOngoing.filter(p => p.stage === 'Stage 1 - Elaboration of documentation')
  const tdProjectsStage2 = tdProjectsOngoing.filter(p => p.stage === 'Stage 2 - Validation/Verification process')
  const tdProjectsStage3 = tdProjectsOngoing.filter(p => p.stage === 'Stage 3 - Standard Assessment')
  const tdProjectsUI = tdProjectsOngoing.filter(p => p.stage === 'Under implementation')
  const tdProjectsFS = tdProjectsOngoing.filter(p => p.stage === 'Feasibility Study')

  // VOLUMEN OF PROJECTS BY STATUS
  const tdProjectsVol = tdProjects.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);

  const tdProjectsOngoingVol = tdProjectsOngoing.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
  const tdProjectsCompletedVol = tdProjectsCompleted.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
  const tdProjectsCancelledVol = tdProjectsCancelled.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
  const tdProjectsForecastedVol = tdProjectsForecasted.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
  const tdProjectsOnholdVol = tdProjectsOnhold.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);

  // VOLUMEN BY SECTOR
  const tdProjectsNbsAfricaVol = tdProjectsNbsAfrica.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
  const tdProjectsNbsLacVol = tdProjectsNbsLac.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
  const tdProjectsNbsSpainVol = tdProjectsNbsSpain.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
  const tdProjectsPlasticVol = tdProjectsPlastic.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
  const tdProjectsTbsVol = tdProjectsTbs.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);

  // VOLUMEN BY STAGE
  const tdProjectsStage1Vol = tdProjectsStage1.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
  const tdProjectsStage2Vol = tdProjectsStage2.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
  const tdProjectsStage3Vol = tdProjectsStage3.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
  const tdProjectsUIVol = tdProjectsUI.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
  const tdProjectsFSVol = tdProjectsFS.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);


  return (
    <Layout>
      {isLoading ? <div className='flex justify-center items-center m-auto'><Spinner /></div> : <>
        <div className='flex justify-center'>
          <Link className=" bg-secondary text-white px-3 py-1 ms-1 mt-1 rounded shadow-sm hover:bg-secondary/50 " href={'/techDeparment/tdProjects'}> See Project list</Link>
        </div>

        <div className="p-3">
          <h1 className="home-stats-titles mt-3">SECTOR</h1>
          <div className="board-grid">
            <div onClick={handleBtnNbsAfrica} className="board-card-2">
              <h3 className="board-title-alert ">NBS AFRICA</h3>
              <div className="board-number">{tdProjectsNbsAfricaVol.toLocaleString('es-ES')}</div>
              <div className="board-desc">belonging to {tdProjectsNbsAfrica.length} projects. </div>
            </div>
            <div onClick={handleBtnNbsLac} className="board-card-2">
              <div className="board-title-alert ">NBS LAC</div>
              <div className="board-number">{tdProjectsNbsLacVol.toLocaleString('es-ES')}</div>
              <div className="board-desc">belonging to {tdProjectsNbsLac.length} projects. </div>
            </div>
            <div onClick={handleBtnNbsSpain} className="board-card-2">
              <h3 className="board-title-alert">NBS SPAIN</h3>
              <div className="board-number">{tdProjectsNbsSpainVol.toLocaleString('es-ES')}</div>
              <div className="board-desc">belonging to {tdProjectsNbsSpain.length} projects. </div>
            </div>
            <div onClick={handleBtnPlastic} className="board-card-2">
              <h3 className="board-title-alert">PLASTIC</h3>
              <div className="board-number">{tdProjectsPlasticVol.toLocaleString('es-ES')}</div>
              <div className="board-desc">belonging to {tdProjectsPlastic.length} projects. </div>
            </div>
            <div onClick={handleBtnTbs} className="board-card-2">
              <h3 className="board-title-alert">TBS</h3>
              <div className="board-number">{tdProjectsTbsVol.toLocaleString('es-ES')}</div>
              <div className="board-desc">belonging to {tdProjectsTbs.length} projects. </div>
            </div>
          </div>
          <h1 className="home-stats-titles mt-3">STATUS</h1>
          <div className="board-grid">
            <div onClick={handleBtnComplete} className="board-card-2">
              <h3 className="board-title-alert ">COMPLETE</h3>
              <div className="board-number">{tdProjectsCompletedVol.toLocaleString('es-ES')}</div>
              <div className="board-desc">belonging to {tdProjectsCompleted.length} projects. </div>
            </div>
            <div onClick={handleBtnOngoing} className="board-card-2">
              <div className="board-title-alert ">ONGOING</div>
              <div className="board-number">{tdProjectsOngoingVol.toLocaleString('es-ES')}</div>
              <div className="board-desc">belonging to {tdProjectsOngoing.length} projects. </div>
            </div>
            <div onClick={handleBtnForecasted} className="board-card-2">
              <h3 className="board-title-alert">FORECASTED</h3>
              <div className="board-number">{tdProjectsForecastedVol.toLocaleString('es-ES')}</div>
              <div className="board-desc">belonging to {tdProjectsForecasted.length} projects. </div>
            </div>
            <div onClick={handleBtnOnhold} className="board-card-2">
              <h3 className="board-title-alert">ON HOLD</h3>
              <div className="board-number">{tdProjectsOnholdVol.toLocaleString('es-ES')}</div>
              <div className="board-desc">belonging to {tdProjectsOnhold.length} projects. </div>
            </div>
            <div onClick={handleBtnCancelled} className="board-card-2">
              <h3 className="board-title-alert">CANCELLED</h3>
              <div className="board-number">{tdProjectsCancelledVol.toLocaleString('es-ES')}</div>
              <div className="board-desc">belonging to {tdProjectsCancelled.length} projects. </div>
            </div>
          </div>

        </div>
        <div className="p-3">
          <h1 className="home-stats-titles mt-3">ONGOING STAGE</h1>
          <div className="board-grid">
            <div className="board-card">
              <div className="board-title-alert ">Stage 1-Elaboration of documentation</div>
              <div className="board-number">{tdProjectsStage1Vol.toLocaleString('es-ES')}</div>
              <div className="board-desc">belonging to {tdProjectsStage1.length} projects. </div>
            </div>
            <div className="board-card">
              <h3 className="board-title-alert ">Stage 2-Validation/Verification process</h3>
              <div className="board-number">{tdProjectsStage2Vol.toLocaleString('es-ES')}</div>
              <div className="board-desc">belonging to {tdProjectsStage2.length} projects. </div>
            </div>
            <div className="board-card">
              <h3 className="board-title-alert">Stage 3-Standard Assessment</h3>
              <div className="board-number">{tdProjectsStage3Vol.toLocaleString('es-ES')}</div>
              <div className="board-desc">belonging to {tdProjectsStage3.length} projects. </div>
            </div>
            <div className="board-card">
              <h3 className="board-title-alert">Under implementation</h3>
              <div className="board-number">{tdProjectsUIVol.toLocaleString('es-ES')}</div>
              <div className="board-desc">belonging to {tdProjectsUI.length} projects. </div>
            </div>
            <div className="board-card">
              <h3 className="board-title-alert">Feasibility Study</h3>
              <div className="board-number">{tdProjectsFSVol.toLocaleString('es-ES')}</div>
              <div className="board-desc">belonging to {tdProjectsFS.length} projects. </div>
            </div>
          </div>
        </div>
      </>}

    </Layout>
  )
}
