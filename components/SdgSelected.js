import Image from 'next/image'
import React from 'react'

export default function SdgSelected({ sdgImages }) {


    return (
        <div className="flex flex-wrap gap-2">
            {sdgImages.map(link => (
                <React.Fragment key={link}>
                <Image className='h-20 rounded-md' src={link} alt='logo sdg' width={72} height={24}/>
                </React.Fragment>      
            ))}
        </div>
    )
}

{/* <div className="flex flex-wrap gap-2">
{mapName.map(name => (
    <div className='m-2'>
        {name}
    </div>
))}
</div> */}