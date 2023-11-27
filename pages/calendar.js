import Layout from '@/components/layout'
import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Operation from '@/models/Operation';
import { mongooseConnect } from '@/lib/mongoose';
import Spinner from '@/components/Spinner';


export default function calendar({ operations }) {

  const [isLoading, setIsLoading] = useState(false);
  const openStatus = operations.filter(op => op.delivery === 'Pending' || op.payment === 'Pending');

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([
    {
      title: 'Sample Event',
      start: new Date(), // Set the start date of the event
      end: new Date(), // Set the end date of the event
    },
    // Add more events as needed
  ]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Additional logic if needed
  };

  return (
    <Layout>
      <div>
        <h1>Pending </h1>
        <table className=" basic my-3">
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
            {isLoading && (
              <tr>
                <td colSpan={6}>
                  <div className="w-full flex justify-center py-4">
                    <Spinner />
                  </div>
                </td>
              </tr>
            )}
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
        <div>
          <label>Select Date:</label>
          <DatePicker selected={selectedDate} onChange={handleDateChange} />
        </div>

        <div style={{ height: '500px' }}>
          <Calendar
            localizer={momentLocalizer(moment)}
            events={events}
            startAccessor="start"
            endAccessor="end"
            views={['month']}
            defaultDate={selectedDate}
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