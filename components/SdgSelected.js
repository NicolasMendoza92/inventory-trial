import React from 'react'

export default function SdgSelected({ sdgSelected, sdgImages }) {

    const mapName = sdgSelected?.map(n => n);

    return (
        <div className="flex flex-wrap gap-2">
            {sdgImages.map(link => (
                <img className='h-20 rounded-md' src={link}/>
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