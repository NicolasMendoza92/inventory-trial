import React, { useEffect, useState } from 'react'

export default function CountdownPay({ paymentDatesList }) {

    const [daysToGoList, setDaysToGoList] = useState([]);

    useEffect(() => {
        const currentDate = new Date();

        const calculateDaysToGo = () => {
            const updatedDaysToGoList = paymentDatesList.map((targetDate) => {
                const differenceInTime = targetDate.getTime() - currentDate.getTime();
                return Math.ceil(differenceInTime / (1000 * 3600 * 24));
            });
            setDaysToGoList(updatedDaysToGoList);
        };

        calculateDaysToGo();

        // You can set up an interval to update the countdown regularly
        const intervalId = setInterval(() => {
            calculateDaysToGo();
        }, 1000 * 60 * 60); // Update every hour

        return () => clearInterval(intervalId);
    }, [paymentDatesList]);

    const fewDaysLeft = daysToGoList.filter(day => day <= 2)

    return (
        <div className='my-3'>
            <div className="board-card-alert flex flex-col justify-center items-center gap-2">
                <div>
                    You have <b style={{ color: 'red', fontSize: '18px' }}> {fewDaysLeft.length}</b> pending <b>PAYMENTS</b> in <b style={{ color: 'red', fontSize: '16px' }}> less</b> than <b style={{ color: 'red', fontSize: '16px' }}>2</b> days.
                </div>
            </div>
        </div>
    )
}
