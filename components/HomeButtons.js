import { ProjectSearchContext } from "@/context/ProjectSearchContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function HomeButtons({projects}) {

    const { setFiltersMui } = useContext(ProjectSearchContext);
    const router = useRouter();

    const handleBtnCorsia = () => {
        setFiltersMui(prevFilters => ({ ...prevFilters, corsia: ['YES'] })); 
        router.push('/searchProjects');
    };

    const handleBtnCcp = () => {
        setFiltersMui(prevFilters => ({ ...prevFilters, ccp: ['Eligible'] })); 
        router.push('/searchProjects');
    };

    const corsiaProjects = projects.filter(p => p.corsia === 'YES')
    const ccpProjects = projects.filter(p => p.ccp === 'Eligible')


    return (
        <div className="p-3 flex justify-center gap-3">
            <div onClick={handleBtnCorsia} className="board-card-2">
                <div className="board-title-alert ">CORSIA Projects</div>
                <div className="board-desc"> {corsiaProjects.length} projects. </div>
            </div>
            <div onClick={handleBtnCcp} className="board-card-2">
                <h3 className="board-title-alert ">CCP Eligible Projects</h3>
                <div className="board-desc"> {ccpProjects.length} projects. </div>
            </div>
        </div>
    )
}

