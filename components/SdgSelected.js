import React from 'react'

export default function SdgSelected({ sdgImages }) {


    return (
        <div className="flex flex-wrap gap-2">
            {sdgImages.map(link => (
                <React.Fragment key={link}>
                <img className='h-20 rounded-md' src={link}/>
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