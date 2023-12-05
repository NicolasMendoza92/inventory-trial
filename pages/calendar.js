import Layout from '@/components/layout'
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import axios from 'axios';
import Spinner from '@/components/Spinner';
import BigCalendar from '@/components/BigCalendar';
import PendingOps from '@/components/PendingOps';
import { mongooseConnect } from '@/lib/mongoose';
import Operation from '@/models/Operation';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import isEnableUser from '@/lib/enableUser';


export default function Calendar({ operations }) {

  const { data: session } = useSession();
  const enable = isEnableUser(session);

  const router = useRouter();
  function goToLogin() {
    router.push('/login')
  }

  const [isLoading, setIsLoading] = useState(false);

  const [title, setTitle] = useState('');
  const [start, setStart] = useState(new Date());

  const [allEvents, setAllEvents] = useState([]);


  // Filtro de las los que tiene pendiente hoy
  const eventsToday = allEvents?.filter(
    event =>
      moment(event.start).isSame(new Date(), 'day') ||
      moment(event.end).isSame(new Date(), 'day') ||
      (moment(event.start).isBefore(new Date()) &&
        moment(event.end).isAfter(new Date()))
  );

  async function handleAddEvent() {
    try {
      const newEvent = { title, start, end: start }
      const response = await axios.post('/api/events', newEvent);
      setTitle('');
      setStart('');
      getEventsMade()

    } catch (error) {
      console.log(error)
    }
    setAllEvents([...allEvents]);
  };

  const getEventsMade = async () => {
    setIsLoading(true);
    axios.get('/api/events').then(res => {
      setAllEvents(res.data.calendar);
      setIsLoading(false);
    })
  }

  useEffect(() => {
    getEventsMade();
  }, []);




  return (
    <Layout>
      {!session &&
        <div className="flex justify-center">
          <div className="shadow-md p-3 bg-zince-300/10 flex items-center gap-2 m-3">
            <h1>You must be logged in to handle the calendar</h1>
            <button className="bg-green-600 rounded-lg text-white font-bold px-6 py-2" onClick={goToLogin}> Login </button>
          </div>
        </div>
      }
      {session &&
        <>
          <div>
            {isLoading && (
              <>
                <div className='flex justify-center m-auto'>
                  <Spinner />
                </div>
              </>
            )}
            {allEvents.length === 0 && (

              <h1 className='text-center'>You have no events in your agenda</h1>

            )}
            {allEvents.length > 0 && (
              <h1 className='text-center'>You have <b style={{ color: 'green', fontSize: '25px' }} >{allEvents.length}</b> events to be managed and <b style={{ color: 'red', fontSize: '25px' }} >{eventsToday.length}</b> are from today</h1>
            )}
            {enable === false && (
              <></>
            )}
            {enable === true && (
              <div className='m-3'>
                <div className='flex flex-col gap-2'>
                  <input type="text" placeholder="Add Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                  <DatePicker
                    showIcon
                    popperClassName="z-10"
                    placeholderText="Due Date"
                    dateFormat="dd/MM/yyyy"
                    selected={start}
                    onChange={(date) => setStart(date)} />
                  <button className="bg-green-600 text-white px-3 py-1 ms-1 mt-1 rounded shadow-sm hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-400" onClick={handleAddEvent}>
                    Add an event
                  </button>
                </div>
              </div>
            )}
            {session?.user.email === 'wp.co@allcot.com' && (
              <div className='m-3'>
                <div className='flex flex-col gap-2'>
                  <input type="text" placeholder="Add Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                  <DatePicker
                    showIcon
                    popperClassName="z-10"
                    placeholderText="Due Date"
                    dateFormat="dd/MM/yyyy"
                    selected={start}
                    onChange={(date) => setStart(date)} />
                  <button className="bg-green-600 text-white px-3 py-1 ms-1 mt-1 rounded shadow-sm hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-400" onClick={handleAddEvent}>
                    Add an event
                  </button>
                </div>
              </div>
            )}

            <BigCalendar allEvents={allEvents} getEventsMade={getEventsMade} />
            <PendingOps operations={operations} />
          </div>
        </>}

    </Layout>
  )
}

// TRAIGO LOS PROYECTOS CON GET SERVER SIDE PROPS PARA PODER USARLOS 
export async function getServerSideProps() {
  await mongooseConnect();
  const operations = await Operation.find({}, null, { sort: { 'deliveryDate': 1 } })
    .populate('proyecto', {
      projectID: 1,
      name: 1,
      standar: 1,
      vintage: 1,
    });

  return {
    props: {
      operations: JSON.parse(JSON.stringify(operations)),

    }
  };
}