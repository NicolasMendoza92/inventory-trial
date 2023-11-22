

export const sdgList = [
    {
        name: "1",
        img: "https://res.cloudinary.com/dbv6dgwez/image/upload/v1699867314/Allcot%20Trading/S-WEB-Goal-01_wkhpyw.png"
    },
    {
        name: "2",
        img: "https://res.cloudinary.com/dbv6dgwez/image/upload/v1699867314/Allcot%20Trading/S-WEB-Goal-02_myyvxc.png",
    },
    {
        name: "3",
        img: "https://res.cloudinary.com/dbv6dgwez/image/upload/v1699867315/Allcot%20Trading/S-WEB-Goal-03_o8zdeq.png"
    },
    {
        name: "4",
        img: "https://res.cloudinary.com/dbv6dgwez/image/upload/v1699867315/Allcot%20Trading/S-WEB-Goal-04_bmoolz.png"
    },
    {
        name: "5",
        img: "https://res.cloudinary.com/dbv6dgwez/image/upload/v1699867315/Allcot%20Trading/S-WEB-Goal-05_ndyslm.png"
    },
    {
        name: "6",
        img: "https://res.cloudinary.com/dbv6dgwez/image/upload/v1699867318/Allcot%20Trading/S-WEB-Goal-06_hyolkj.png"
    },
    {
        name: "7",
        img: "https://res.cloudinary.com/dbv6dgwez/image/upload/v1699867318/Allcot%20Trading/S-WEB-Goal-07_ajt0e2.png"
    },
    {
        name: "8",
        img: "https://res.cloudinary.com/dbv6dgwez/image/upload/v1699867318/Allcot%20Trading/S-WEB-Goal-08_wa3ys5.png"
    },
    {
        name: "9",
        img: "https://res.cloudinary.com/dbv6dgwez/image/upload/v1699867318/Allcot%20Trading/S-WEB-Goal-09_bmd39w.png"
    },
    {
        name: "10",
        img: "https://res.cloudinary.com/dbv6dgwez/image/upload/v1699867318/Allcot%20Trading/S-WEB-Goal-10_lwk21v.png"
    },
    {
        name: "11",
        img: "https://res.cloudinary.com/dbv6dgwez/image/upload/v1699867320/Allcot%20Trading/S-WEB-Goal-11_ni2fiw.png"
    },
    {
        name: "12",
        img: "https://res.cloudinary.com/dbv6dgwez/image/upload/v1699867320/Allcot%20Trading/S-WEB-Goal-12_awfkba.png"
    },
    {
        name: "13",
        img: "https://res.cloudinary.com/dbv6dgwez/image/upload/v1699867320/Allcot%20Trading/S-WEB-Goal-13_wgwvwz.png"
    },
    {
        name: "14",
        img: "https://res.cloudinary.com/dbv6dgwez/image/upload/v1699867320/Allcot%20Trading/S-WEB-Goal-14_nd8aas.png"
    },
    {
        name: "15",
        img: "https://res.cloudinary.com/dbv6dgwez/image/upload/v1699867321/Allcot%20Trading/S-WEB-Goal-15_cy02wp.png"
    },
    {
        name: "16",
        img: "https://res.cloudinary.com/dbv6dgwez/image/upload/v1699867321/Allcot%20Trading/S-WEB-Goal-16_mmz9yd.png"
    },
    {
        name: "17",
        img: "https://res.cloudinary.com/dbv6dgwez/image/upload/v1699867322/Allcot%20Trading/S-WEB-Goal-17_d8xyjl.png"
    }
]


// const handleChangeSdg = (e) => {
//     const { value, checked } = e.target;
//     if (checked) {
//         setSdgSelected([...sdgSelected, value])
//     } else {
//         setSdgSelected(sdgSelected.filter(sdg => sdg !== value))
//     }
// }


{/* <div className='flex items-center' key={index}>
<input
    className='w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2'
    type='checkbox'
    name={name}
    value={name}
    onChange={(e) => handleChangeSdg(e)} />
<label className='ms-2 text-sm font-medium text-gray-800'>{name}</label>
</div> */}

// ARRAY FALSE

// const [checkedState, setCheckedState] = useState(
//     new Array(sdgList.length).fill(false)
// );

// const handleChangeSdg = (position) => {
//     const updatedCheckedState = checkedState.map((item, index) =>
//         index === position ? !item : item
//     )
//     setCheckedState(updatedCheckedState);
// }

// [
//     {
//         name: "1. No poverety",
//         img: "https://res.cloudinary.com/dbv6dgwez/image/upload/v1699867314/Allcot%20Trading/S-WEB-Goal-01_wkhpyw.png"
//     },
//     {
//         name: "2. No hunger",
//         img: "https://res.cloudinary.com/dbv6dgwez/image/upload/v1699867314/Allcot%20Trading/S-WEB-Goal-02_myyvxc.png",
//     },
//     {
//         name: "3. Good health and well-being",
//         img: "https://res.cloudinary.com/dbv6dgwez/image/upload/v1699867315/Allcot%20Trading/S-WEB-Goal-03_o8zdeq.png"
//     },
//     {
//         name: "4. Quality education",
//         img: "https://res.cloudinary.com/dbv6dgwez/image/upload/v1699867315/Allcot%20Trading/S-WEB-Goal-04_bmoolz.png"
//     },
//     {
//         name: "5. Gender equality",
//         img: "https://res.cloudinary.com/dbv6dgwez/image/upload/v1699867315/Allcot%20Trading/S-WEB-Goal-05_ndyslm.png"
//     },
//     {
//         name: "6. Clean water and sanitation",
//         img: "https://res.cloudinary.com/dbv6dgwez/image/upload/v1699867318/Allcot%20Trading/S-WEB-Goal-06_hyolkj.png"
//     },
//     {
//         name: "7. Affordable and clean energy",
//         img: "https://res.cloudinary.com/dbv6dgwez/image/upload/v1699867318/Allcot%20Trading/S-WEB-Goal-07_ajt0e2.png"
//     },
//     {
//         name: "8. Decent work and economic growth",
//         img: "https://res.cloudinary.com/dbv6dgwez/image/upload/v1699867318/Allcot%20Trading/S-WEB-Goal-08_wa3ys5.png"
//     },
//     {
//         name: "9. Industry, innovation and infrastructure",
//         img: "https://res.cloudinary.com/dbv6dgwez/image/upload/v1699867318/Allcot%20Trading/S-WEB-Goal-09_bmd39w.png"
//     },
//     {
//         name: "10. Reduced inequality",
//         img: "https://res.cloudinary.com/dbv6dgwez/image/upload/v1699867318/Allcot%20Trading/S-WEB-Goal-10_lwk21v.png"
//     },
//     {
//         name: "11. Sustainable cities and communities",
//         img: "https://res.cloudinary.com/dbv6dgwez/image/upload/v1699867320/Allcot%20Trading/S-WEB-Goal-11_ni2fiw.png"
//     },
//     {
//         name: "12. Responsible consumption and production",
//         img: "https://res.cloudinary.com/dbv6dgwez/image/upload/v1699867320/Allcot%20Trading/S-WEB-Goal-12_awfkba.png"
//     },
//     {
//         name: "13. Climate action",
//         img: "https://res.cloudinary.com/dbv6dgwez/image/upload/v1699867320/Allcot%20Trading/S-WEB-Goal-13_wgwvwz.png"
//     },
//     {
//         name: "14. Life below water",
//         img: "https://res.cloudinary.com/dbv6dgwez/image/upload/v1699867320/Allcot%20Trading/S-WEB-Goal-14_nd8aas.png"
//     },
//     {
//         name: "15. Life on land",
//         img: "https://res.cloudinary.com/dbv6dgwez/image/upload/v1699867321/Allcot%20Trading/S-WEB-Goal-15_cy02wp.png"
//     },
//     {
//         name: "16. Peace, justice and strong institutions",
//         img: "https://res.cloudinary.com/dbv6dgwez/image/upload/v1699867321/Allcot%20Trading/S-WEB-Goal-16_mmz9yd.png"
//     },
//     {
//         name: "17. Partnership for the goals",
//         img: "https://res.cloudinary.com/dbv6dgwez/image/upload/v1699867322/Allcot%20Trading/S-WEB-Goal-17_d8xyjl.png"
//     }
// ]