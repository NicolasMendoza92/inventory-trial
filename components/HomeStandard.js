import { ProjectSearchContext } from "@/context/ProjectSearchContext";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export default function HomeStandard({ projects, operations }) {

    const { setProjectSearched } = useContext(ProjectSearchContext);
    const router = useRouter();

    const [showMoreCdm, setShowMoreCdm] = useState(false);
    const [showMoreVcs, setShowMoreVcs] = useState(false);
    const [showMoreGs, setShowMoreGs] = useState(false);
    const [showMoreCer, setShowMoreCer] = useState(false);
    const [showMoreCar, setShowMoreCar] = useState(false);
    const [showMoreIrec, setShowMoreIrec] = useState(false);
    const [showMorePlan, setShowMorePlan] = useState(false);
    const [showMoreCsa, setShowMoreCsa] = useState(false);
    const [showMoreBio, setShowMoreBio] = useState(false);

    const handleBtnCdm = () => {
        setProjectSearched('cdm');
        router.push('/inventary'); // Ajusta la ruta según tu configuración de enrutamiento
    };
    const handleBtnVcs = () => {
        setProjectSearched('vcs');
        router.push('/inventary'); // Ajusta la ruta según tu configuración de enrutamiento
    };
    const handleBtnGs = () => {
        setProjectSearched('GS');
        router.push('/inventary'); // Ajusta la ruta según tu configuración de enrutamiento
    };
    const handleBtnCer = () => {
        setProjectSearched('Cercarbono');
        router.push('/inventary'); // Ajusta la ruta según tu configuración de enrutamiento
    };
    const handleBtnCar = () => {
        setProjectSearched('car');
        router.push('/inventary'); // Ajusta la ruta según tu configuración de enrutamiento
    };
    const handleBtnIrec = () => {
        setProjectSearched('i-recs');
        router.push('/inventary'); // Ajusta la ruta según tu configuración de enrutamiento
    };
    const handleBtnCsa = () => {
        setProjectSearched('CSA');
        router.push('/inventary'); // Ajusta la ruta según tu configuración de enrutamiento
    };
    const handleBtnPlan = () => {
        setProjectSearched('plan vivo');
        router.push('/inventary'); // Ajusta la ruta según tu configuración de enrutamiento
    };
    const handleBtnBio = () => {
        setProjectSearched('Bio carbon');
        router.push('/inventary'); // Ajusta la ruta según tu configuración de enrutamiento
    };

    // Deliveries and payment del dia de hoy 
    const deliverToday = operations.filter(op => moment(op.deliveryDate).isSame(new Date(), 'day'));
    const payToday = operations.filter(op => moment(op.paymentDate).isSame(new Date(), 'day'));

    // CDM PROJECTS
    const cdmProjects = projects.filter(p => p.standar === 'CDM')
    const cdmProjectsNow = projects.filter(p => p.standar === 'CDM' && p.stock === 'Now')
    const cdmProjectsFuture = projects.filter(p => p.standar === 'CDM' && p.stock === 'Future')
    const cdmProjectsOwn = projects.filter(p => p.standar === 'CDM' && p.contrato === 'Contrato')
    const cdmProjectsMkt = projects.filter(p => p.standar === 'CDM' && p.contrato === 'MKT')
    const cdmProjectsMisha = projects.filter(p => p.standar === 'CDM' && p.misha === 'YES')

    // VCS PROJECTS
    const vcsProjects = projects.filter(p => p.standar === 'VCS')
    const vcsProjectsNow = projects.filter(p => p.standar === 'VCS' && p.stock === 'Now')
    const vcsProjectsFuture = projects.filter(p => p.standar === 'VCS' && p.stock === 'Future')
    const vcsProjectsOwn = projects.filter(p => p.standar === 'VCS' && p.contrato === 'Contrato')
    const vcsProjectsMkt = projects.filter(p => p.standar === 'VCS' && p.contrato === 'MKT')
    const vcsProjectsMisha = projects.filter(p => p.standar === 'VCS' && p.misha === 'YES')

    // GS PROJECTS
    const gsProjects = projects.filter(p => p.standar === 'GS')
    const gsProjectsNow = projects.filter(p => p.standar === 'GS' && p.stock === 'Now')
    const gsProjectsFuture = projects.filter(p => p.standar === 'GS' && p.stock === 'Future')
    const gsProjectsOwn = projects.filter(p => p.standar === 'GS' && p.contrato === 'Contrato')
    const gsProjectsMkt = projects.filter(p => p.standar === 'GS' && p.contrato === 'MKT')
    const gsProjectsMisha = projects.filter(p => p.standar === 'GS' && p.misha === 'YES')

    // IRECS PROJECTS
    const irecsProjects = projects.filter(p => p.standar === 'I-RECs')
    const irecsProjectsNow = projects.filter(p => p.standar === 'I-RECs' && p.stock === 'Now')
    const irecsProjectsFuture = projects.filter(p => p.standar === 'I-RECs' && p.stock === 'Future')
    const irecsProjectsOwn = projects.filter(p => p.standar === 'I-RECs' && p.contrato === 'Contrato')
    const irecsProjectsMkt = projects.filter(p => p.standar === 'I-RECs' && p.contrato === 'MKT')
    const irecsProjectsMisha = projects.filter(p => p.standar === 'I-RECs' && p.misha === 'YES')

    // CERCARBONO PROJECTS
    const cercarbonoProjects = projects.filter(p => p.standar === 'CERCARBONO')
    const cercarbonoProjectsNow = projects.filter(p => p.standar === 'CERCARBONO' && p.stock === 'Now')
    const cercarbonoProjectsFuture = projects.filter(p => p.standar === 'CERCARBONO' && p.stock === 'Future')
    const cercarbonoProjectsOwn = projects.filter(p => p.standar === 'CERCARBONO' && p.contrato === 'Contrato')
    const cercarbonoProjectsMkt = projects.filter(p => p.standar === 'CERCARBONO' && p.contrato === 'MKT')
    const cercarbonoProjectsMisha = projects.filter(p => p.standar === 'CERCARBONO' && p.misha === 'YES')

    // CSA PROJECTS
    const csaProjects = projects.filter(p => p.standar === 'CSA')
    const csaProjectsNow = projects.filter(p => p.standar === 'CSA' && p.stock === 'Now')
    const csaProjectsFuture = projects.filter(p => p.standar === 'CSA' && p.stock === 'Future')
    const csaProjectsOwn = projects.filter(p => p.standar === 'CSA' && p.contrato === 'Contrato')
    const csaProjectsMkt = projects.filter(p => p.standar === 'CSA' && p.contrato === 'MKT')
    const csaProjectsMisha = projects.filter(p => p.standar === 'CSA' && p.misha === 'YES')

    // CAR PROJECTS
    const carProjects = projects.filter(p => p.standar === 'CAR')
    const carProjectsNow = projects.filter(p => p.standar === 'CAR' && p.stock === 'Now')
    const carProjectsFuture = projects.filter(p => p.standar === 'CAR' && p.stock === 'Future')
    const carProjectsOwn = projects.filter(p => p.standar === 'CAR' && p.contrato === 'Contrato')
    const carProjectsMkt = projects.filter(p => p.standar === 'CAR' && p.contrato === 'MKT')
    const carProjectsMisha = projects.filter(p => p.standar === 'CAR' && p.misha === 'YES')

    // BIO CARBON PROJECTS
    const bioCarbonProjects = projects.filter(p => p.standar === 'BioCarbon')
    const bioCarbonProjectsNow = projects.filter(p => p.standar === 'BioCarbon' && p.stock === 'Now')
    const bioCarbonProjectsFuture = projects.filter(p => p.standar === 'BioCarbon' && p.stock === 'Future')
    const bioCarbonProjectsOwn = projects.filter(p => p.standar === 'BioCarbon' && p.contrato === 'Contrato')
    const bioCarbonProjectsMkt = projects.filter(p => p.standar === 'BioCarbon' && p.contrato === 'MKT')
    const bioCarbonProjectsMisha = projects.filter(p => p.standar === 'BioCarbon' && p.misha === 'YES')

    // PLAN VIVO PROJECTS
    const planVivoProjects = projects.filter(p => p.standar === 'PLAN VIVO')
    const planVivoProjectsNow = projects.filter(p => p.standar === 'PLAN VIVO' && p.stock === 'Now')
    const planVivoProjectsFuture = projects.filter(p => p.standar === 'PLAN VIVO' && p.stock === 'Future')
    const planVivoProjectsOwn = projects.filter(p => p.standar === 'PLAN VIVO' && p.contrato === 'Contrato')
    const planVivoProjectsMkt = projects.filter(p => p.standar === 'PLAN VIVO' && p.contrato === 'MKT')
    const planVivoProjectsMisha = projects.filter(p => p.standar === 'PLAN VIVO' && p.misha === 'YES')


    // despues de crear el array con map de los totales, se los suma usnado reduce
    const cdmVolume = cdmProjects.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const cdmVolumeNow = cdmProjectsNow.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const cdmVolumeFuture = cdmProjectsFuture.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const cdmVolumeOwn = cdmProjectsOwn.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const cdmVolumeMkt = cdmProjectsMkt.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const cdmVolumeMisha = cdmProjectsMisha.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const cdmVolumeAll = cdmVolume - cdmVolumeMisha

    const vcsVolume = vcsProjects.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const vcsVolumeNow = vcsProjectsNow.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const vcsVolumeFuture = vcsProjectsFuture.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const vcsVolumeOwn = vcsProjectsOwn.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const vcsVolumeMkt = vcsProjectsMkt.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const vcsVolumeMisha = vcsProjectsMisha.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const vcsVolumeAll = vcsVolume - vcsVolumeMisha

    const gsVolume = gsProjects.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const gsVolumeNow = gsProjectsNow.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const gsVolumeFuture = gsProjectsFuture.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const gsVolumeOwn = gsProjectsOwn.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const gsVolumeMkt = gsProjectsMkt.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const gsVolumeMisha = gsProjectsMisha.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const gsVolumeAll = gsVolume - gsVolumeMisha

    const irecsVolume = irecsProjects.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const irecsVolumeNow = irecsProjectsNow.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const irecsVolumeFuture = irecsProjectsFuture.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const irecsVolumeOwn = irecsProjectsOwn.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const irecsVolumeMkt = irecsProjectsMkt.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const irecsVolumeMisha = irecsProjectsMisha.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const irecsVolumeAll = irecsVolume - irecsVolumeMisha

    const cercarbonoVolume = cercarbonoProjects.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const cercarbonoVolumeNow = cercarbonoProjectsNow.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const cercarbonoVolumeFuture = cercarbonoProjectsFuture.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const cercarbonoVolumeOwn = cercarbonoProjectsOwn.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const cercarbonoVolumeMkt = cercarbonoProjectsMkt.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const cercarbonoVolumeMisha = cercarbonoProjectsMisha.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const cercarbonoVolumeAll = cercarbonoVolume - cercarbonoVolumeMisha

    const csaVolume = csaProjects.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const csaVolumeNow = csaProjectsNow.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const csaVolumeFuture = csaProjectsFuture.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const csaVolumeOwn = csaProjectsOwn.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const csaVolumeMkt = csaProjectsMkt.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const csaVolumeMisha = csaProjectsMisha.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const csaVolumeAll = csaVolume - csaVolumeMisha

    const carVolume = carProjects.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const carVolumeNow = carProjectsNow.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const carVolumeFuture = carProjectsFuture.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const carVolumeOwn = carProjectsOwn.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const carVolumeMkt = carProjectsMkt.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const carVolumeMisha = carProjectsMisha.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const carVolumeAll = carVolume - carVolumeMisha

    const bioCarbonVolume = bioCarbonProjects.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const bioCarbonVolumeNow = bioCarbonProjectsNow.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const bioCarbonVolumeFuture = bioCarbonProjectsFuture.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const bioCarbonVolumeOwn = bioCarbonProjectsOwn.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const bioCarbonVolumeMkt = bioCarbonProjectsMkt.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const bioCarbonVolumeMisha = bioCarbonProjectsMisha.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const bioCarbonVolumeAll = bioCarbonVolume - bioCarbonVolumeMisha

    const planVivoVolume = planVivoProjects.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const planVivoVolumeNow = planVivoProjectsNow.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const planVivoVolumeFuture = planVivoProjectsFuture.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const planVivoVolumeOwn = planVivoProjectsOwn.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const planVivoVolumeMkt = planVivoProjectsMkt.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const planVivoVolumeMisha = planVivoProjectsMisha.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const planVivoVolumeAll = planVivoVolume - planVivoVolumeMisha

    return (
        <div className="">
            {(deliverToday.length > 0 || payToday.length > 0) ? (
                <h1 className='board-card-alert adverts-pending text-center my-3'>You have <b style={{ color: 'red', fontSize: '25px' }}>{deliverToday.length}</b> deliveries and <b style={{ color: 'red', fontSize: '25px' }} >{payToday.length}</b> payments pendings that require your action TODAY</h1>
            ) : null}
            <h1 className="home-stats-titles">Available by standard</h1>
            <div className="board-grid">
                <div className="board-card">
                    <div onClick={handleBtnCdm} className="board-title-std">
                        CDM
                    </div>
                    <div className="board-number">{cdmVolume.toLocaleString('es-ES')}</div>
                    <div className="board-desc">belonging to {cdmProjects.length} projects. </div>
                    <div className="flex justify-center gap-3">
                        <div>
                            <span className="text-xs text-gray-700">Own</span>
                            <div className="text-2xl font-bold text-green-600">{cdmVolumeOwn.toLocaleString('es-ES')}</div>
                        </div>
                        <div>
                            <span className="text-xs text-gray-700">MKT Agreement</span>
                            <div className="text-2xl font-bold text-green-600">{cdmVolumeMkt.toLocaleString('es-ES')}</div>
                        </div>
                    </div>
                    <button onClick={() => setShowMoreCdm(!showMoreCdm)} className="text-xs text-gray-600 font-bold cursor-pointer hover:text-green-600">
                        {showMoreCdm ? 'See Less' : 'See More...'}
                    </button>
                    {showMoreCdm &&
                        <>
                            <div className="board-desc">Procured by </div>
                            <div className="flex justify-center gap-3">
                                <div className="text-2xl font-bold text-green-600 gap-2">
                                    <span className="text-xs text-gray-700 me-1">ALLCOT</span>
                                    {cdmVolumeAll.toLocaleString('es-ES')}
                                </div>
                                <div className="text-2xl font-bold text-green-600 gap-2">
                                    <span className="text-xs text-gray-700 me-1">Misha</span>
                                    {cdmVolumeMisha.toLocaleString('es-ES')}
                                </div>
                            </div>
                            <div className="board-desc">Availability </div>
                            <div className="flex justify-center gap-3">
                                <div className="text-2xl font-bold text-green-600 gap-2">
                                    <span className="text-xs text-gray-700 me-1">Now</span>
                                    {cdmVolumeNow.toLocaleString('es-ES')}
                                </div>
                                <div className="text-2xl font-bold text-green-600 gap-2">
                                    <span className="text-xs text-gray-700 me-1">Future</span>
                                    {cdmVolumeFuture.toLocaleString('es-ES')}
                                </div>
                            </div>
                        </>
                    }
                </div>
                <div className="board-card">
                    <div onClick={handleBtnVcs} className="board-title-std">
                        VCS
                    </div>
                    <div className="board-number">{vcsVolume.toLocaleString('es-ES')}</div>
                    <div className="board-desc">belonging to {vcsProjects.length} projects. </div>
                    <div className="flex justify-center gap-3">
                        <div>
                            <span className="text-xs text-gray-700">Own</span>
                            <div className="text-2xl font-bold text-green-600">{vcsVolumeOwn.toLocaleString('es-ES')}</div>
                        </div>
                        <div>
                            <span className="text-xs text-gray-700">MKT Agreement</span>
                            <div className="text-2xl font-bold text-green-600">{vcsVolumeMkt.toLocaleString('es-ES')}</div>
                        </div>
                    </div>
                    <button onClick={() => setShowMoreVcs(!showMoreVcs)} className="text-xs text-gray-600 font-bold cursor-pointer hover:text-green-600">
                        {showMoreVcs ? 'See Less' : 'See More...'}
                    </button>
                    {showMoreVcs &&
                        <>
                            <div className="board-desc">Procured by </div>
                            <div className="flex justify-center gap-3">
                                <div className="text-2xl font-bold text-green-600 gap-2">
                                    <span className="text-xs text-gray-700 me-1">ALLCOT</span>
                                    {vcsVolumeAll.toLocaleString('es-ES')}
                                </div>
                                <div className="text-2xl font-bold text-green-600 gap-2">
                                    <span className="text-xs text-gray-700 me-1">Misha</span>
                                    {vcsVolumeMisha.toLocaleString('es-ES')}
                                </div>
                            </div>
                            <div className="board-desc">Availability </div>
                            <div className="flex justify-center gap-3">
                                <div className="text-2xl font-bold text-green-600 gap-2">
                                    <span className="text-xs text-gray-700 me-1">Now</span>
                                    {vcsVolumeNow.toLocaleString('es-ES')}
                                </div>
                                <div className="text-2xl font-bold text-green-600 gap-2">
                                    <span className="text-xs text-gray-700 me-1">Future</span>
                                    {vcsVolumeFuture.toLocaleString('es-ES')}
                                </div>
                            </div>
                        </>
                    }
                </div>
                <div className="board-card">
                    <div onClick={handleBtnGs} className="board-title-std">
                       GS
                    </div>
                    <div className="board-number">{gsVolume.toLocaleString('es-ES')}</div>
                    <div className="board-desc">belonging to {gsProjects.length} projects. </div>
                    <div className="flex justify-center gap-3">
                        <div>
                            <span className="text-xs text-gray-700">Own</span>
                            <div className="text-2xl font-bold text-green-600">{gsVolumeOwn.toLocaleString('es-ES')}</div>
                        </div>
                        <div>
                            <span className="text-xs text-gray-700">MKT Agreement</span>
                            <div className="text-2xl font-bold text-green-600">{gsVolumeMkt.toLocaleString('es-ES')}</div>
                        </div>
                    </div>
                    <button onClick={() => setShowMoreGs(!showMoreGs)} className="text-xs text-gray-600 font-bold cursor-pointer hover:text-green-600">
                        {showMoreGs ? 'See Less' : 'See More...'}
                    </button>
                    {showMoreGs &&
                        <>
                            <div className="board-desc">Procured by </div>
                            <div className="flex justify-center gap-3">
                                <div className="text-2xl font-bold text-green-600 gap-2">
                                    <span className="text-xs text-gray-700 me-1">ALLCOT</span>
                                    {gsVolumeAll.toLocaleString('es-ES')}
                                </div>
                                <div className="text-2xl font-bold text-green-600 gap-2">
                                    <span className="text-xs text-gray-700 me-1">Misha</span>
                                    {gsVolumeMisha.toLocaleString('es-ES')}
                                </div>
                            </div>
                            <div className="board-desc">Availability </div>
                            <div className="flex justify-center gap-3">
                                <div className="text-2xl font-bold text-green-600 gap-2">
                                    <span className="text-xs text-gray-700 me-1">Now</span>
                                    {gsVolumeNow.toLocaleString('es-ES')}
                                </div>
                                <div className="text-2xl font-bold text-green-600 gap-2">
                                    <span className="text-xs text-gray-700 me-1">Future</span>
                                    {gsVolumeFuture.toLocaleString('es-ES')}
                                </div>
                            </div>
                        </>
                    }
                </div>
                <div className="board-card">
                    <div onClick={handleBtnCer} className="board-title-std">
                       CERCARBONO
                    </div>
                    <div className="board-number">{cercarbonoVolume.toLocaleString('es-ES')}</div>
                    <div className="board-desc">belonging to {cercarbonoProjects.length} projects. </div>
                    <div className="flex justify-center gap-3">
                        <div>
                            <span className="text-xs text-gray-700">Own</span>
                            <div className="text-2xl font-bold text-green-600">{cercarbonoVolumeOwn.toLocaleString('es-ES')}</div>
                        </div>
                        <div>
                            <span className="text-xs text-gray-700">MKT Agreement</span>
                            <div className="text-2xl font-bold text-green-600">{cercarbonoVolumeMkt.toLocaleString('es-ES')}</div>
                        </div>
                    </div>
                    <button onClick={() => setShowMoreCer(!showMoreCer)} className="text-xs text-gray-600 font-bold cursor-pointer hover:text-green-600">
                        {showMoreCer ? 'See Less' : 'See More...'}
                    </button>
                    {showMoreCer &&
                        <>
                            <div className="board-desc">Procured by </div>
                            <div className="flex justify-center gap-3">
                                <div className="text-2xl font-bold text-green-600 gap-2">
                                    <span className="text-xs text-gray-700 me-1">ALLCOT</span>
                                    {cercarbonoVolumeAll.toLocaleString('es-ES')}
                                </div>
                                <div className="text-2xl font-bold text-green-600 gap-2">
                                    <span className="text-xs text-gray-700 me-1">Misha</span>
                                    {cercarbonoVolumeMisha.toLocaleString('es-ES')}
                                </div>
                            </div>
                            <div className="board-desc">Availability </div>
                            <div className="flex justify-center gap-3">
                                <div className="text-2xl font-bold text-green-600 gap-2">
                                    <span className="text-xs text-gray-700 me-1">Now</span>
                                    {cercarbonoVolumeNow.toLocaleString('es-ES')}
                                </div>
                                <div className="text-2xl font-bold text-green-600 gap-2">
                                    <span className="text-xs text-gray-700 me-1">Future</span>
                                    {cercarbonoVolumeFuture.toLocaleString('es-ES')}
                                </div>
                            </div>
                        </>
                    }
                </div>
                <div className="board-card">
                    <div onClick={handleBtnIrec} className="board-title-std">
                       I-RECS
                    </div>
                    <div className="board-number">{irecsVolume.toLocaleString('es-ES')}</div>
                    <div className="board-desc">belonging to {irecsProjects.length} projects. </div>
                    <div className="flex justify-center gap-3">
                        <div>
                            <span className="text-xs text-gray-700">Own</span>
                            <div className="text-2xl font-bold text-green-600">{irecsVolumeOwn.toLocaleString('es-ES')}</div>
                        </div>
                        <div>
                            <span className="text-xs text-gray-700">MKT Agreement</span>
                            <div className="text-2xl font-bold text-green-600">{irecsVolumeMkt.toLocaleString('es-ES')}</div>
                        </div>
                    </div>
                    <button onClick={() => setShowMoreIrec(!showMoreIrec)} className="text-xs text-gray-600 font-bold cursor-pointer hover:text-green-600">
                        {showMoreIrec ? 'See Less' : 'See More...'}
                    </button>
                    {showMoreIrec &&
                        <>
                            <div className="board-desc">Procured by </div>
                            <div className="flex justify-center gap-3">
                                <div className="text-2xl font-bold text-green-600 gap-2">
                                    <span className="text-xs text-gray-700 me-1">ALLCOT</span>
                                    {irecsVolumeAll.toLocaleString('es-ES')}
                                </div>
                                <div className="text-2xl font-bold text-green-600 gap-2">
                                    <span className="text-xs text-gray-700 me-1">Misha</span>
                                    {irecsVolumeMisha.toLocaleString('es-ES')}
                                </div>
                            </div>
                            <div className="board-desc">Availability </div>
                            <div className="flex justify-center gap-3">
                                <div className="text-2xl font-bold text-green-600 gap-2">
                                    <span className="text-xs text-gray-700 me-1">Now</span>
                                    {irecsVolumeNow.toLocaleString('es-ES')}
                                </div>
                                <div className="text-2xl font-bold text-green-600 gap-2">
                                    <span className="text-xs text-gray-700 me-1">Future</span>
                                    {irecsVolumeFuture.toLocaleString('es-ES')}
                                </div>
                            </div>
                        </>
                    }
                </div>
                <div className="board-card">
                    <div onClick={handleBtnCsa} className="board-title-std">
                       CSA
                    </div>
                    <div className="board-number">{csaVolume.toLocaleString('es-ES')}</div>
                    <div className="board-desc">belonging to {csaProjects.length} projects. </div>
                    <div className="flex justify-center gap-3">
                        <div>
                            <span className="text-xs text-gray-700">Own</span>
                            <div className="text-2xl font-bold text-green-600">{csaVolumeOwn.toLocaleString('es-ES')}</div>
                        </div>
                        <div>
                            <span className="text-xs text-gray-700">MKT Agreement</span>
                            <div className="text-2xl font-bold text-green-600">{csaVolumeMkt.toLocaleString('es-ES')}</div>
                        </div>
                    </div>
                    <button onClick={() => setShowMoreCsa(!showMoreCsa)} className="text-xs text-gray-600 font-bold cursor-pointer hover:text-green-600">
                        {showMoreCsa ? 'See Less' : 'See More...'}
                    </button>
                    {showMoreCsa &&
                        <>
                            <div className="board-desc">Procured by </div>
                            <div className="flex justify-center gap-3">
                                <div className="text-2xl font-bold text-green-600 gap-2">
                                    <span className="text-xs text-gray-700 me-1">ALLCOT</span>
                                    {csaVolumeAll.toLocaleString('es-ES')}
                                </div>
                                <div className="text-2xl font-bold text-green-600 gap-2">
                                    <span className="text-xs text-gray-700 me-1">Misha</span>
                                    {csaVolumeMisha.toLocaleString('es-ES')}
                                </div>
                            </div>
                            <div className="board-desc">Availability </div>
                            <div className="flex justify-center gap-3">
                                <div className="text-2xl font-bold text-green-600 gap-2">
                                    <span className="text-xs text-gray-700 me-1">Now</span>
                                    {csaVolumeNow.toLocaleString('es-ES')}
                                </div>
                                <div className="text-2xl font-bold text-green-600 gap-2">
                                    <span className="text-xs text-gray-700 me-1">Future</span>
                                    {csaVolumeFuture.toLocaleString('es-ES')}
                                </div>
                            </div>
                        </>
                    }
                </div>
                <div className="board-card">
                    <div onClick={handleBtnPlan} className="board-title-std">
                       PLAN VIVO
                    </div>
                    <div className="board-number">{planVivoVolume.toLocaleString('es-ES')}</div>
                    <div className="board-desc">belonging to {planVivoProjects.length} projects. </div>
                    <div className="flex justify-center gap-3">
                        <div>
                            <span className="text-xs text-gray-700">Own</span>
                            <div className="text-2xl font-bold text-green-600">{planVivoVolumeOwn.toLocaleString('es-ES')}</div>
                        </div>
                        <div>
                            <span className="text-xs text-gray-700">MKT Agreement</span>
                            <div className="text-2xl font-bold text-green-600">{planVivoVolumeMkt.toLocaleString('es-ES')}</div>
                        </div>
                    </div>
                    <button onClick={() => setShowMorePlan(!showMorePlan)} className="text-xs text-gray-600 font-bold cursor-pointer hover:text-green-600">
                        {showMorePlan ? 'See Less' : 'See More...'}
                    </button>
                    {showMorePlan &&
                        <>
                            <div className="board-desc">Procured by </div>
                            <div className="flex justify-center gap-3">
                                <div className="text-2xl font-bold text-green-600 gap-2">
                                    <span className="text-xs text-gray-700 me-1">ALLCOT</span>
                                    {planVivoVolumeAll.toLocaleString('es-ES')}
                                </div>
                                <div className="text-2xl font-bold text-green-600 gap-2">
                                    <span className="text-xs text-gray-700 me-1">Misha</span>
                                    {planVivoVolumeMisha.toLocaleString('es-ES')}
                                </div>
                            </div>
                            <div className="board-desc">Availability </div>
                            <div className="flex justify-center gap-3">
                                <div className="text-2xl font-bold text-green-600 gap-2">
                                    <span className="text-xs text-gray-700 me-1">Now</span>
                                    {planVivoVolumeNow.toLocaleString('es-ES')}
                                </div>
                                <div className="text-2xl font-bold text-green-600 gap-2">
                                    <span className="text-xs text-gray-700 me-1">Future</span>
                                    {planVivoVolumeFuture.toLocaleString('es-ES')}
                                </div>
                            </div>
                        </>
                    }
                </div>
                <div className="board-card">
                    <div onClick={handleBtnCar} className="board-title-std">
                       CAR
                    </div>
                    <div className="board-number">{carVolume.toLocaleString('es-ES')}</div>
                    <div className="board-desc">belonging to {carProjects.length} projects. </div>
                    <div className="flex justify-center gap-3">
                        <div>
                            <span className="text-xs text-gray-700">Own</span>
                            <div className="text-2xl font-bold text-green-600">{carVolumeOwn.toLocaleString('es-ES')}</div>
                        </div>
                        <div>
                            <span className="text-xs text-gray-700">MKT Agreement</span>
                            <div className="text-2xl font-bold text-green-600">{carVolumeMkt.toLocaleString('es-ES')}</div>
                        </div>
                    </div>
                    <button onClick={() => setShowMoreCar(!showMoreCar)} className="text-xs text-gray-600 font-bold cursor-pointer hover:text-green-600">
                        {showMoreCar ? 'See Less' : 'See More...'}
                    </button>
                    {showMoreCar &&
                        <>
                            <div className="board-desc">Procured by </div>
                            <div className="flex justify-center gap-3">
                                <div className="text-2xl font-bold text-green-600 gap-2">
                                    <span className="text-xs text-gray-700 me-1">ALLCOT</span>
                                    {carVolumeAll.toLocaleString('es-ES')}
                                </div>
                                <div className="text-2xl font-bold text-green-600 gap-2">
                                    <span className="text-xs text-gray-700 me-1">Misha</span>
                                    {carVolumeMisha.toLocaleString('es-ES')}
                                </div>
                            </div>
                            <div className="board-desc">Availability </div>
                            <div className="flex justify-center gap-3">
                                <div className="text-2xl font-bold text-green-600 gap-2">
                                    <span className="text-xs text-gray-700 me-1">Now</span>
                                    {carVolumeNow.toLocaleString('es-ES')}
                                </div>
                                <div className="text-2xl font-bold text-green-600 gap-2">
                                    <span className="text-xs text-gray-700 me-1">Future</span>
                                    {carVolumeFuture.toLocaleString('es-ES')}
                                </div>
                            </div>
                        </>
                    }
                </div>
                <div className="board-card">
                    <div onClick={handleBtnBio} className="board-title-std">
                       BIO CARBON
                    </div>
                    <div className="board-number">{bioCarbonVolume.toLocaleString('es-ES')}</div>
                    <div className="board-desc">belonging to {bioCarbonProjects.length} projects. </div>
                    <div className="flex justify-center gap-3">
                        <div>
                            <span className="text-xs text-gray-700">Own</span>
                            <div className="text-2xl font-bold text-green-600">{bioCarbonVolumeOwn.toLocaleString('es-ES')}</div>
                        </div>
                        <div>
                            <span className="text-xs text-gray-700">MKT Agreement</span>
                            <div className="text-2xl font-bold text-green-600">{bioCarbonVolumeMkt.toLocaleString('es-ES')}</div>
                        </div>
                    </div>
                    <button onClick={() => setShowMoreBio(!showMoreBio)} className="text-xs text-gray-600 font-bold cursor-pointer hover:text-green-600">
                        {showMoreBio ? 'See Less' : 'See More...'}
                    </button>
                    {showMoreBio &&
                        <>
                            <div className="board-desc">Procured by </div>
                            <div className="flex justify-center gap-3">
                                <div className="text-2xl font-bold text-green-600 gap-2">
                                    <span className="text-xs text-gray-700 me-1">ALLCOT</span>
                                    {bioCarbonVolumeAll.toLocaleString('es-ES')}
                                </div>
                                <div className="text-2xl font-bold text-green-600 gap-2">
                                    <span className="text-xs text-gray-700 me-1">Misha</span>
                                    {bioCarbonVolumeMisha.toLocaleString('es-ES')}
                                </div>
                            </div>
                            <div className="board-desc">Availability </div>
                            <div className="flex justify-center gap-3">
                                <div className="text-2xl font-bold text-green-600 gap-2">
                                    <span className="text-xs text-gray-700 me-1">Now</span>
                                    {bioCarbonVolumeNow.toLocaleString('es-ES')}
                                </div>
                                <div className="text-2xl font-bold text-green-600 gap-2">
                                    <span className="text-xs text-gray-700 me-1">Future</span>
                                    {bioCarbonVolumeFuture.toLocaleString('es-ES')}
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

