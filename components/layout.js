import Nav from "@/components/Nav"
import { useState } from "react";


export default function Layout({ children }) {
  // con estados, como si fuera un modal trabajamos con la navbar
  const [showNav, setShowNav] = useState(false);

  return (
    <div className="my-2 min-h-screen">
      {/* el hmaburgesa estara d-block en pantallas md  */}
      <div className="block md:hidden flex items-center p-4">
        <button onClick={() => setShowNav(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
      <div>
        <Nav showNav={showNav} setShowNav={setShowNav} />
        <div className="flex-grow m-3 rounded-lg p-4 ">
          {children}
        </div>
      </div>
    </div>
  )
}