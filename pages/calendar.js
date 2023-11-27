import Layout from '@/components/layout'
import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Operation from '@/models/Operation';
import { mongooseConnect } from '@/lib/mongoose';


export default function calendar({ operations }) {

  const openStatus = operations.filter(op => op.delivery === 'Pending' || op.payment === 'Pending');

  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState('');

  // const [selectedDate, setSelectedDate] = useState(new Date());
  // const [events, setEvents] = useState([
  //   {
  //     title: 'Sample Event',
  //     start: new Date(), // Set the start date of the event
  //     end: new Date(), // Set the end date of the event
  //   },
  //   // Add more events as needed
  // ]);

  function handleAddEvent(){
    setAllEvents([...allEvents, newEvent]);
  };

  return (
    <Layout>
      <div className='relative overflow-x-auto'>
        <table className=" basic  my-3">
          <thead>
            <tr>
              <td>Client</td>
              <td>Transaction</td>
              <td>Project</td>
              <td>Volume</td>
              <td>Delivery Date</td>
              <td>Payment Date</td>
            </tr>
          </thead>
          <tbody>
            {openStatus?.map(o => (
              <tr key={o._id}>
                <td>{o.cliente}</td>
                <td>{o.transaction}</td>
                <td>{o.projectData?.idProject} {o.projectData?.standardOp} {o.projectData?.nameProject} {o.projectData?.vintageOp}</td>
                <td>{o.quantity}</td>
                {o.delivery === 'Done' && <td> Done </td>}
                {o.delivery === 'Pending' && <td>{(new Date(o.deliveryDate)).toLocaleString(
                  "GB-English", { dateStyle: "short" }
                )}
                </td>}
                {o.payment === 'Done' && <td> Done </td>}
                {o.payment === 'Pending' && <td>{(new Date(o.paymentDate)).toLocaleString(
                  "GB-English", { dateStyle: "short" }
                )}
                </td>}
              </tr>
            ))}
          </tbody>
        </table>
        <div className='m-3'>
          <h2>Add New Event</h2>
          <div>
            <input type="text" placeholder="Add Title" style={{ width: "20%", marginRight: "10px" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
            <DatePicker placeholderText="Due Date" style={{ marginRight: "10px" }} selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
            {/* <DatePicker placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} /> */}
            <button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
              Add Event
            </button>
          </div>
        </div>

        <div className='mt-5' style={{ height: '500px' }}>
          <Calendar
            localizer={momentLocalizer(moment)}
            events={allEvents}
            startAccessor="start"
            endAccessor="start"
            views={['month']}
          />
        </div>
      </div>
    </Layout>
  )
}


// TRAIGO LOS PROYECTOS CON GET SERVER SIDE PROPS PARA PODER USARLOS 
export async function getServerSideProps() {
  await mongooseConnect();
  const operations = await Operation.find({}, null, { sort: { '_id': -1 } })
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