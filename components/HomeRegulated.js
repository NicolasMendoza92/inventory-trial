import { ProjectSearchContext } from "@/context/ProjectSearchContext";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export default function HomeRegulated({ projects }) {

    const { setFiltersMui } = useContext(ProjectSearchContext);
    const router = useRouter();


    const handleBtnColombia = () => {
        setFiltersMui(prevFilters => ({ ...prevFilters, regulatedMarket: ['Colombia'] })); // Actualiza con el valor deseado
        router.push('/searchProjects');
    };

    const handleBtnChile = () => {
        setFiltersMui(prevFilters => ({ ...prevFilters, regulatedMarket: ['Chile'] })); // Actualiza con el valor deseado
        router.push('/searchProjects');
    };
    const handleBtnQueretaro = () => {
        setFiltersMui(prevFilters => ({ ...prevFilters, regulatedMarket: ['Queretaro'] })); // Actualiza con el valor deseado
        router.push('/searchProjects');
    };

    // CDM PROJECTS
    const colombiaProjects = projects.filter(p => p.regulatedMarket === 'Colombia')
    const colombiaProjectsOwn = projects.filter(p => p.regulatedMarket === 'Colombia' && p.contrato === 'Contrato')
    const colombiaProjectsMkt = projects.filter(p => p.regulatedMarket === 'Colombia' && p.contrato === 'MKT')

    const queretaroProjects = projects.filter(p => p.regulatedMarket === 'Queretaro')
    const queretaroProjectsOwn = projects.filter(p => p.regulatedMarket === 'Queretaro' && p.contrato === 'Contrato')
    const queretaroProjectsMkt = projects.filter(p => p.regulatedMarket === 'Queretaro' && p.contrato === 'MKT')

    const chileProjects = projects.filter(p => p.regulatedMarket === 'Chile')
    const chileProjectsOwn = projects.filter(p => p.regulatedMarket === 'Chile' && p.contrato === 'Contrato')
    const chileProjectsMkt = projects.filter(p => p.regulatedMarket === 'Chile' && p.contrato === 'MKT')

    // despues de crear el array con map de los totales, se los suma usnado reduce
    const colombiaVolume = colombiaProjects.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const colombiaVolumeOwn = colombiaProjectsOwn.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const colombiaVolumeMkt = colombiaProjectsMkt.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);

    const queretaroVolume = queretaroProjects.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const queretaroVolumeOwn = queretaroProjectsOwn.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const queretaroVolumeMkt = queretaroProjectsMkt.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);

    const chileVolume = chileProjects.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const chileVolumeOwn = chileProjectsOwn.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const chileVolumeMkt = chileProjectsMkt.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);


    return (
        <div className="p-3">
            <h1 className="home-stats-titles mt-3">Regulated Market</h1>
            <div className="board-grid">
                <div onClick={handleBtnColombia} className="board-card-2">
                    <div className="board-title-alert ">COLOMBIA</div>
                    <div className="board-number">{colombiaVolume.toLocaleString('es-ES')}</div>
                    <div className="board-desc">belonging to {colombiaProjects.length} projects. </div>
                    <div className="flex justify-center gap-3">
                        <div>
                            <span className="text-xs text-gray-700">Own</span>
                            <div className="text-2xl font-bold text-green-600">{colombiaVolumeOwn.toLocaleString('es-ES')}</div>
                        </div>
                        <div>
                            <span className="text-xs text-gray-700">MKT Agreement</span>
                            <div className="text-2xl font-bold text-green-600">{colombiaVolumeMkt.toLocaleString('es-ES')}</div>
                        </div>
                    </div>
                </div>
                <div onClick={handleBtnChile} className="board-card-2">
                    <h3 className="board-title-alert ">CHILE</h3>
                    <div className="board-number">{chileVolume.toLocaleString('es-ES')}</div>
                    <div className="board-desc">belonging to {chileProjects.length} projects. </div>
                    <div className="flex justify-center gap-3">
                        <div>
                            <span className="text-xs text-gray-700">Own</span>
                            <div className="text-2xl font-bold text-green-600">{chileVolumeOwn.toLocaleString('es-ES')}</div>
                        </div>
                        <div>
                            <span className="text-xs text-gray-700">MKT Agreement</span>
                            <div className="text-2xl font-bold text-green-600">{chileVolumeMkt.toLocaleString('es-ES')}</div>
                        </div>
                    </div>
                </div>
                <div onClick={handleBtnQueretaro} className="board-card-2">
                    <h3 className="board-title-alert">QUERETARO</h3>
                    <div className="board-number">{queretaroVolume.toLocaleString('es-ES')}</div>
                    <div className="board-desc">belonging to {queretaroProjects.length} projects. </div>
                    <div className="flex justify-center gap-3">
                        <div>
                            <span className="text-xs text-gray-700">Own</span>
                            <div className="text-2xl font-bold text-green-600">{queretaroVolumeOwn.toLocaleString('es-ES')}</div>
                        </div>
                        <div>
                            <span className="text-xs text-gray-700">MKT Agreement</span>
                            <div className="text-2xl font-bold text-green-600">{queretaroVolumeMkt.toLocaleString('es-ES')}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

