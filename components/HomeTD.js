import { ProjectSearchContext } from "@/context/ProjectSearchContext";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export default function HomeTD({ projects }) {

    const { setProjectSearched } = useContext(ProjectSearchContext);
    const router = useRouter();


    const handleBtnComplete = () => {
        setProjectSearched('Complete');
    router.push('/techDeparment/tdProjects');
    };

    const handleBtnOngoing = () => {
        setProjectSearched('Ongoing');
    router.push('/techDeparment/tdProjects');
    };
    const handleBtnOnHold = () => {
        setProjectSearched('Forecasted');
    router.push('/techDeparment/tdProjects');
    };

    // TD PROJECTS BY STATUS
    const tdProjects = projects.filter(p => p.tdInfo === 'Yes')
    const tdProjectsOngoing = projects.filter(p => p.tdInfo === 'Yes' && p.status === 'Ongoing')
    const tdProjectsCompleted = projects.filter(p => p.tdInfo === 'Yes' && p.status === 'Completed')
    const tdProjectsForecasted = projects.filter(p => p.tdInfo === 'Yes' && p.status === 'Forecasted')

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
    const tdProjectsForecastedVol = tdProjectsForecasted.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);


    // VOLUMEN BY STAGE
    const tdProjectsStage1Vol = tdProjectsStage1.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const tdProjectsStage2Vol = tdProjectsStage2.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const tdProjectsStage3Vol = tdProjectsStage3.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const tdProjectsUIVol = tdProjectsUI.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const tdProjectsFSVol = tdProjectsFS.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);


    return (
        <>
            <div className="p-3">
                <h1 className="home-stats-titles mt-3">TD PROJECTS</h1>
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
                    <div onClick={handleBtnOnHold} className="board-card-2">
                        <h3 className="board-title-alert">FORECASTED</h3>
                        <div className="board-number">{tdProjectsForecastedVol.toLocaleString('es-ES')}</div>
                        <div className="board-desc">belonging to {tdProjectsForecasted.length} projects. </div>
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
        </>

    )
}