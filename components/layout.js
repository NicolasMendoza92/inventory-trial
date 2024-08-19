import Nav from "@/components/Nav"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


export default function Layout({ children }) {
  // con estados, como si fuera un modal trabajamos con la navbar
  const [showNav, setShowNav] = useState(false);

  const collapseData = (e) => {
    e.preventDefault(e);
    setShowNav(prev => !prev);
  }

  return (
    <div className="bg-secondary min-h-screen ">
      {/* el hmaburgesa estara d-block en pantallas md  */}
      <div className="block md:hidden flex items-center p-4">
        <button onClick={collapseData}>
          <svg xmlns="http://www.w3.org/2000/svg" style={{ color: "white" }} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
        <div className="flex grow justify-center align-center">
          Logo
        </div>
      </div>
      <div>
        <Nav showNav={showNav} setShowNav={setShowNav} />
        <div className="bg-primary flex-grow ms-2 mt-2 mr-2 mb-3 rounded-lg p-4 ">
          {children}
        </div>
      </div>
    </div>
  )
}