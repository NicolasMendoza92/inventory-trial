import moment from "moment";


export default function HomeStandard({ projects, operations }) {

    // Deliveries and payment del dia de hoy 
    const deliverToday = operations.filter(op => moment(op.deliveryDate).isSame(new Date(), 'day'));
    const payToday = operations.filter(op => moment(op.paymentDate).isSame(new Date(), 'day'));


    const cdmProjects = projects.filter(p => p.standar === 'CDM')
    const vcsProjects = projects.filter(p => p.standar === 'VCS')
    const gsProjects = projects.filter(p => p.standar === 'GS')
    const irecsProjects = projects.filter(p => p.standar === 'I-RECs')
    const cercarbonoProjects = projects.filter(p => p.standar === 'CERCARBONO')
    const csaProjects = projects.filter(p => p.standar === 'CSA')

    // despues de crear el array con map de los totales, se los suma usnado reduce
    const cdmVolume = cdmProjects.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const vcsVolume = vcsProjects.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const gsVolume = gsProjects.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const irecsVolume = irecsProjects.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const cercarbonoVolume = cercarbonoProjects.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);
    const csaVolume = csaProjects.map(p => p.volumen).reduce((count, o) => count + parseFloat(o), 0);

    return (
        <div className="">
            {(deliverToday.length > 0 || payToday.length > 0) ? (
                <h1 className='board-card-alert adverts-pending text-center my-3'>You have <b style={{ color: 'red', fontSize: '25px' }}>{deliverToday.length}</b> deliveries and <b style={{ color: 'red', fontSize: '25px' }} >{payToday.length}</b> payments pendings that require your action TODAY</h1>
            ) : null}
            <h1 className="home-stats-titles">Available by standard</h1>
            <div className="board-grid">
                <div className="board-card">
                    <h3 className="board-title-std ">CDM</h3>
                    <div className="board-number">{cdmVolume}</div>
                    <div className="board-desc">belonging to {cdmProjects.length} projects. </div>
                </div>
                <div className="board-card">
                    <h3 className="board-title-std ">VCS</h3>
                    <div className="board-number">{vcsVolume}</div>
                    <div className="board-desc">belonging to {vcsProjects.length} projects. </div>
                </div>
                <div className="board-card">
                    <h3 className="board-title-std">GS</h3>
                    <div className="board-number">{gsVolume}</div>
                    <div className="board-desc">belonging to {gsProjects.length} projects. </div>
                </div>
                <div className="board-card">
                    <h3 className="board-title-std">CERCARBONO</h3>
                    <div className="board-number">{cercarbonoVolume}</div>
                    <div className="board-desc">belonging to {cercarbonoProjects.length} projects. </div>
                </div>
                <div className="board-card">
                    <h3 className="board-title-std">CSA</h3>
                    <div className="board-number">{csaVolume}</div>
                    <div className="board-desc">belonging to {csaProjects.length} projects. </div>
                </div>
                <div className="board-card">
                    <h3 className="board-title-std">I-RECs</h3>
                    <div className="board-number">{irecsVolume}</div>
                    <div className="board-desc">belonging to {irecsProjects.length} projects. </div>
                </div>
            </div>
        </div>

    )
}

