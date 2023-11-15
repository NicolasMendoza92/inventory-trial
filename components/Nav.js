
import Link from "next/link";
import { useRouter } from "next/router";



export default function Nav({ showNav, setShowNav }) {

    const inactiveLink = 'flex gap-1 p-1 text-white';
    const activeLink = 'flex gap-1 p-1 text-green-300 rounded';

    // way to create router in nextjs 
    const router = useRouter();
    const { pathname } = router;

    const collapseData = (e) => {
        e.preventDefault(e);
        setShowNav(prev => !prev);
    }

    return (
        <div className={(showNav ? 'left-0 flex-col' : '-left-full flex-wrap ') + ' flex top-0 p-3 bg-green-600 fixed w-full h-full gap-3 p-3 md:static md:w-auto transition-all z-10 '}>
            <div className="flex items-center justify-between ">
                <div className="block md:hidden flex ">
                    <button onClick={collapseData}>
                        <svg xmlns="http://www.w3.org/2000/svg" style={{color: "white"}} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>
                <Link href={"/"} className='flex gap-1' >
                    <img className='h-9' src='https://res.cloudinary.com/dbv6dgwez/image/upload/v1699959964/Allcot%20Trading/ALLCOT_DROP_LOGO_-_White_pafsal.png'></img>
                </Link>
            </div>
            <Link href={"/inventary"} className={pathname.includes('/inventary') ? activeLink : inactiveLink}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
                Inventory
            </Link>
            <Link href={"/operations"} className={pathname.includes('/operations') ? activeLink : inactiveLink}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                </svg>
                Operations
            </Link>
            <Link href={"/reservations"} className={pathname.includes('/reservations') ? activeLink : inactiveLink}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>

                Reserves
            </Link>
        </div>
    );
}