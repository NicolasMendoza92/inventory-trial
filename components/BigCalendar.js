import axios from 'axios';
import moment from 'moment';
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import Swal from 'sweetalert2';

export default function BigCalendar({ allEvents, getEventsMade }) {

    function deleteEvent(event) {
        try {
          Swal.fire({
            icon: "info",
            text: `Do you want delete this event?`,
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Yes, delete!',
            confirmButtonColor: '#d55',
            reverseButtons: true,
          }).then(async result => {
            // hacemos console log del result y vemos que opcion es cada una. 
            if (result.isConfirmed) {
              await axios.delete('/api/events?id=' + event._id);
              getEventsMade()
            }
          });
    
        } catch (error) {
          console.log(error)
        }
    
      }

    const localizer = momentLocalizer(moment);
    return (
        <div className='mt-5' style={{ height: '500px' }}>
            <Calendar
                localizer={localizer}
                onDoubleClickEvent={(event) => deleteEvent(event)}
                events={allEvents}
                startAccessor="start"
                endAccessor="start"
                views={['month', 'agenda']}
            // onSelectEvent={handleEventClick}
            />
           
        </div>
    )
}