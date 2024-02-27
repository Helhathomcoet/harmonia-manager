import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Button } from '@mui/material';
import ApiCalendar from 'react-google-calendar-api';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([
    {
      title: 'Event 1',
      start: new Date(),
      end: new Date(),
    },
    {
      title: 'Event 2',
      start: new Date(),
      end: new Date(),
    },
  ]);

  const handleAddEvent = (date) => {
    const title = prompt('Event Title');
    const start = date;
    const end = new Date(start);
    end.setHours(end.getHours() + 1); // Ajoute une heure à la date de début pour l'heure de fin par défaut

    if (title) {
      const newEvent = {
        title,
        start,
        end,
      };
      setEvents([...events, newEvent]);
    }
  };

  const CustomDayCell = ({ date }) => (
    <div>
      <Button onClick={() => handleAddEvent(date)}>+</Button>
    </div>
  );

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        components={{
          dateCellWrapper: (props) => (
            <CustomDayCell date={props.value} />
          ),
        }}
      />
    </div>
  );
};

export default MyCalendar;
