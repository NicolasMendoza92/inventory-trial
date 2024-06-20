import { ProjectSearchContext } from "@/context/ProjectSearchContext";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function HomeStandard({ projects, operations }) {

    const { setProjectSearched } = useContext(ProjectSearchContext);
    const router = useRouter();

    const handleBtnCdm = () => {
        setProjectSearched('cdm');
        router.push('/inventary'); // Ajusta la ruta según tu configuración de enrutamiento
      };

    // Deliveries and payment del dia de hoy 
    const deliverToday = operations.filter(op => moment(op.deliveryDate).isSame(new Date(), 'day'));
    const payToday = operations.filter(op => moment(op.paymentDate).isSame(new Date(), 'day'));


    const cdmProjects = projects.filter(p => p.standar === 'CDM')
    const vcsProjects = projects.filter(p => p.standar === 'VCS')
    const gsProjects = projects.filter(p => p.standar === 'GS')
    const irecsProjects = projects.filter(p => p.standar === 'I-RECs')
    const cercarbonoProjects = projects.filter(p => p.standar === 'CERCARBONO')
    const csaProjects = projects.filter(p => p.standar === 'CSA')
    const carProjects = projects.filter(p => p.standar === 'CAR')
    const bioCarbonProjects = projects.filter(p => p.standar === 'BioCarbon')
    const planVivoProjects = projects.filter(p => p.standar === 'PLAN VIVO')

    // despues de crear el array con map de los totales, se los suma usnado reduce
    const cdmVolume = cdmProjects.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const vcsVolume = vcsProjects.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const gsVolume = gsProjects.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const irecsVolume = irecsProjects.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const cercarbonoVolume = cercarbonoProjects.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const csaVolume = csaProjects.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const carVolume  = carProjects .map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const bioCarbonVolume = bioCarbonProjects.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const planVivoVolume = planVivoProjects.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);

    return (
        <div className="">
            {(deliverToday.length > 0 || payToday.length > 0) ? (
                <h1 className='board-card-alert adverts-pending text-center my-3'>You have <b style={{ color: 'red', fontSize: '25px' }}>{deliverToday.length}</b> deliveries and <b style={{ color: 'red', fontSize: '25px' }} >{payToday.length}</b> payments pendings that require your action TODAY</h1>
            ) : null}
            <h1 className="home-stats-titles">Available by standard</h1>
            <div className="board-grid">
                <div onClick={handleBtnCdm} className="board-card-link">
                    <h3 className="board-title-std ">CDM</h3>
                    <div className="board-number">{cdmVolume.toLocaleString('es-ES')}</div>
                    <div className="board-desc">belonging to {cdmProjects.length} projects. </div>
                </div>
                <div className="board-card">
                    <h3 className="board-title-std ">VCS</h3>
                    <div className="board-number">{vcsVolume.toLocaleString('es-ES')}</div>
                    <div className="board-desc">belonging to {vcsProjects.length} projects. </div>
                </div>
                <div className="board-card">
                    <h3 className="board-title-std">GS</h3>
                    <div className="board-number">{gsVolume.toLocaleString('es-ES')}</div>
                    <div className="board-desc">belonging to {gsProjects.length} projects. </div>
                </div>
                <div className="board-card">
                    <h3 className="board-title-std">CERCARBONO</h3>
                    <div className="board-number">{cercarbonoVolume.toLocaleString('es-ES')}</div>
                    <div className="board-desc">belonging to {cercarbonoProjects.length} projects. </div>
                </div>
                <div className="board-card">
                    <h3 className="board-title-std">CAR</h3>
                    <div className="board-number">{carVolume.toLocaleString('es-ES')}</div>
                    <div className="board-desc">belonging to {csaProjects.length} projects. </div>
                </div>
                <div className="board-card">
                    <h3 className="board-title-std">I-RECs</h3>
                    <div className="board-number">{irecsVolume.toLocaleString('es-ES')}</div>
                    <div className="board-desc">belonging to {irecsProjects.length} projects. </div>
                </div>
                <div className="board-card">
                    <h3 className="board-title-std">BIO CARBON</h3>
                    <div className="board-number">{bioCarbonVolume.toLocaleString('es-ES')}</div>
                    <div className="board-desc">belonging to {bioCarbonProjects.length} projects. </div>
                </div>
                <div className="board-card">
                    <h3 className="board-title-std">CSA</h3>
                    <div className="board-number">{csaVolume.toLocaleString('es-ES')}</div>
                    <div className="board-desc">belonging to {csaProjects.length} projects. </div>
                </div>
                <div className="board-card">
                    <h3 className="board-title-std">PLAN VIVO</h3>
                    <div className="board-number">{planVivoVolume.toLocaleString('es-ES')}</div>
                    <div className="board-desc">belonging to {planVivoProjects.length} projects. </div>
                </div>    
            </div>
        </div>

    )
}

