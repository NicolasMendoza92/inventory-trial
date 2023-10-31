
import Link from "next/link";
import { useRouter } from "next/router";



export default function Nav({ showNav, setShowNav }) {

    const inactiveLink = 'flex gap-1 p-1';
    const activeLink = 'flex gap-1 p-1 text-green-600 rounded';

    // way to create router in nextjs 
    const router = useRouter();
    const { pathname } = router;



    return (
        <div className='shadow-lg p-3 bg-zince-300/10 flex gap-3 px-3'>
            <Link href={"/"} className='flex gap-1 mb-3' >
                <img className='h-8' src='https://res.cloudinary.com/dbv6dgwez/image/upload/v1644553896/Allcot%20Trading/Allcot_Logo_horizontal_ltqc4p.png'></img>
            </Link>
            <Link href={"/inventary"} className={pathname.includes('/inventary') ? activeLink : inactiveLink}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
                Inventario
            </Link>
            <Link href={"/operations"} className={pathname.includes('/operations') ? activeLink : inactiveLink}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                </svg>
                Operaciones
            </Link>

        </div>
    );
}